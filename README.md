# AI-Powered Soil Analytics System

AI-Powered Soil Analytics System is a farmer-facing Progressive Web App backed by a FastAPI service. It combines soil-test values with trained CNN/XGBoost model artifacts to return nutrient deficiency, soil-health, fertilizer, soil-management, and crop recommendations.

## Architecture

```mermaid
flowchart LR
    Farmer[Farmer on Android Chrome] --> PWA[Next.js PWA\nfarmer-pwa]
    PWA -->|JSON / multipart requests| API[FastAPI\nbackend]
    API --> DB[(PostgreSQL)]
    API --> ML[CNN + XGBoost model loaders]
    ML --> Result[Analysis and recommendations]
    API --> Result
    Result --> PWA
    PWA --> PDF[Client-side PDF report]
```

## Technology stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind/PostCSS, `lucide-react`, `jspdf`.
- Backend: FastAPI, Uvicorn, Pydantic, SQLAlchemy, Psycopg 3, Passlib/bcrypt.
- Models: TensorFlow/Keras/TFLite soil classifier and XGBoost nutrient/crop models.
- Data: PostgreSQL for user records and SQLAlchemy ORM.

## Folder structure

```text
backend/
  main.py                  FastAPI application and router registration
  routes/                  Authentication and soil-analysis endpoints
  schemas.py               Authentication request schemas
  database.py              PostgreSQL engine and session dependency
  models.py                SQLAlchemy models
  *_model_loader.py        Existing model loading and preprocessing
  models/                  Model artifacts and class/scaler metadata
  requirements.txt         Pinned backend dependencies
farmer-pwa/
  app/                     Next.js app-router pages and components
  lib/api.ts               Shared browser API base URL and API helper
  public/                  PWA icons and static assets
  package.json             Frontend scripts and pinned direct dependencies
  .env.example             Browser API configuration template
```

## Setup

### Backend

PowerShell:

```powershell
Set-Location .\backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
```

Set the variables from `.env` in the process environment before starting FastAPI. For a PowerShell session:

```powershell
$env:DATABASE_URL = "postgresql+psycopg://postgres:change-me@localhost:5432/soilcare"
$env:CORS_ORIGINS = "http://localhost:3000,http://127.0.0.1:3000"
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The database must exist before using authentication routes. The existing `create_tables.py` can be used according to the project’s PostgreSQL setup.

### Frontend

In a second PowerShell window:

```powershell
Set-Location .\farmer-pwa
npm ci
Copy-Item .env.example .env.local
$env:NEXT_PUBLIC_API_BASE_URL = "http://127.0.0.1:8000"
npm run dev
```

Open `http://localhost:3000`. Production checks are:

```powershell
npm run typecheck
npm run lint
npm run build
```

## Environment variables

Backend variables are documented in [backend/.env.example](./backend/.env.example). Use `DATABASE_URL` or the `POSTGRES_*` component variables, and set comma-separated `CORS_ORIGINS`.

Frontend uses `NEXT_PUBLIC_API_BASE_URL`, documented in [farmer-pwa/.env.example](./farmer-pwa/.env.example). Never put database credentials or private tokens in a `NEXT_PUBLIC_*` variable.

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | API running message |
| GET | `/health` | Health check |
| GET | `/api/test` | Frontend/backend connectivity test |
| POST | `/auth/register` | Create a user account |
| POST | `/auth/login` | Authenticate a user |
| POST | `/soil/analyze` | Analyze soil values and return recommendations |

The request and response JSON shapes are defined by the existing application code and are intentionally unchanged by this upload preparation.

## Model artifacts

The current model files are below GitHub’s 50 MB single-file limit (the largest checked file is approximately 16.35 MB), so they can remain in the repository if the team chooses. For a smaller repository or future larger weights, host them in Hugging Face, Google Drive, or Git LFS and download them into `backend/models/` before starting the backend. Do not commit files larger than 50 MB.

Example future download step:

```powershell
# Replace the URL with the project’s approved artifact host.
Invoke-WebRequest -Uri "https://example.invalid/model-file" -OutFile ".\backend\models\model-file"
```

## Contributors

The repository was initialized for upload without prior Git history, so author-to-module attribution cannot be verified from commits. Please replace these placeholders with the team’s confirmed records:

| Team member | Contribution |
| --- | --- |
| `<name>` | Backend API, database, and authentication |
| `<name>` | CNN/XGBoost model training and inference |
| `<name>` | Next.js PWA pages and frontend integration |
| `<name>` | Testing, documentation, and deployment |

## Known limitations

- The current backend expects PostgreSQL and locally available model artifacts.
- The PDF is generated in the browser by the frontend.
- The model outputs are decision support and should be reviewed with qualified agricultural guidance.
- Production deployment still needs an HTTPS origin, managed secrets, database migrations, and an approved model-artifact distribution plan.
