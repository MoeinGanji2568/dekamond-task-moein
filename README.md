# Dekamond Task - Moein

A clean authentication flow built with Next.js, Prisma, and React. This project demonstrates a two-step (wizard) login process with email verification, JWT authentication, and protected routes.

## Features

- Next.js 13+ (App Router)
- Two-step login (email + OTP)
- JWT authentication (token stored in cookie)
- Protected dashboard/profile route
- User context and profile fetch
- Clean, modular code structure
- Toast notifications for user feedback
- Prisma ORM with SQLite

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd dekamond-task-moein
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

> **Note:** The `.env` file is not tracked in git. You must create it manually. Example:
>
> ```env
> DATABASE_URL="file:./prisma/dev.db"
> NEXT_PUBLIC_BASE_URL="http://localhost:3000"
> ```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- Go to `/login` to start the authentication process.
- Enter your email to receive a one-time code (OTP).
- Enter the code to log in. On success, you will be redirected to your profile.
- The profile route is protected and only accessible with a valid token.

## Project Structure

- `src/app/` - Next.js app directory (pages, API routes)
- `src/core/services/` - API and HTTP utilities
- `src/context/user/` - User context and types
- `src/view/` - UI views and components
- `src/utils/` - Shared utilities (e.g., authentication helpers)

## Notes

- The authentication token is stored in an HTTP-only cookie for security.
- All API requests automatically include the token if available.
- The code is modular and easy to extend for real-world use cases.

## License

This project is for technical evaluation and demonstration purposes.
