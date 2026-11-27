# AFTERIMAGE — Technical & Architectural Guide

This document provides a deep technical reference for the **AFTERIMAGE** codebase, covering the 3D Spatial Memory Archive mathematics, Firebase AI Logic + App Check initialization sequence, Hybrid AI inference routing, and client-side state persistence.

---

## 1. Initialization Order & Firebase Security

AFTERIMAGE enforces a strict initialization sequence in `src/lib/firebase.ts` so that every cloud AI request carries a valid App Check attestation token:

1. **Firebase App Initialization**: `initializeApp(firebaseConfig)` creates the singleton app instance.
2. **Firebase App Check Initialization** *(runs before `getAI`)*:
   * **Local Development (`import.meta.env.DEV`)**: Attaches `VITE_FIREBASE_APPCHECK_DEBUG_TOKEN` to `self.FIREBASE_APPCHECK_DEBUG_TOKEN` (when provided) and initializes `initializeAppCheck` with `CustomProvider` / debug token exchange.
   * **Production**: Initializes `ReCaptchaEnterpriseProvider` using `VITE_FIREBASE_APPCHECK_SITE_KEY`.
3. **Firebase AI Logic Initialization**: `getAI(app, { backend: new GoogleAIBackend() })` binds the Gemini Developer API backend to the authenticated app instance.

### Registering a Local App Check Debug Token
1. Open the **Firebase Console** → **App Check** → **Apps** → select your Web App.
2. Click the overflow menu → **Manage debug tokens** → **Add debug token**.
3. Paste or generate a UUID token and click **Save**.
4. Place that token in `.env` as `VITE_FIREBASE_APPCHECK_DEBUG_TOKEN`.

---

## 2. Hybrid AI Service (`src/services/hybridAIService.ts`)

`hybridAIService.ts` orchestrates story analysis and missing-question generation across three explicit tiers:

| Tier | Source Enum | Mechanism | Trigger |
| :--- | :--- | :--- | :--- |
| **Tier 1** | `ON_DEVICE` | Chrome Built-in Prompt API (`window.ai` / `LanguageModel`) | `PREFER_ON_DEVICE` or `ONLY_ON_DEVICE` when browser model is ready |
| **Tier 2** | `IN_CLOUD` | Firebase AI Logic (`gemini-3.8-flash`) | `ONLY_IN_CLOUD`, or `PREFER_ON_DEVICE` when on-device is unavailable |
| **Tier 3** | `OFFLINE_FALLBACK` | Deterministic local heuristic extractor | When cloud/on-device AI are unavailable, quota-limited, or disabled |

### Structured Output Schema
Every story analysis returns a strongly typed `AIStoryAnalysis`:
* `summary`: Concise archival abstract.
* `extractedKnowledge`: `{ people, materials, techniques, culturalContext, timePeriod }`.
* `missingQuestions`: Prioritized array of `{ question, whyItMatters, category, importance, suggestedPromptForInterview }`.

### Diagnostic Helpers
The **Custodian Console / Settings** page exposes two live verification tools:
* `testRealFirebaseCloudAI()`: Sends a minimal cloud prompt to `gemini-3.8-flash` and reports true latency, model identifier, and exact HTTP/quota diagnostics.
* `testFullStoryPipeline()`: Runs an end-to-end narrative through the configured `InferenceMode` and verifies structured JSON extraction.

---

## 3. 3D Spatial Archive Sphere (`src/components/archive/SpatialArchiveSphere.tsx`)

The landing hero renders an interactive 3D celestial sphere of heritage stories without requiring WebGL/Three.js overhead, using pure hardware-accelerated CSS `translate3d` transforms:

1. **Fibonacci Lattice Distribution**:
   * Distributes $N$ nodes (minimum 24 via balanced duplication) across the sphere using the golden angle $\theta_i = i \cdot \pi(3 - \sqrt{5})$ and normalized latitude $y_i \in [-1, 1]$ with $r_i = \sqrt{1 - y_i^2}$.
2. **3D Rotation & Perspective Projection**:
   * Applies pitch (`rotation.x`) and yaw (`rotation.y`) rotation matrices in `useMemo`.
   * Projects $(x, y, z)$ coordinates onto 2D viewport space using $p = \frac{d}{d - z}$.
3. **Guaranteed Visibility**:
   * Minimum rear-hemisphere opacity is clamped to `0.70` and scale to `0.72` so no archival fragment disappears into darkness.
   * `SphereCardImage` optimizes Unsplash thumbnails (`w=500&q=80`), shows a pulsing dark skeleton during load, and provides multi-tier category fallbacks on network errors.

---

## 4. State Persistence & Cache Healing (`src/context/ArchiveContext.tsx`)

Stories and user settings are persisted in `localStorage` under versioned keys (`afterimage_living_archive_v4` and `afterimage_settings_v4`):
* **Auto-Migration**: On mount, legacy cache keys (`v2`, `v3`) are purged and built-in story records automatically sync their `heroImage` and `galleryImages` fields from `src/data/mockStories.ts` so outdated external URLs never persist across sessions.
* **Custom Stories**: User-captured stories created via `/capture` are preserved alongside curated stories.

---

## 5. Development & Verification Commands

```bash
# Start local Vite dev server
npm run dev

# Run TypeScript typecheck and Vite production bundle
npm run build

# Preview production bundle locally
npm run preview
```
