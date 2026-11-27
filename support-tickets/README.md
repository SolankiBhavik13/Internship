# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Submit Ticket Flow - QA and Polish

The Submit Ticket page includes:

- Form validation for name, email, subject and description.
- Email trimming and lowercase normalization.
- Description character counter.
- Soft warning for descriptions longer than 5,000 characters.
- Loading indicator during submission.
- Protection against duplicate submissions.
- Success and error messages.
- Responsive layout for mobile screens.
- Keyboard accessibility.

### Screenshots

Add screenshots of:

1. Submit Ticket page.
2. Form validation errors.
3. Successful ticket submission.
4. Dashboard showing the submitted ticket.
5. Mobile responsive layout.


## Screen 2 — Agent Authentication

TicketDesk provides authentication for support agents using Supabase Auth.

### Sign In

Agents can sign in using their registered email address and password.

![Agent Sign In](screenshots/login-signin.png)

### Sign Up

New agents can create an account by entering their name, email address, and a password containing at least 8 characters.

![Agent Sign Up](screenshots/login-signup.png)

### Signed-in Navbar

When an agent is signed in, the navbar displays the agent's name, Dashboard link, and Sign Out button.

![Signed-in Navbar](screenshots/navbar-signed-in.png)

### How Authentication Works

1. When an agent signs up, Supabase Auth creates their authentication account.
2. The application inserts a matching row into the `agents` table using the authentication user's ID, name, email, and role.
3. `AuthContext` stores the current session and agent profile so components can access authentication state through `useAuth()`.
4. `AuthedRoute` protects the dashboard and ticket detail pages by redirecting signed-out users to `/login`.
5. The requested page is saved during that redirect, and after successful sign-in the agent is returned to that page.
6. Email confirmation is disabled in the development Supabase project so new agents can sign in immediately while testing. Production should use an appropriate email-verification setup.


## Supabase Edge Function

The `triage-ticket` Edge Function accepts a ticket ID,
validates the request, and checks whether the Gemini API
key is configured on the server.

### Run locally

```bash
npx supabase start
npx supabase functions serve triage-ticket
```

### Required secret

`GEMINI_API_KEY`

The Gemini API key is stored securely in Supabase Secrets
and is never exposed to the frontend.

No Gemini AI call is implemented yet.
