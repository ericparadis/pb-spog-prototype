# Changelog

All notable changes to the gym franchise SaaS prototype are documented here.

---

### February 12, 2026 — 11:50 AM
**What changed:** Scaffolded complete React/Vite project infrastructure
**Screens affected:** Dashboard, Members, Schedule, Check-In (all routes now functional)
**Status:** Built

Complete infrastructure setup including:
- React 18 + TypeScript with Vite build tool
- Tailwind CSS + shadcn/ui component library
- Multi-tenant theming system (3 brands: FitZone, PowerLift, ZenGym)
- Role-based authentication (5 roles: Franchise Owner, Regional Manager, Gym Manager, Front Desk, Trainer)
- Sample data layer with TypeScript types and JSON fixtures
- MSW mock API for realistic data fetching
- Shared component library (PageHeader, PageContent, StatCard, DataTable, BrandSwitcher, RoleSwitcher, AppLayout)
- React Router v6 with lazy-loaded features
- Initial feature screens with Dashboard displaying stat cards

To view: `npm run dev` and visit http://localhost:5173

---

### February 12, 2026 — 4:10 PM
**What changed:** Added deployment architecture documentation
**Screens affected:** None (documentation only)
**Status:** Built
**To revert:** "Undo the deployment documentation addition"

Created DEPLOYMENT.md documenting the decision to use SST v3 with StaticSite for deployment to AWS CloudFront + S3. Includes evaluation of alternatives (Vercel, manual AWS setup, CloudFormation) and implementation details for auto-deployment on push to main.

---
