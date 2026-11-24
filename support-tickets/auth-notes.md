## Redirect Memory

- AuthedRoute captures the requested location using useLocation().
- Navigate passes the location to Login through state.
- Login reads location.state.from.pathname.
- After successful authentication, navigate() returns the user to the requested page.
- Default destination is /dashboard.

## Authentication Test Results

Record the actual result of each test:
- Wrong password:
- Existing email signup:
- Sign out and browser Back:
- Refresh while signed in:
- Sign out across two tabs:
- Dashboard redirect:
- Ticket detail redirect: