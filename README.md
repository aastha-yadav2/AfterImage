# AFTERIMAGE

> *"Some things disappear before we realize they mattered."*  
> **A Living Archive for Things the World is About to Forget.**

[![Build](https://img.shields.io/badge/build-passing-emerald?style=flat-square)](https://github.com/aastha-yadav2/AfterImage)
[![Firebase AI Logic](https://img.shields.io/badge/Firebase%20AI%20Logic-v13.4.0-amber?style=flat-square)](https://firebase.google.com/)
[![Hybrid AI](https://img.shields.io/badge/Inference-Hybrid%20On--Device%20%2B%20Cloud-blue?style=flat-square)](#hybrid-ai-architecture)
[![License: MIT](https://img.shields.io/badge/License-MIT-parchment.svg?style=flat-square)](./LICENSE)

---

## Overview

**AFTERIMAGE** is an AI-powered cultural heritage preservation platform built for capturing, structuring, and safeguarding fragile human knowledge before it disappears—traditional crafts, oral histories, heirloom recipes, endangered languages, rituals, and tacit family wisdom.

Rather than treating oral history as passive text transcripts, AFTERIMAGE transforms recorded memories into an interactive, spatial museum and an active preservation engine.

---

## Core Capabilities

### 1. Spatial 3D Memory Archive
* **Fibonacci Celestial Sphere (`SpatialArchiveSphere`)**: Interactive 3D orbital projection where preserved memories float in a near-black archival space (`#050505`) with smooth drag-to-rotate inertia, scroll-based dolly zoom, depth scaling, and hover-triggered focus.
* **Curated Editorial Grid (`CuratedArchiveGrid`)**: High-contrast photographic index filterable by heritage category (`Crafts`, `Traditions`, `Recipes`, `Oral Histories`, `Places`, `Family Knowledge`, `Languages`).
* **Archival Lightbox (`StoryLightbox`)**: Full-bleed story inspection modal displaying tacit entities, materials, techniques, and unanswered preservation gaps.

### 2. Missing Questions Engine (Signature Feature)
When a story is captured, AFTERIMAGE analyzes the narrative to detect **what was left unsaid**:
* **Tacit Entity Extraction**: Identifies people, raw materials, sensory cues (aroma, sound, touch), tools, and historical periods.
* **Gap Detection**: Pinpoints unmeasured variables, seasonal harvesting windows, failure-recovery steps, and unwritten calibrations.
* **Interview Prompt Generation**: Formulates respectful, specific follow-up questions to ask the knowledge keeper while they are still available.
* **Preservation Completeness Score**: Tracks how thoroughly a tradition is documented as field answers are sealed into the record.

### 3. Hybrid On-Device & Cloud AI Architecture
AFTERIMAGE implements a transparent multi-tier inference pipeline using **Firebase AI Logic** (`firebase/ai`) and the **Chrome Built-in Prompt API**:

```
                     Story Submission
                            │
                            ▼
         ┌──────────────────────────────────────┐
         │   Hybrid AI Router (InferenceMode)   │
         └──────────────────┬───────────────────┘
                            │
          ┌─────────────────┴─────────────────┐
          ▼                                   ▼
 [Tier 1: On-Device]                  [Tier 2: Cloud AI]
 Chrome Prompt API                    Firebase AI Logic SDK
 (Gemini Nano)                        (gemini-3.8-flash)
 Zero-latency & private               Deep structured synthesis
          │                                   │
          └─────────────────┬─────────────────┘
                            │
               (When offline / unavailable)
                            │
                            ▼
                 [Tier 3: Offline Fallback]
                 Deterministic Heuristic Engine
```

* **Honest Source Reporting**: Every analysis displays an explicit badge indicating whether it ran `ON_DEVICE`, `IN_CLOUD`, or via `OFFLINE_FALLBACK`. Failed cloud calls are never misrepresented as cloud successes.
* **Supported Modes**: `PREFER_ON_DEVICE`, `ONLY_ON_DEVICE`, and `ONLY_IN_CLOUD`.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, React Router DOM v6 |
| **Styling** | Tailwind CSS v3, custom archival obsidian/amber design tokens |
| **Icons** | Lucide React |
| **AI & Cloud** | Firebase SDK `v13.4.0`, Firebase AI Logic (`GoogleAIBackend`, `gemini-3.8-flash`) |
| **On-Device AI** | W3C / Chrome Built-in `window.ai` / `LanguageModel` API |
| **Security** | Firebase App Check (Debug Provider for local dev, reCAPTCHA Enterprise for production) |
| **Build Tool** | Vite 6 |

---

## Getting Started

### Prerequisites
* Node.js 18+ and `npm`
* A Firebase project with **Firebase AI Logic** enabled (Gemini Developer API)

### 1. Installation
```bash
git clone https://github.com/aastha-yadav2/AfterImage.git
cd AfterImage
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and fill in your Firebase Web App credentials:

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"

# Firebase AI Logic Model
VITE_FIREBASE_AI_MODEL="gemini-3.8-flash"

# Firebase App Check
VITE_FIREBASE_APPCHECK_SITE_KEY=""
VITE_FIREBASE_APPCHECK_DEBUG_TOKEN=""
```

> **Note:** Never commit `.env` to version control. `.env` is excluded in `.gitignore`.

### 3. Local Development
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## Project Structure

```
d:\after\
├── docs/
│   └── README.md                    # Deep technical & architectural documentation
├── src/
│   ├── components/
│   │   ├── archive/                 # 3D Spatial Sphere, Curated Grid, Story Lightbox
│   │   ├── common/                  # Custom cursor, scroll utilities
│   │   ├── layout/                  # Minimal header, navbar, footer, profile card
│   │   └── ui/                      # Badges, AI transparency indicators, modals
│   ├── context/
│   │   └── ArchiveContext.tsx       # Persistent story state, localStorage sync & healing
│   ├── data/
│   │   └── mockStories.ts           # Curated cultural heritage archive dataset
│   ├── lib/
│   │   └── firebase.ts              # Firebase App, App Check & AI Logic initialization
│   ├── pages/                       # Home, Living Archive, Capture Studio, Story Detail, Settings
│   ├── services/
│   │   └── hybridAIService.ts       # Multi-tier AI routing & Missing Questions Engine
│   └── types/                       # TypeScript domain interfaces
├── .env.example                     # Environment variable template
├── LICENSE                          # MIT License
└── README.md                        # Project overview & quickstart
```

---

## Additional Documentation

For detailed technical documentation covering the 3D spherical projection math, Firebase App Check initialization order, Hybrid AI routing logic, and testing diagnostics, see [docs/README.md](./docs/README.md).

---

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
