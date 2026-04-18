# Microservices Inventory Management System

Simple DevOps-friendly microservices project with Node.js (Express), React, MongoDB, and an API Gateway. Built as a DevOps team inventory workspace.

## Services

- Auth Service: register, login
- Product Service: CRUD products
- API Gateway: routes requests to services
- Frontend: React app with login, register, and product dashboard

## Run with Docker Compose

```bash
docker compose up --build
```

Then open:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:8081

## Run Tests (Docker)

```bash
docker compose -f docker-compose.test.yml up --build --abort-on-container-exit
```

## API Endpoints

- Auth Service (via gateway):
  - POST /auth/register
  - POST /auth/login
- Product Service (via gateway):
  - GET /products
  - POST /products
  - PUT /products/:id
  - DELETE /products/:id

## Environment Variables

Docker Compose reads values from `.env` in the project root.

- MONGO_URI (used for local, non-Docker runs)
- ADMIN_NAME
- ADMIN_EMAIL
- ADMIN_PASSWORD
- VITE_API_URL

## Notes

This demo stores passwords in plain text for simplicity. Do not use this approach in production.

## Default Account

When `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` are set, the auth service creates a default account on startup if it doesn't already exist.
