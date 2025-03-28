# Full Stack Vibe Coding Template

A modern, modular full-stack application starter template with NextJS frontend and Python FastAPI backend, supabase backend for Vibe coding.

Contains all the common boilerplate features. Just add the README.md and CONTEXT.md files to AI coding agent's context.

Dont waste your time and tokens on boilerplate code. Use it to build your app

## Features

### Backend (Python FastAPI)
- **FastAPI REST API** - Fast, type-checked API development
- **Supabase Integration**
  - Authentication (Google, LinkedIn, Email/Password)
  - Database connectivity
  - Realtime subscriptions
  - Storage management
  - Database migrations
- **LLM Integration**
  - OpenAI and Claude support
  - Abstracted LLM service
  - Vector embeddings service
- **Vector Database**
  - Qdrant integration
  - Document storage and semantic search
  - Automatic fallback to local in-memory database

### Frontend (Next.js)
- **Next.js** - React framework with routing, SSR, and more
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive design** - Mobile-first approach
- **Supabase client** - For auth and data access
- **Complete auth flows** - Login, signup, password reset

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Make
- Node.js 18+ (for local frontend development)
- Python 3.10+ (for local backend development)
- Supabase CLI (for database migrations, install with `brew install supabase/tap/supabase` or see [Supabase CLI docs](https://supabase.com/docs/guides/cli))

### Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/humanstack/vibe-coding-boilerplate
   cd vibe-coding-boilerplate
   ```

2. Run the first-time setup script to configure your environment:
   ```bash
   ./first-time.sh
   ```
   This will:
   - Check for required tools
   - Guide you through setting up API keys
   - Generate the necessary .env files

3. Start the development environment:
   ```bash
   make dev
   ```

4. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Setup Without Script

If you prefer to set up manually:

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Create a frontend environment file:
   ```bash
   cp .env.example frontend/.env.local
   ```

3. Edit both files to add your API keys for:
   - Supabase (required for auth)
   - OpenAI and/or Anthropic (for LLM features)
   - Qdrant (for vector database features, optional)

4. Start the development environment:
   ```bash
   make dev
   ```

## Authentication Setup

For detailed instructions on setting up authentication providers (Google, LinkedIn, GitHub, etc.), see the [Authentication Setup Guide](./AuthSetup.md).

## Structure

```
/
├── backend/                  # Python FastAPI application
│   ├── app/                  # Application code
│   │   ├── api/              # API endpoints
│   │   ├── core/             # Core functionality
│   │   ├── models/           # Data models
│   │   └── services/         # Service layer
│   │       ├── llm/          # LLM services
│   │       ├── supabase/     # Supabase services
│   │       └── vectordb/     # Vector DB services
│   ├── BACKEND-CONTEXT.md    # Backend documentation
│
├── frontend/                 # Next.js application
│   ├── app/                  # Next.js app directory
│   ├── components/           # UI components
│   ├── services/             # API services
│   ├── FRONTEND-CONTEXT.md   # Frontend documentation
│
├── supabase/                 # Supabase configuration
│   ├── migrations/           # Database migrations
│   ├── seed.sql              # Database seed data
│   └── README.md             # Migrations documentation
│
├── docker-compose.yml        # Docker configuration
├── Makefile                  # Project commands
├── first-time.sh             # Setup script
├── .gitignore                # Git ignore patterns
├── .env.example              # Example environment variables
└── FutureImprovements.md     # Future feature roadmap
```

## Common Tasks

### Development

- Start all services: `make dev`
- Frontend only: `make dev-frontend`
- Backend only: `make dev-backend`

### Production

- Start production services: `make prod`
- Frontend only: `make prod-frontend`
- Backend only: `make prod-backend`

### Cleanup

- Clean up containers: `make clean`

### Database Migrations

- Create a migration: `make db-migration-new name=create_table`
- Apply migrations to remote: `make db-apply`
- List applied migrations: `make db-list`
- Check pending migrations: `make db-status`
- Push migrations (same as apply): `make db-push`

See `supabase/README.md` for more details on database migrations.

## Documentation

- [Backend Documentation](./backend/BACKEND-CONTEXT.md)
- [Frontend Documentation](./frontend/FRONTEND-CONTEXT.md)
- [Authentication Setup Guide](./AuthSetup.md)
- [Future Improvements](./FutureImprovements.md)

## License

MIT
