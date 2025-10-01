# Veritone Tech — Fullstack Shopping List

This project is a simple full-stack web app with:

- **Backend**: [NestJS](https://nestjs.com/) + [Prisma](https://www.prisma.io/) + SQLite
- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [Material UI](https://mui.com/) + [TanStack Query](https://tanstack.com/query)
- **Infrastructure**: Dockerized services orchestrated with Docker Compose

The app allows managing a shopping list (add/edit/delete/toggle items) with persistence in a database.

---

## 📂 Project Structure

```
.
├── backend/       # NestJS API + Prisma (SQLite)
│   ├── src/       # NestJS source code
│   ├── prisma/    # Prisma schema and migrations
│   └── Dockerfile
├── frontend/      # React (Vite) + MUI client
│   ├── src/       # React source code
│   └── Dockerfile
└── docker-compose.yml
```

---

## ⚙️ Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

> No need to install Node, pnpm, or Prisma locally — everything runs inside containers.

---

## 🚀 Running the App

1. **Clone the repo**

   ```bash
   git clone <your-repo-url>
   cd veritone-tech
   ```

2. **Build and start the containers**

   ```bash
   docker compose build
   docker compose up -d
   ```

3. **Access the services**

   - Frontend → [http://localhost:5173](http://localhost:5173)
   - Backend → [http://localhost:3000](http://localhost:3000)

---

## 🔌 API

The backend exposes a REST API (NestJS + Prisma). Example routes:

- `GET /shopping-items` → list items
- `POST /shopping-items` → add item
- `PATCH /shopping-items/:id` → edit item
- `DELETE /shopping-items/:id` → remove item

---

## 🖥️ Frontend

- Built with React + Vite + MUI
- Uses **TanStack Query** for data fetching and caching
- Configurable API base URL at build time:

  ```bash
  VITE_API_BASE_URL=http://localhost:3000
  ```

  (This is already wired in the Docker build.)

---

## 🛠️ Development (optional, outside Docker)

If you want to run locally:

```bash
# Backend
cd backend
pnpm install
pnpm prisma migrate dev
pnpm start:dev

# Frontend
cd frontend
pnpm install
pnpm dev
```

---

## 🗄️ Database

- **SQLite** is the default (stored in a Docker volume).
- Prisma schema is in `backend/prisma/schema.prisma`.
- To create new migrations:

  ```bash
  cd backend
  pnpm prisma migrate dev --name <migration-name>
  ```

---

## 📦 Useful Commands

```bash
# Stop containers
docker compose down

# View logs
docker compose logs -f

# Rebuild everything (if deps change)
docker compose build --no-cache
```

---

## ✅ Status

- [x] Backend container (NestJS + Prisma + SQLite)
- [x] Frontend container (React + Vite build → Nginx)
- [x] One-command spin up with Docker Compose
