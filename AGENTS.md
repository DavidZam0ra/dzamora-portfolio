# AGENTS.md — dzamora-portfolio

> Read this file at the start of every session. Apply caveman mode (full intensity) for all responses.

---

## Communication Rules

- **Always use caveman mode (full)** — terse fragments, no filler, no pleasantries.
- **Always respond in Spanish** unless code/technical terms require English.
- Read this file (`AGENTS.md`) at session start every time.

---

## Project Overview

Personal portfolio for **David Zamora**. Two separate apps in a monorepo:

| App | Stack | Port | Folder |
|-----|-------|------|--------|
| `api` | Express + TypeScript + MongoDB (Mongoose) | `3001` | `/api` |
| `web` | Next.js 14 (App Router) + Tailwind CSS | `3000` | `/web` |

---

## Architecture

### API — Clean Architecture

```
api/src/
  app.ts                         # Entry point, Express bootstrap
  domain/
    entities/                    # Pure TS classes: Profile, Experience, Education, Skill, Project, User
    ports/repositories/          # IXxxRepository interfaces
    ports/services/              # IAuthService interface
  application/
    use-cases/                   # One folder per domain: auth, profile, experience, education, skills, projects
  infrastructure/
    db/
      connection.ts              # Mongoose connect
      mongoose/
        schemas/                 # Mongoose schemas (ProfileSchema, ExperienceSchema, EducationSchema, SkillSchema, ProjectSchema, UserSchema)
        repositories/            # MongoXxxRepository (implements domain interfaces)
    http/
      controllers/               # auth, profile, experience, education, skills, projects
      middleware/                # verifyJWT (Bearer token), errorHandler
      routes/                    # Express routers mounted at /api/*
    services/
      JwtBcryptAuthService.ts    # JWT sign/verify + bcrypt hash/compare
  scripts/
    seed.ts                      # Manual seed
    seed-from-pdf.ts             # OpenAI-powered seed from CV PDF
```

**Key patterns:**
- Dependency inversion: controllers → use-cases → repository interfaces → Mongo implementations.
- Auth: JWT Bearer token. `verifyJWT` middleware protects write routes.
- CORS: `FRONTEND_URL` env var controls allowed origin (default `http://localhost:3000`).
- Port from `PORT` env var (default `3001`).
- `GET /health` endpoint available.

### Web — Next.js App Router

```
web/
  app/
    layout.tsx                   # Root layout
    page.tsx                     # Home / landing
    globals.css
    sobre_mi/page.tsx            # About me
    stack/page.tsx               # Tech stack
    cv_interactivo/page.tsx      # Interactive CV
    admin/
      login/page.tsx             # Admin login
      dashboard/page.tsx         # Admin dashboard
  components/                    # Shared React components
  lib/
    api.ts                       # Fetch helpers to /api/*
    auth.ts                      # Auth utilities
    types.ts                     # Shared TypeScript types
    useAdmin.ts                  # Admin hook
  public/                        # Static assets (CV PDF, avatar, logo)
```

**Key patterns:**
- Next.js 14 App Router (no Pages Router).
- Tailwind CSS for styling.
- Admin section protected by JWT stored client-side.
- `lib/api.ts` centralizes all API calls to backend.

---

## Domain Entities

| Entity | Key fields |
|--------|-----------|
| `Profile` | name, title, summary, email, github, linkedin, location |
| `Experience` | company, role, startDate, endDate, description, technologies |
| `Education` | institution, degree, field, startDate, endDate |
| `Skill` | name, category, level |
| `Project` | title, description, technologies, url, repoUrl, featured |
| `User` | email, passwordHash |

---

## API Routes

All routes under `/api/`:

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/profile` | No | Get profile |
| PUT | `/api/profile` | Yes | Update profile |
| GET | `/api/experience` | No | List experience |
| POST | `/api/experience` | Yes | Create |
| PUT | `/api/experience/:id` | Yes | Update |
| DELETE | `/api/experience/:id` | Yes | Delete |
| GET | `/api/education` | No | List education |
| POST | `/api/education` | Yes | Create |
| PUT | `/api/education/:id` | Yes | Update |
| DELETE | `/api/education/:id` | Yes | Delete |
| GET | `/api/skills` | No | List skills |
| POST | `/api/skills` | Yes | Create |
| PUT | `/api/skills/:id` | Yes | Update |
| DELETE | `/api/skills/:id` | Yes | Delete |
| GET | `/api/projects` | No | List projects |
| POST | `/api/projects` | Yes | Create |
| PUT | `/api/projects/:id` | Yes | Update |
| DELETE | `/api/projects/:id` | Yes | Delete |
| POST | `/api/auth/login` | No | Login → JWT |
| GET | `/api/auth/me` | Yes | Current user |

---

## Dev Commands

```bash
# API
cd api && npm run dev        # nodemon + ts-node, port 3001
cd api && npm run build      # tsc → dist/
cd api && npm run seed       # manual seed
cd api && npm run seed       # seed from PDF via OpenAI

# Web
cd web && npm run dev        # Next.js dev, port 3000
cd web && npm run build
cd web && npm run lint
```

---

## Environment Variables

**API (`api/.env`):**
```
PORT=3001
MONGO_URI=mongodb://...
JWT_SECRET=...
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=...   # only for seed-from-pdf
```

**Web (`web/.env.local`):**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Conventions

- TypeScript strict mode both apps.
- No test suite yet — manual QA via `/health` and browser.
- Mongoose schemas use `timestamps: true`.
- Use-cases receive repositories via constructor injection.
- Controllers instantiate use-cases directly (no DI container).
- Error handling via global `errorHandler` middleware in API.
