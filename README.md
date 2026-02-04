# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

---

## Deploy to GCP (Cloud Run)

The app is deployed to **Google Cloud Run** on every push to `main` via GitHub Actions.

### Required setup

1. **GCP project**
   - Create or select a project in [Google Cloud Console](https://console.cloud.google.com/).
   - Enable APIs: **Cloud Run**, **Artifact Registry**, **Container Registry** (if needed).

2. **Artifact Registry**
   - Create a repository (e.g. `build-ui`) in Artifact Registry (Docker format) in your chosen region (e.g. `us-central1`).

3. **Service account for GitHub Actions**
   - In GCP: IAM & Admin → Service Accounts → Create.
   - Grant roles: **Cloud Run Admin**, **Artifact Registry Writer**, **Service Account User** (so Cloud Run can deploy as this SA).
   - Create a JSON key and download it. You will use its contents as the `GCP_SA_KEY` secret.

4. **GitHub repository variables and secrets**
   - **Settings → Secrets and variables → Actions.**

   | Type   | Name                     | Description |
   |--------|--------------------------|-------------|
   | Secret | `GCP_SA_KEY`             | Full JSON contents of the service account key file. |
   | Variable | `GCP_PROJECT_ID`       | Your GCP project ID (e.g. `my-project-123`). |
   | Variable | `GCP_REGION` (optional) | Cloud Run + Artifact Registry region. Default: `us-central1`. |
   | Variable | `CLOUD_RUN_SERVICE_NAME` (optional) | Cloud Run service name. Default: `build-ui`. |
   | Variable | `ARTIFACT_REGISTRY_REPO` (optional) | Artifact Registry repo name. Default: `build-ui`. |

### Production-ready notes

- **Lint** runs in CI before build; fix any ESLint errors so the pipeline passes.
- **Docker** builds from `Dockerfile` and serves the Vite production build on port **8080** (Cloud Run default).
- **Cloud Run** is configured with:
  - `--min-instances 0` (scale to zero when idle).
  - `--max-instances 10` (adjust in the workflow if needed).
  - `--memory 512Mi` (increase in the workflow for heavier builds if needed).
- To require auth, remove `--allow-unauthenticated` from the “Deploy to Cloud Run” step and use IAM to control who can invoke the service.
- For custom domains or HTTPS-only, configure **Cloud Run** (or a load balancer) in the GCP console.

### Local Docker

```bash
# Build
docker build -t build-ui .

# Run (app on http://localhost:8080)
docker run -p 8080:8080 -e PORT=8080 build-ui
```

---

## React Compiler

The React Compiler is not enabled in this template because of its impact on dev & build performance. To enable it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

For a production app, consider type-aware ESLint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      tseslint.configs.recommendedTypeChecked,
      // Or: tseslint.configs.strictTypeChecked,
      // Or: tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also add [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific rules.
