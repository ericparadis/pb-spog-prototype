# Changelog

All notable changes to the gym franchise SaaS prototype are documented here.

---

### February 12, 2026 — 6:30 PM
**What changed:** Completed navigation structure with all items from Figma design
**Screens affected:** All screens (navigation completion)
**Status:** Built

Finalized the complete navigation structure extracted from the Figma design file:

**Main Navigation (3 items):**
- Overview - Dashboard view
- Tasks - Task list with badge showing 10 pending items
- Conversations - Message center with badge showing 8 unread

**ADMIN Section (9 items):**
- Location Management - Manage gym locations
- Staff Management - Employee management and scheduling
- Memberships & Packages - Membership plans and pricing
- Catalog Administration - Service catalog management
- Schedule - Class and trainer schedules
- Customers - Customer management with badge showing 2 alerts
- Marketing - Marketing campaigns and promotions
- Resources - Training materials and documentation
- Reporting - Analytics and reports

**Icons:**
Using Lucide icon library with semantically appropriate icons for each menu item. Icons are consistent, professional, and clearly communicate the purpose of each section.

The navigation is fully functional with active state highlighting, notification badges, and smooth interactions. All routes are defined and ready for feature screen implementation.

---

### February 12, 2026 — 5:15 PM
**What changed:** Redesigned layout with left sidebar navigation and modal prototype controls
**Screens affected:** All screens (layout restructure)
**Status:** Built

Complete layout redesign for better space utilization and cleaner UI:

**Left Sidebar Navigation:**
- Moved navigation from top horizontal bar to left vertical sidebar (240px wide)
- Added navigation icons (Dashboard, Members, Schedule, Check-In) for better visual recognition
- Positioned brand logo and name at top of sidebar
- Added user profile section at bottom of sidebar showing avatar, name, and role
- Active page highlighting with primary color background

**Header & Content Area:**
- Clean header bar with "Staff Management" title
- Full-height main content area for detail views
- Better vertical space for data tables and content

**Prototype Controls:**
- Converted from collapsible top panel to modal overlay
- Added floating settings button (bottom-right corner) to open controls
- Modal displays brand switcher, role switcher, and build metadata
- Click backdrop or close button to dismiss
- Controls no longer take up vertical space in the main UI

The new layout provides more screen real estate for content while keeping prototype controls easily accessible without cluttering the interface.

---

### February 12, 2026 — 4:08 PM
**What changed:** Updated brands with real design tokens from Figma
**Screens affected:** All screens (branding change)
**Status:** Built

Replaced placeholder brands with real gym franchise brands using design tokens extracted from Figma:
- **Anytime Fitness** (purple theme - #440099 from Figma design file)
- **Orange Theory Fitness** (orange theme - #F26922 from website)

Updated:
- Brand definitions in brands.json with real names and colors
- Theme CSS with accurate brand color tokens extracted from Figma
- Brand context with new brand configurations
- Created placeholder brand logos (AF and OT initials)
- Updated all sample data to reference new brand IDs

Successfully tested Figma MCP integration - configured authentication and extracted design tokens from the AF-SPOG-Design file.

Next: Build feature screens based on Figma designs.

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
