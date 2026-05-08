# Notes App v2

A Node.js + Express backend for managing notes with authentication.

## Features
- User register & login (JWT authentication)
- CRUD operations for notes
- Validation for inputs
- Protected routes with middleware

## API Endpoints
Auth:
- POST /api/auth/register
- POST /api/auth/login

Notes (requires auth):
- GET /api/notes/
- POST /api/notes/
- GET /api/notes/:id
- PUT /api/notes/:id
- DELETE /api/notes/:id

## Setup
1. Clone repo
2. Run `npm install`
3. Add `.env` with:
   - PORT
   - MONGO_URI
   - JWT_SECRET
4. Start server: `npm run dev`
