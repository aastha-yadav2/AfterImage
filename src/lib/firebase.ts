import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  initializeAppCheck, 
  ReCaptchaEnterpriseProvider, 
  CustomProvider,
  AppCheck 
} from 'firebase/app-check';
import { 
  getAI, 
  getGenerativeModel, 
  GoogleAIBackend, 
  GenerativeModel,
  AI,
  InferenceMode,
  InferenceSource,
  HybridParams,
  ModelParams
} from 'firebase/ai';

/**
 * AFTERIMAGE Firebase & Hybrid AI Logic Module
 * Configured for the #BuildHybridAI 2026 Hackathon
 * Powered by Firebase JS SDK v13.4.0 + @firebase/ai v3.1.0
 */

// Re-export official SDK enums
export { InferenceMode, InferenceSource };

export interface FirebaseConfigStatus {
  isConfigured: boolean;
  missingKeys: string[];
  projectId?: string;
  appCheckEnabled: boolean;
  appCheckMode: 'debug' | 'enterprise' | 'disabled';
}

const requiredEnvKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID'
] as const;

export const getFirebaseConfigStatus = (): FirebaseConfigStatus => {
  const missing: string[] = [];

  requiredEnvKeys.forEach(key => {
    const val = import.meta.env[key];
    if (!val || val.includes('your_') || val.trim() === '') {
      missing.push(key);
    }
  });

  const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY;
  const appCheckDebugToken = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN;

  let appCheckMode: 'debug' | 'enterprise' | 'disabled' = 'disabled';
  if (import.meta.env.DEV && appCheckDebugToken && appCheckDebugToken.trim() !== '') {
    appCheckMode = 'debug';
  } else if (appCheckSiteKey && appCheckSiteKey.trim() !== '') {
    appCheckMode = 'enterprise';
  }

  return {
    isConfigured: missing.length === 0,
    missingKeys: missing,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appCheckEnabled: appCheckMode !== 'disabled',
    appCheckMode,
  };
};

let cachedApp: FirebaseApp | null = null;
let cachedAI: AI | null = null;
let cachedAppCheck: AppCheck | null = null;

/**
 * Initializes or retrieves the singleton FirebaseApp.
 * Strictly guarantees that App Check is initialized BEFORE any Firebase services (AI, Firestore, etc.)
 */
export const getFirebaseApp = (): FirebaseApp | null => {
  if (cachedApp) return cachedApp;

  const status = getFirebaseConfigStatus();
  if (!status.isConfigured) {
    return null;
  }

  try {
    if (getApps().length > 0) {
      cachedApp = getApp();
      // Ensure App Check is initialized
      initAppCheck(cachedApp);
      return cachedApp;
    }

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };

    cachedApp = initializeApp(firebaseConfig);

    // Initialize App Check immediately following initializeApp and before any service usage
    initAppCheck(cachedApp);

    return cachedApp;
  } catch (err) {
    console.warn('[AFTERIMAGE] Firebase initialization deferred:', err);
    return null;
  }
};

/**
 * Initializes Firebase App Check with either:
 * 1. Official Firebase Debug Token Provider for local development (`import.meta.env.DEV`), or
 * 2. ReCaptchaEnterprise Provider for production web deployments.
 * 
 * In local Vite development, setting self.FIREBASE_APPCHECK_DEBUG_TOKEN before initializeAppCheck
 * activates the official SDK debug token exchange with the Firebase App Check backend.
 */
export function initAppCheck(app: FirebaseApp): AppCheck | null {
  if (cachedAppCheck) return cachedAppCheck;

  try {
    const siteKey = import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY;
    const debugToken = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN;

    // 1. Local Development Debug Mode
    if (import.meta.env.DEV) {
      if (debugToken && debugToken.trim() !== '') {
        // Set the global variable recognized by the Firebase App Check SDK
        const globalScope = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : self);
        (globalScope as any).FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken.trim();

        // Pass a CustomProvider which passes the token to the debug exchange handler
        cachedAppCheck = initializeAppCheck(app, {
          provider: new CustomProvider({
            getToken: async () => ({
              token: debugToken.trim(),
              expireTimeMillis: Date.now() + 60 * 60 * 1000,
            }),
          }),
          isTokenAutoRefreshEnabled: true,
        });

        console.info('[AFTERIMAGE App Check] Official Local Development Debug Provider initialized.');
        return cachedAppCheck;
      } else {
        console.warn(
          '[AFTERIMAGE App Check] Running in local development without VITE_FIREBASE_APPCHECK_DEBUG_TOKEN. ' +
          'If App Check enforcement is active in Firebase Console, requests to Firebase AI Logic will return 401 Unauthorized.'
        );
      }
    }

    // 2. Production ReCaptcha Enterprise Mode
    if (siteKey && siteKey.trim() !== '') {
      cachedAppCheck = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(siteKey.trim()),
        isTokenAutoRefreshEnabled: true,
      });
      console.info('[AFTERIMAGE App Check] ReCaptchaEnterprise Provider initialized for production.');
      return cachedAppCheck;
    }
  } catch (err) {
    console.warn('[AFTERIMAGE App Check] App Check initialization skipped or error:', err);
  }

  return null;
}

/**
 * Returns the Firebase AI instance configured with GoogleAIBackend.
 * Calling getFirebaseApp() guarantees App Check initialization runs first.
 */
export const getFirebaseAIService = (): AI | null => {
  if (cachedAI) return cachedAI;

  const app = getFirebaseApp();
  if (!app) return null;

  try {
    cachedAI = getAI(app, { backend: new GoogleAIBackend() });
    return cachedAI;
  } catch (err) {
    console.warn('[AFTERIMAGE] Firebase AI Service initialization failed:', err);
    return null;
  }
};

export interface GenerativeModelOptions {
  modelName?: string;
  inferenceMode?: InferenceMode;
  responseMimeType?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

/**
 * Returns an official GenerativeModel configured with official Firebase AI Logic hybrid parameters.
 * Supports PREFER_ON_DEVICE, ONLY_IN_CLOUD, ONLY_ON_DEVICE, and PREFER_IN_CLOUD.
 */
export const getFirebaseGenerativeModel = (
  options?: GenerativeModelOptions
): GenerativeModel | null => {
  const ai = getFirebaseAIService();
  if (!ai) return null;

  const targetModel = options?.modelName || import.meta.env.VITE_FIREBASE_AI_MODEL || 'gemini-3.8-flash';
  const mode = options?.inferenceMode || InferenceMode.PREFER_ON_DEVICE;

  const inCloudParams: ModelParams = {
    model: targetModel,
    generationConfig: {
      responseMimeType: options?.responseMimeType || 'application/json',
      temperature: options?.temperature !== undefined ? options?.temperature : 0.2,
      maxOutputTokens: options?.maxOutputTokens || 2048,
    },
  };

  const hybridConfig: HybridParams = {
    mode,
    inCloudParams,
  };

  try {
    return getGenerativeModel(ai, hybridConfig);
  } catch (err) {
    console.warn(`[AFTERIMAGE] Failed to create GenerativeModel with hybrid mode ${mode}:`, err);
    return null;
  }
};
