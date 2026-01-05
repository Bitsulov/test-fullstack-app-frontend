# Test-fullstack-app-frontend
### Web frontend application.  
- Technologies Stack:  
  - Language: TypeScript + SCSS
  - Framework: React
  - Build tool: Vite
  - Other:
    - Redux
    - Axios
    - Tanstack React Query
    - Eslint
> This repository is submodule of main repository ([Test-fullstack-app](https://github.com/Bitsulov/test-fullstack-app.git)) that runs using docker compose.
---
## Structure
- Frontend/
  - nginx/ - nginx config
  - public/
  - src/ - source code
    - app/
    - pages/
    - widgets/
    - features/
    - entities/
    - shared/
  - index.html - entry point
  - package.json - app dependencies
  - tsconfig.json
  - vite.config.ts
---
## Dependencies and requirements
- **Node.js 18+** - runtime JavaScript
- **npm / yarn / pnpm** - package manager for Node.js
- **Docker** - platform for build and run apps in insulated containers
- **Docker Compose** (if run docker compose) - tool for simple run multiple containers in single virtual network
## Installation and run
> The run must be done in the *main repository ([Test-fullstack-app](https://github.com/Bitsulov/test-fullstack-app.git))*.

**Run frontend container (development):**
```bash
  docker compose -p test-fullstack-dev -f docker-compose-dev.yml --env-file <YOUR_DEV_ENV_FILE> up frontend -d
```
**Run frontend container (production):**
```bash
  docker compose -p test-fullstack-prod -f docker-compose-prod.yml --env-file <YOUR_PROD_ENV_FILE> up frontend -d
```
---
## Configuration
Required create .env file with variables:
1. `VITE_CRYPTO_KEY=` (or `CRYPTO_KEY=` in main repository)
    - Algorithm: AES-256
    - Base64-string
2. `VITE_API_BASE=` (or `API_BASE=` in main repository)
    - dev: `http://localhost:8080/api`
    - prod: `/api` (using nginx)
---
## Links
1. *main repository ([Test-fullstack-app](https://github.com/Bitsulov/test-fullstack-app.git))*
2. *backend repository ([Test-fullstack-app-backend](https://github.com/Bitsulov/test-fullstack-app.git))*
