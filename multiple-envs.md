# Multiple environments – GitHub Actions + Cloud Run

This repo uses **one reusable CI/CD workflow** and three small caller workflows for each environment.

## Workflows overview

- **Reusable workflow**: `/.github/workflows/cicd.yml`
  - Trigger: `workflow_call` only (not directly on push)
  - Builds the Vite app, builds & pushes the Docker image, and deploys to Cloud Run.
  - Parameters:
    - `inputs.gcp-project-id`
    - `inputs.gcp-region`
    - `inputs.service-name`
    - `inputs.artifact-registry-repo`
    - `inputs.environment` (e.g. `prod`, `dev`, `staging`)
    - `secrets.gcp-sa-key` (GCP service account JSON)

- **Prod workflow**: `/.github/workflows/deploy-prod.yml`
  - Trigger: push to `main`
  - Calls the reusable workflow with:
    - `environment: prod`
    - `service-name`: `CLOUD_RUN_SERVICE_NAME_PROD` var or `build-ui`

- **Dev workflow**: `/.github/workflows/deploy-dev.yml`
  - Trigger: push to `develop`
  - Calls the reusable workflow with:
    - `environment: dev`
    - `service-name`: `CLOUD_RUN_SERVICE_NAME_DEV` var or `build-ui-dev`

- **Staging workflow**: `/.github/workflows/deploy-staging.yml`
  - Trigger: push to `staging`
  - Calls the reusable workflow with:
    - `environment: staging`
    - `service-name`: `CLOUD_RUN_SERVICE_NAME_STAGING` var or `build-ui-staging`

## Branch → environment mapping

- `main` → **prod** → `deploy-prod.yml`
- `develop` → **dev** → `deploy-dev.yml`
- `staging` → **staging** → `deploy-staging.yml`

## Customizing per-environment settings

All three environments currently share:

- `vars.GCP_PROJECT_ID`
- `vars.GCP_REGION` (defaults to `us-central1` if not set)
- `vars.ARTIFACT_REGISTRY_REPO` (defaults to `buildui` if not set)
- `secrets.GCP_SA_KEY`

To customize further:

- **Different Cloud Run service names**
  - Set these repo variables (optional):
    - `CLOUD_RUN_SERVICE_NAME_PROD`
    - `CLOUD_RUN_SERVICE_NAME_DEV`
    - `CLOUD_RUN_SERVICE_NAME_STAGING`
  - If they are not set, the workflows fall back to:
    - prod: `build-ui`
    - dev: `build-ui-dev`
    - staging: `build-ui-staging`

- **Different GCP projects / regions / registries per env**
  - Edit the corresponding caller workflow (`deploy-*.yml`) and swap
    `vars.GCP_PROJECT_ID`, `vars.GCP_REGION`, `vars.ARTIFACT_REGISTRY_REPO`
    for env-specific variables such as:
    - `vars.GCP_PROJECT_ID_PROD`, `vars.GCP_PROJECT_ID_DEV`, `vars.GCP_PROJECT_ID_STAGING`
  - Then define those variables in the repo settings.

- **Different service account keys per env**
  - Add new secrets (e.g. `GCP_SA_KEY_PROD`, `GCP_SA_KEY_DEV`, `GCP_SA_KEY_STAGING`).
  - Update each `deploy-*.yml` to pass the appropriate secret into `gcp-sa-key`.

## Summary

- CI/CD logic lives once in `cicd.yml` (reusable workflow).
- Environments are separated by **caller workflows + branch triggers**.
- You can tweak per-env configuration only in the three small `deploy-*.yml` files.

