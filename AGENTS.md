# AGENTS.md - Repository Guidelines & Standing Instructions

## 1. Project Identity & Live Production Website
- **Platform Name**: The Prescription
- **Official Live Website**: [https://www.theprescription.in](https://www.theprescription.in) (also accessible at `www.theprescription.in`)
- **Repository**: [https://github.com/ikingarmaan/The-Prescriptions](https://github.com/ikingarmaan/The-Prescriptions)
- **Primary Goal**: Clinical prescription decoding, drug safety analysis, 24-hour visual schedule generation, and patient education.

---

## 2. Strict Working Directory Rule (CRITICAL)
- **MANDATORY WORKING DIRECTORY**: `/Users/ikingarmaan/Desktop/Websites/The Prescription`
- **NEVER** use, create, or modify files in `/Users/ikingarmaan/Downloads/` or any other temporary path. Always verify your current working directory before executing commands.

---

## 3. Mandatory Automatic Change Synchronization (MANDATORY)
Whenever ANY changes, additions, refactors, or bug fixes are made to the codebase:
1. **README.md Synchronization**:
   - Automatically update `README.md` to reflect new/modified features, updated API endpoints, new dependencies, or updated architecture.
   - Maintain the prominent header link to `www.theprescription.in` at the very top of `README.md`.
2. **Environment Template Synchronization**:
   - If any new environment variable is introduced (or modified in `server.ts` or client configs), automatically document it in `.env.example` with clear comments and examples.
3. **Package Metadata Synchronization**:
   - Keep `package.json` updated with any new scripts, dependencies, or metadata.
4. **Verification & Testing**:
   - Always run `npm run build` to verify compilation (`tsc`, `vite build`, `esbuild`) before finalizing.
5. **Git Synchronization**:
   - Stage changes, commit with clean conventional commit messages, pull with rebase if needed, and push to `origin main`.

---

## 4. Architecture & Coding Conventions
- **Frontend**: React 19 + TypeScript + Tailwind CSS v4.
- **Backend**: Node.js Express server (`server.ts`) bundled with `esbuild`.
- **AI Engines**:
  - Primary: Google Gemini 2.5 / 3 Flash with multi-key pool rotation.
  - Failovers: Groq (Llama 3.2 Vision) and xAI Grok Vision.
- **Privacy Standard**: Zero-retention. Prescription images are analyzed in-memory and never persisted to disks or external cloud databases.
