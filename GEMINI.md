# GEMINI.md - Standing Instructions & Agent Protocols

## 1. Official Live Production Website
- **Live Website**: [https://www.theprescription.in](https://www.theprescription.in) (and `www.theprescription.in`)
- **Repository**: [https://github.com/ikingarmaan/The-Prescriptions](https://github.com/ikingarmaan/The-Prescriptions)
- **Top of README**: Always prominently feature `www.theprescription.in` at the very top of `README.md`.

---

## 2. Mandatory Working Directory (CRITICAL)
- **CWD**: `/Users/ikingarmaan/Desktop/Websites/The Prescription`
- **STRICT PROHIBITION**: NEVER use or create any directory in `/Users/ikingarmaan/Downloads/`.

---

## 3. Mandatory Automatic Change Synchronization
Whenever ANY code, component, feature, or environment change is made:
1. **README.md**: Automatically update documentation, features list, API endpoints, and guides.
2. **.env.example**: Automatically document any newly referenced or modified environment variables.
3. **package.json**: Automatically keep dependencies, scripts, and metadata in sync.
4. **Build Verification**: Run `npm run build` to ensure `tsc`, `vite build`, and `esbuild` succeed with 0 errors.
5. **Git Push**: Commit with clean descriptive commit message, pull with rebase, and push to `origin main`.
