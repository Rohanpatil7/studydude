# StudyDude Backend (Starter)

Backend foundation for Maharashtra State Board learning platform.

## What is included
- Express API gateway with security middleware, request logging, and rate-limiting.
- Auth service with register/login + JWT.
- Curriculum routes (`books`, `chapters`, `topics`).
- Learning routes (`/learn/explain`, `/learn/quiz`, `/learn/submit`) with cache-first flow.
- Progress dashboard route.
- In-memory stores for MVP (swap with MongoDB + Redis + Vector DB in next step).

## Run locally
```bash
npm install
npm run dev
```

Server URL: `http://localhost:4000`

## Planned next step
- Replace in-memory stores with MongoDB, Redis, and vector search service.
- Move AI service to Python microservice with RAG pipeline.
