# Changelog

All notable changes to the gym franchise SaaS prototype are documented here.

---

### February 12, 2026 — 1:55 PM
**What changed:** Added collapsible prototype control panel
**Screens affected:** All screens (global UI change)
**Status:** Built

Created a collapsible control panel that sits above the application UI:
- Moved brand and role switchers from AppLayout header to dedicated control panel
- Added toggle button to collapse/expand panel
- Added placeholder metadata sections (version, build date, deployment status)
- Clear visual separation between prototype controls and actual app UI

The control panel makes it easy for stakeholders to switch contexts (brand/role) while clearly distinguishing prototype tooling from the actual product interface.

To toggle: Click the expand/collapse button in the top-right of the control panel.

---

### February 12, 2026 — 12:25 PM
**What changed:** Implemented SST v3 deployment infrastructure
**Screens affected:** None (infrastructure only)
**Status:** Built

Added complete AWS deployment infrastructure:
- SST v3 framework with StaticSite construct for S3 + CloudFront deployment
- GitHub Actions workflow for auto-deployment on push to main
- AWS IAM user setup guide (docs/AWS_SETUP.md)
- CloudFront + S3 deployment configuration

**Next steps for deployment:**
1. Follow docs/AWS_SETUP.md to create AWS IAM user and get credentials
2. Add AWS credentials to GitHub Secrets (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
3. Run initial manual deploy: `npm run deploy`
4. After initial deploy, all future pushes to main auto-deploy via GitHub Actions

To deploy manually: `npm run deploy`

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
