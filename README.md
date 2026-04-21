# Microservices Inventory Management System

Simple DevOps-friendly microservices project with Node.js (Express), React, PostgreSQL, and an API Gateway.

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

- POSTGRES_USER
- POSTGRES_PASSWORD

## Notes

This demo stores passwords in plain text for simplicity. Do not use this approach in production.
