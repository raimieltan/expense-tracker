# expense-tracker

Personal finance app — track expenses, set monthly budgets, visualize spending. Next.js 14 + Prisma + PostgreSQL, with a layered controller / service / repository backend and a Three.js-rendered visual on the dashboard.

## Stack

- Next.js 14 (App Router) + TypeScript
- Prisma + PostgreSQL
- JWT auth — `bcrypt`, `jsonwebtoken`, httpOnly cookies
- Chart.js + `react-chartjs-2` for budget breakdowns
- `@react-three/fiber` + `drei` for the 3D dashboard element

## Architecture

Explicitly layered inside `src/`:

- `controllers/` — parse/validate HTTP input, shape the response
- `services/` — domain logic (budget totals, expense allocation)
- `repository/` — Prisma access
- `middlewares/` — JWT verification
- `app/api/{auth,budgets,expenses}/` — route handlers delegate to controllers

The separation is heavier than a personal CRUD app needs by default — the point was to practice NestJS-style backend patterns inside Next.js route handlers.

## Data model

- **User** → has many `Budget`, has many `Expense`
- **Budget** → has many `Expense`
- Expenses optionally roll up to a budget; un-budgeted expenses remain visible but are excluded from budget math.

## Local dev

```bash
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/expense_tracker
JWT_SECRET=change-me

npm install
npx prisma migrate dev
npm run dev
```
