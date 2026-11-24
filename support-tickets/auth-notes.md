
# TicketDesk - Authentication Notes

## 1. Two-Layer Authentication Model

TicketDesk uses two layers to manage user authentication and profile information.

### Layer 1: auth.users

- Managed by Supabase Authentication.
- Stores user authentication information, including email and password-related data.
- Supabase automatically creates a unique user ID.
- We do not directly manage this table.

### Layer 2: agents Table

- This is our own database table.
- Stores agent profile information.
- Contains id, name, email and role.
- The agents.id must be the same as the corresponding auth.users.id.

## 2. How Both Layers Connect

1. A user signs up using supabase.auth.signUp().
2. Supabase creates an authentication user.
3. Supabase returns the user's ID.
4. We use the same ID when creating the agent's profile in the agents table.
5. tickets.assigned_to and ticket_comments.agent_id reference agents.id.

This helps us identify which agent is assigned to a ticket and which agent wrote a comment.

## 3. Email Confirmation

- Email provider is enabled in Supabase.
- Email confirmation is disabled for development.
- This allows users to receive a session immediately after signup without confirming their email.
- Email confirmation must be re-enabled before production.

## 4. Authentication Functions

We will use three main Supabase authentication functions this week.

### signUp()

Creates a new user account using an email address and password.

### signInWithPassword()

Allows an existing user to log in using their email and password.

### signOut()

Logs out the currently authenticated user.

## 5. Session

A session represents the currently signed-in user.

After successful login, Supabase provides a session containing authentication tokens.

The Supabase client automatically manages and refreshes the session.

We can use supabase.auth.getSession() to check the current session.

## 6. Important Note

Authentication information is managed by Supabase, while agent profile information is stored in our own agents table.

Both tables are connected using the same user ID.
