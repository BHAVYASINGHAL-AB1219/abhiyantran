# ABHIYANTRAN Event Registration API (PHP + MongoDB)

This backend stores event registrations from the frontend form into **MongoDB Atlas**.

## Requirements

- PHP 7.4+ with extensions: `json`, `mongodb`
- [MongoDB PHP driver](https://www.php.net/manual/en/set.mongodb.php) (install via PECL: `pecl install mongodb`)
- Composer

## Setup

1. **Install PHP dependencies**

   ```bash
   cd backend
   composer install
   ```

2. **Configure MongoDB**

   - Copy `.env.example` to `.env` (if you don’t have one yet).
   - Set `MONGODB_URI` in `.env` to your MongoDB Atlas connection string.
   - Optional: set `MONGODB_DB` (default: `abhiyantran`).

   **Important:** Do not commit `.env` or share your connection string. If it was ever exposed, change your Atlas user password.

3. **Run the PHP server (local dev)**

   From the project root, run the backend so the frontend proxy can reach it:

   ```bash
   cd backend
   php -S 127.0.0.1:8000
   ```

4. **Run the frontend**

   From the project root:

   ```bash
   npm run dev
   ```

   The Vite dev server proxies `/api/*` to `http://127.0.0.1:8000`, so form submissions go to the PHP backend.

## Production

- Deploy the `backend/` folder to a PHP-capable host (e.g. shared hosting, VPS with PHP-FPM).
- Set `MONGODB_URI` (and optionally `MONGODB_DB`) in the server environment or in `.env` on the server.
- In the frontend, set `VITE_API_URL` to your backend base URL (e.g. `https://api.yoursite.com`) so the form POSTs to the correct host.

## API

### `POST /register.php`

**Request:** `Content-Type: application/json`

```json
{
  "eventId": 2,
  "eventTitle": "Hackathon 2025",
  "teamName": "Team Alpha",
  "collegeName": "NIT Sikkim",
  "leaderName": "Jane Doe",
  "leaderEmail": "jane@example.com",
  "leaderPhone": "9876543210",
  "year": "2nd Year",
  "teamMembers": [
    { "name": "John", "email": "john@example.com", "phone": "9876543211" }
  ]
}
```

**Success (200):** `{ "success": true, "message": "Registration saved successfully", "id": "..." }`  
**Error (4xx/5xx):** `{ "success": false, "error": "...", "detail": "..." }`

## Database

- **Database:** `abhiyantran` (or value of `MONGODB_DB`)
- **Collection:** `event_registrations`

Each document has:

- `eventId`, `eventTitle`, `teamName`, `collegeName`
- `leader`: `{ name, email, phone, year }`
- `teamMembers`: array of `{ name, email, phone }`
- `createdAt`: UTC datetime

Create the database and collection in MongoDB Atlas (they are created automatically on first insert if your user has write access).
