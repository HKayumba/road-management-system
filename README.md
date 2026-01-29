# Road Maintenance Management System

A full-stack web application for recording, tracking, and managing road maintenance issues. Built with Next.js, TypeScript, PostgreSQL, and Drizzle ORM.

## Features

- **Role-Based Authentication**: Admin and Field Worker roles with secure password hashing
- **Public Issue Reporting**: Citizens can report road issues without an account
- **Field Worker Dashboard**: Field workers can report issues and manage assigned tasks
- **Admin Dashboard**: Comprehensive dashboard for managing all issues and field workers
- **Real-time Data**: All data is stored in PostgreSQL database
- **GPS Location Capture**: Optional GPS coordinates for issue locations

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Custom session-based auth with bcrypt
- **UI Components**: Radix UI + Tailwind CSS
- **Form Handling**: React Hook Form + Zod

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/road_maintenance
NODE_ENV=development

# Supabase (for file storage)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace the `DATABASE_URL` with your PostgreSQL connection string, and set your Supabase URL and anon key from the Supabase dashboard.

### 3. Set Up Database

Generate database migrations:

```bash
npm run db:generate
```

Apply migrations to your database (you may need to run this manually depending on your setup):

```bash
# Using drizzle-kit push (for development)
npx drizzle-kit push

# Or use your preferred migration tool
```

### 4. Seed Initial Data

Create default admin and field worker accounts:

```bash
npm run db:seed
```

Default credentials:
- **Admin**: `admin@roadmaintenance.gov` / `admin123`
- **Field Worker**: `worker@roadmaintenance.gov` / `worker123`

**⚠️ Important**: Change these passwords in production!

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── (root)/              # Public pages
│   │   ├── page.tsx         # Homepage
│   │   └── report/          # Public report form
│   ├── auth/                # Authentication
│   │   ├── login/           # Login page
│   │   └── actions/         # Auth server actions
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── admin/          # Admin dashboard
│   │   └── fieldworker/    # Field worker dashboard
│   └── issues/              # Issue server actions
├── components/
│   ├── Forms/              # Form components
│   ├── Issues/             # Issue management components
│   └── dashboard/          # Dashboard UI components
├── lib/
│   ├── db/                 # Database configuration
│   │   ├── schema/         # Database schemas
│   │   └── index.ts        # DB connection
│   └── auth.ts             # Authentication utilities
└── scripts/
    └── seed.ts             # Database seeding script
```

## User Roles

### Admin
- View all issues
- Assign issues to field workers
- Update issue status
- Manage field workers
- View dashboard statistics

### Field Worker
- Report new issues
- View assigned issues
- Update status of assigned issues
- View personal statistics

## Database Schema

### Users Table
- `id`: Primary key
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `role`: Admin or FieldOfficer
- `createdAt`: Account creation timestamp

### Road Issues Table
- `id`: Primary key
- `roadName`: Name of the road
- `locationDetails`: Detailed location description
- `latitude`: GPS latitude (optional)
- `longitude`: GPS longitude (optional)
- `issueType`: pothole, cracks, drainage, signage, other
- `severity`: Low, Medium, High
- `status`: Reported, In Progress, Completed
- `assignedTo`: Foreign key to users table
- `reportedAt`: Issue report timestamp

## API Routes (Server Actions)

### Authentication
- `login()`: Authenticate user and create session
- `logout()`: Destroy user session
- `getSession()`: Get current user session

### Issues
- `createIssue()`: Create a new road issue
- `getIssues()`: Get all issues
- `getIssueById()`: Get issue by ID
- `updateIssueStatus()`: Update issue status
- `assignIssue()`: Assign issue to field worker
- `getIssuesByAssignee()`: Get issues assigned to a user
- `getDashboardStats()`: Get dashboard statistics

### Users
- `getAllFieldWorkers()`: Get all field worker accounts

## Security Features

- Password hashing with bcrypt
- HTTP-only cookies for session management
- Role-based route protection
- Server-side validation
- SQL injection protection via Drizzle ORM

## Development

### Database Migrations

Generate migrations after schema changes:

```bash
npm run db:generate
```

### Linting

```bash
npm run lint
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Ensure `DATABASE_URL` points to your production database
3. Run database migrations
4. Seed initial admin account (if needed)
5. Build the application:

```bash
npm run build
npm start
```

## License

This project is private and proprietary.
