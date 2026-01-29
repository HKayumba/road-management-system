-- SQL script to create an admin user
-- Run this directly in your Supabase SQL Editor or PostgreSQL client

-- First, make sure you have the bcrypt extension (if not already enabled)
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert admin user with hashed password
-- Password: admin123 (hashed with bcrypt)
-- You can generate a new hash using: SELECT crypt('your_password', gen_salt('bf', 10));

INSERT INTO users (name, email, password, role, created_at)
VALUES (
  'Admin User',
  'admin@roadmaintenance.gov',
  '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', -- This is a placeholder, use the actual hash from the seed script
  'Admin',
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Note: The password hash above is a placeholder.
-- For production, use the seed script (npm run db:seed) which properly hashes passwords with bcryptjs.
