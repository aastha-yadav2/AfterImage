# AFTERIMAGE (アフターイメージ)
> *"Some things disappear before we realize they mattered."*  
> **A Living Archive for Things the World is About to Forget**  
> Built for the **#BuildHybridAI 2026** Hackathon

---

## 🏛️ Executive Summary & Concept

Human memory is fragile. When a master craftsman, community elder, or grandmother passes away, their unwritten techniques, sensory calibrations, local dialects, and family traditions vanish with them.

Most AI tools treat oral histories as static transcripts or generic bullet-point summaries. **AFTERIMAGE** transforms recorded memory into an active, protective living archive powered by **Firebase AI Logic** and **Hybrid On-Device/Cloud Inference**:

### 🌟 The Core Differentiator: The Missing Questions Engine
When a narrative or recording is captured, AFTERIMAGE does not merely catalog what was said:
1. **Extracts tacit entities**: materials, unwritten formulas, kinetic movements, and lineage.
2. **Identifies critical knowledge gaps**: unmeasured temperatures, missing recovery steps for spoiled batches, undocumented botanical harvesting seasons, and sensory cues (touch, aroma, acoustic resonance).
3. **Formulates prioritized, respectful follow-up questions** before the knowledge holder is unavailable.
4. **Enables interactive field sealing**: records confirmed testimonies, updates the preservation completeness score, and produces printable **Interview Field Guides**.

---

## ⚡ Firebase Hybrid AI Architecture (#BuildHybridAI 2026)

AFTERIMAGE implements an authentic hybrid topology equivalent to `InferenceMode.PREFER_ON_DEVICE`:

```
                           User Submits Story Narrative
                                        │
                                        ▼
                   ┌──────────────────────────────────────────┐
                   │  Hybrid AI Routing (PREFER_ON_DEVICE)    │
                   └────────────────────┬─────────────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
     [Tier 1: On-Device AI]                       [Tier 2: Cloud AI]
 Chrome Built-in Prompt API (W3C)             Firebase AI Logic SDK
           Gemini Nano                                 Gemini 2.5/1.5 Flash
  Zero-latency, 100% sovereign                      Deep cultural synthesis
                 │                                             │
                 └──────────────────────┬──────────────────────┘
                                        │
                           (If both unavailable / offline)
                                        │
                                        ▼
                          [Tier 3: Transparent Fallback]
                          Sandbox Heuristic Analysis
                  "Basic offline analysis — AI was not available."
```

### Strict Honesty & Transparency Rules:
- When processed locally on Gemini Nano: labeled **`"Processed on your device"`** (`ON_DEVICE`).
- When processed remotely via Firebase AI Logic: labeled **`"Processed using cloud AI"`** (`IN_CLOUD`).
- When network or keys are unavailable: labeled **`"Basic offline analysis — AI was not available."`** (`OFFLINE_FALLBACK`).
- Never reports fake local inference or simulated Gemini responses.

---

## 🔒 Firebase App Check & Security (Phase 6)

Firebase App Check verifies that incoming requests to Gemini endpoints originate only from genuine, authorized instances of AFTERIMAGE.

### 1. Local Development Setup (Debug Provider)
1. Open the [Firebase Console](https://console.firebase.google.com/) &rarr; **App Check** &rarr; **Apps** &rarr; **Manage Debug Tokens**.
2. Generate a debug token.
3. Add it to your `.env` file:
   ```bash
   VITE_FIREBASE_APPCHECK_DEBUG_TOKEN="your-debug-token-guid"
   ```
4. In development mode (`import.meta.env.DEV`), `src/lib/firebase.ts` automatically configures the App Check `CustomProvider` using this debug token.

### 2. Production Deployment (reCAPTCHA Enterprise)
1. Register your production domain in Google Cloud reCAPTCHA Enterprise.
2. Obtain your site key.
3. Configure `VITE_FIREBASE_APPCHECK_SITE_KEY="your-recaptcha-site-key"`.

---

## 🛠️ Environment Configuration

Duplicate `.env.example` to `.env` and configure:

```bash
# Firebase Project Credentials
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="1234567890"
VITE_FIREBASE_APP_ID="1:1234567890:web:abcdef"

# Gemini Model Selection (gemini-3.8-flash)
VITE_FIREBASE_AI_MODEL="gemini-3.8-flash"

# App Check (Optional in development, required in production)
VITE_FIREBASE_APPCHECK_SITE_KEY=""
VITE_FIREBASE_APPCHECK_DEBUG_TOKEN=""
```

*Note: If credentials are not supplied, AFTERIMAGE operates gracefully in offline fallback mode with clear visual indicators in the Custodian Console.*

---

## 🚀 Running the Application

### 1. Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 2. Run Verification Test Suite
```bash
node test_suite.js
```

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```
Open **`http://localhost:4173`** in your browser.

---

## 🎭 Hackathon Demo Walkthrough (1-Minute Quick Demonstration)

1. Open **`/capture`** (Capture Story Studio).
2. Click **"Load Demo Craft Story"** in the header banner.
   - Automatically loads *The Breathing Onggi Jars of Ulsan* by Master Jin-Woo Park (86 years old).
3. Click **"Preserve & Run Hybrid AI"**.
4. The system sends the narrative to the Hybrid AI engine:
   - Identifies the unmeasured variable: flame draft temperature judging from smoke color.
   - Highlights the risk: clay explosion at 1,000°C if river air is trapped.
   - Detects missing pine wood moisture parameters.
5. The system routes to **The Missing Questions Engine** (`/missing-questions`).
6. Review the AI-generated questions and click **"Record Answer from Storyteller"**.
7. Enter the response, seal the record, and watch the Preservation Completeness Index update in real time.
8. Check the **AI Transparency Badge** confirming whether it was processed on-device, via cloud Gemini, or via offline fallback.
