
# Supabase Database Seed Data

## Project
Ticket Management System

## Database Tables
1. agents
2. tickets
3. ticket_comments
4. ai_logs

## Insert Agents

```sql
INSERT INTO agents (name, email, role)
VALUES
('Priya Sharma', 'priya@ticketdesk.dev', 'agent'),
('Arjun Mehta', 'arjun@ticketdesk.dev', 'admin');
```

## Insert Tickets

```sql
INSERT INTO tickets (
  customer_name,
  customer_email,
  subject,
  description,
  category,
  priority,
  status
)
VALUES
(
  'Ravi Kumar',
  'ravi@example.com',
  'Payment charged twice',
  'I was charged two times for the same subscription this month. Please refund one charge.',
  'billing',
  'high',
  'open'
),
(
  'Sneha Patel',
  'sneha@example.com',
  'Cannot upload profile photo',
  'The upload button spins forever and nothing happens when I try to add a profile photo.',
  'technical',
  'medium',
  'open'
),
(
  'Imran Ali',
  'imran@example.com',
  'How do I change my email address?',
  'I want to change the login email for my account but cannot find the setting.',
  'account',
  'low',
  'open'
);
```
