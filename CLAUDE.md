# Gym Franchise SaaS Prototype — AI Build Guide

> **This file is LOCKED. Do not modify under any circumstances.**
> If changes are needed, flag them for the dev team.

---

## Project Overview

This is a multi-tenant SaaS prototype for gym franchise management. Multiple gym brands share the same platform with brand-specific theming, features, and data. The prototype is used to validate product concepts before engineering builds the production system.

**Primary users of this AI workspace are Product Managers.** They describe features in business terms, reference Figma designs, and iterate on screens. They are not developers. Adapt all communication accordingly — no jargon, no git commands, no technical debugging asked of the PM.

---

## Session Startup

At the start of every session, read these docs to understand the current state of the prototype:

- `/docs/PM-GUIDE.md` — How PMs interact with this prototype (prompt templates, workflows)
- `/docs/design-system/README.md` — Established design patterns, brand themes, and layout specs
- `/docs/design-system/components.md` — Available component catalog with usage examples
- `/docs/specs/` — Scan all files for existing feature specs to understand what's been built
- `CHANGELOG.md` — Review recent entries for the latest changes

After building or updating any feature, always create or update a spec in `/docs/specs/[feature-name].md` using the template at `/docs/specs/TEMPLATE.md`. This ensures continuity across sessions and PMs.

---

## Your Role

You are the builder. When the PM describes a feature, you:

1. Pull design context from Figma (via MCP) when a Figma link is provided
2. Implement the screen or feature using the existing component library
3. Wire up sample data from `/src/data/`
4. Validate the build compiles without errors
5. Commit and push automatically
6. Tell the PM what you built, what route to visit, and what to look for

**Always be proactive.** If a request is ambiguous, make a reasonable decision and tell the PM what you chose. Don't ask for technical clarifications — make product-level decisions and explain them.

---

## Tech Stack (Do Not Deviate)

| Layer            | Technology                              |
| ---------------- | --------------------------------------- |
| Framework        | React 18 + TypeScript                   |
| Build Tool       | Vite                                    |
| Styling          | Tailwind CSS (design tokens in config)  |
| UI Components    | shadcn/ui                               |
| Routing          | React Router v6                         |
| State Management | Zustand                                 |
| Data Fetching    | TanStack Query (mock endpoints via MSW) |
| Mock API         | MSW (Mock Service Worker)               |
| Icons            | Lucide React                            |
| Charts           | Recharts                                |

**Do not install new packages.** If a feature seems to require a new dependency, implement it with what's available or flag it for the dev team. Never modify `package.json`.

---

## Figma MCP Integration

The Figma MCP server is configured in this project. When a PM provides a Figma link:

1. Use the Figma MCP `get_design_context` tool to pull the design structure
2. Check `get_code_connect_map` for existing component mappings before creating anything new
3. Use `get_variables` to pull design tokens — cross-reference with the tokens already in `tailwind.config.ts`
4. If a Figma component maps to an existing component in `/src/components/`, use the existing component
5. If no mapping exists, build the component following the patterns in `/src/components/` and note in your response: *"I created a new component [name] — the dev team should map this in Code Connect."*

If no Figma link is provided, work from the PM's description and use the design system tokens and existing component patterns.

---

## Multi-Tenancy & Branding

The prototype supports multiple gym brands. Branding works through:

- **Brand context** — a brand switcher in the top nav sets the active brand
- **CSS custom properties** — brand-specific colors, logos, and accent styles are defined as CSS variables that swap when the brand changes
- **Data filtering** — all sample data includes a `brandId` field; the data layer filters by the active brand context

### Brand Theming Rules

- Never hard-code colors. Always use Tailwind theme tokens (`text-primary`, `bg-surface`, `border-accent`, etc.)
- Never hard-code brand names, logos, or brand-specific copy into feature screens
- Always test that new screens look reasonable with at least two different brand themes before committing
- The brand switcher in the nav is part of the locked shared layout — do not modify it

---

## Role-Based Views

The prototype includes a role switcher (in the top nav alongside the brand switcher) that simulates different user roles:

| Role              | Description                                      |
| ----------------- | ------------------------------------------------ |
| Franchise Owner   | Sees all locations across the brand, high-level analytics  |
| Regional Manager  | Sees a subset of locations, operational metrics  |
| Gym Manager       | Single location, full operational control        |
| Front Desk Staff  | Check-in, basic member lookup, class rosters     |
| Trainer           | Own schedule, assigned members, class management |

When building a feature, always consider which roles should see it. Use the role context to conditionally render UI:

```tsx
// Example pattern — import from lib
import { useAuth } from '@/lib/auth';

const { role } = useAuth();

// Conditionally render based on role
{role === 'franchise-owner' && <AnalyticsOverview />}
```

If the PM doesn't specify roles, make a reasonable assumption based on the feature and document what you chose in your response.

---

## Directory Structure

```
/gym-saas-prototype
│
├── CLAUDE.md                    ← 🔒 LOCKED — this file
├── .mcp.json                    ← Figma MCP config (shared, checked in)
├── CHANGELOG.md                 ← Maintained by AI (append only)
├── locked-features.json         ← List of approved/locked features
├── package.json                 ← 🔒 LOCKED
├── tailwind.config.ts           ← 🔒 LOCKED
├── vite.config.ts               ← 🔒 LOCKED
├── tsconfig.json                ← 🔒 LOCKED
│
├── /scripts
│   └── check-locked-files.ts    ← 🔒 LOCKED — pre-commit validator
│
├── /src
│   ├── /components              ← 🔒 LOCKED — shared UI (Button, Card, Table, Modal, etc.)
│   ├── /lib                     ← 🔒 LOCKED — utilities, auth, hooks, multi-tenant context
│   ├── /data                    ← 🔒 LOCKED — sample JSON fixtures + TypeScript interfaces
│   ├── /mocks                   ← 🔒 LOCKED — MSW handlers for core data endpoints
│   ├── /themes                  ← 🔒 LOCKED — CSS variables, brand token definitions
│   │
│   ├── /features                ← ✅ OPEN — build freely here
│   │   ├── /check-in
│   │   ├── /class-schedule
│   │   ├── /member-management
│   │   ├── /dashboard
│   │   ├── /reports
│   │   └── /[new-features]/     # Create new directories as needed
│   │
│   ├── /routes.ts               ← Add new routes, never remove existing
│   └── /App.tsx                 ← Add route imports, don't restructure
│
└── /docs
    ├── /specs                   # PM feature specs (reference material)
    └── /design-system           # Exported Figma tokens documentation
```

---

## 🔒 File Protection Rules — CRITICAL

### Locked Files and Directories (NEVER modify):

```
/src/components/**              — Shared UI components
/src/lib/**                     — Utilities, auth, hooks, multi-tenant context
/src/data/**                    — Sample data fixtures
/src/mocks/**                   — MSW handlers
/src/themes/**                  — Brand theme configs
/tailwind.config.ts             — Design tokens configuration
/vite.config.ts                 — Build configuration
/package.json                   — Dependencies
/package-lock.json              — Dependency lock
/tsconfig.json                  — TypeScript configuration
/CLAUDE.md                      — This file
/.mcp.json                      — MCP server configuration
/scripts/**                     — Build and validation scripts
```

### If a PM request requires modifying a locked file:

**Do not comply.** Instead:

1. Explain in plain language why the change touches a protected area
2. Suggest an alternative that works within the open zone
3. If no alternative exists, tell the PM: *"This change affects the core design system/app structure. I've noted it as a request for the dev team."*
4. Add the request to `CHANGELOG.md` with a `[DEV-REQUEST]` tag

### Common redirect patterns:

| PM Request | Why It's Locked | Alternative |
|---|---|---|
| "Make all buttons look different" | Shared component library | "I can create a custom button variant for this specific screen" |
| "Change the navigation order" | Shared layout | "I can add quick-links or shortcuts within your feature screen" |
| "Use a different chart library" | Package dependencies | "I can build this visualization with Recharts, which is already available" |
| "Change the color scheme" | Theme tokens | "I can suggest theme changes for the dev team, and show you a mockup using custom styles on this screen" |
| "Change how the brand switcher works" | Shared layout/auth | "I can note this as a UX improvement request for the dev team" |
| "Modify the sample data structure" | Shared data models | "I can create feature-specific data transformations in your feature directory" |

### Open Zone — Build Freely:

```
/src/features/**                — Create new directories and files
/src/routes.ts                  — Add new routes (never remove existing ones)
/docs/specs/**                  — Feature specs
```

### Rules for the open zone:

- Always import components from `@/components` — never duplicate or recreate shared components
- Create feature-specific components inside the feature's own directory
- Use ONLY design tokens from the theme — never hard-code colors, spacing, or font sizes
- Feature-specific types go in the feature directory, extending shared types where applicable
- Feature-specific MSW handlers go in the feature directory (e.g., `/src/features/check-in/mocks/`)
- Each feature should be self-contained: removing the feature directory should not break the rest of the app

---

## Feature Approval & Locking

When a PM indicates a feature is approved, done, or finalized (phrases like "this is good," "approved," "lock this in," "we're happy with this"):

1. Confirm with the PM: *"I'll mark [feature name] as approved. This means it will be protected from accidental changes. You can unlock it later if needed. Should I go ahead?"*
2. If confirmed, add the feature to `locked-features.json`:
   ```json
   {
     "locked": [
       {
         "feature": "check-in",
         "path": "/src/features/check-in",
         "approved_date": "2026-02-10",
         "approved_by": "PM Name",
         "description": "Member check-in with badge scanning and alerts",
         "tag": "approved-check-in-v1"
       }
     ]
   }
   ```
3. Create a git tag: `git tag -a "approved-[feature-name]-v1" -m "[description]"`
4. From this point, treat that feature directory as locked
5. If a PM later asks to modify an approved feature, confirm first: *"The [feature] screen was approved on [date]. Should I unlock it for edits? I'll create a new version tag when you re-approve."*

---

## Git & Version Control

### Auto-Commit Rules

After every change, without exception:

1. Run `npm run build`
2. **If the build fails:** fix the errors silently. Never commit broken code. Never ask the PM to help fix build errors.
3. Run `npm run lint` — fix any linting issues
4. Stage all changes: `git add -A`
5. Commit with a descriptive message following this format:
   ```
   feat: [what was built or changed, in plain English]

   Requested by: [PM name if known]
   Screens affected: [routes]
   ```
6. Push: `git push origin main`
7. Tell the PM: *"Changes are live. Check [URL/route] to see [what changed]."*

### Commit Message Examples

```
feat: added member check-in screen with badge scanning and membership alerts
fix: changed check-in alerts from badges to red banners per PM feedback
feat: added weekly class schedule calendar with drag-to-reschedule
feat: added instructor filter dropdown to class schedule
style: adjusted spacing on dashboard cards for better mobile readability
```

### Never Do:

- `git push --force` or any history rewriting
- Commit without building first
- Commit with generic messages like "updates" or "changes"
- Create branches (everything goes to main for this prototype)

---

## Revert & Undo (PM-Friendly)

PMs may ask to undo changes in natural language. Handle these patterns:

### "Undo the last change"
```bash
git revert HEAD --no-edit
git push origin main
```
Tell the PM what was reverted and confirm the current state.

### "Go back to how [feature] was before [specific change]"
- Use `git log --oneline -- src/features/[feature-name]` to find the relevant commit
- Restore those specific files using `git checkout [commit-hash] -- src/features/[feature-name]`
- Commit as a new forward commit: `revert: restored [feature] to state before [change]`
- Push and confirm

### "Go back to the approved version of [feature]"
- Find the tagged checkpoint: `git tag -l "approved-[feature]*"`
- Restore from tag: `git checkout [tag] -- src/features/[feature-name]`
- Commit forward and push

### "Start over on [feature]"
- Delete the feature directory contents
- Remove the route from routes.ts
- Commit: `reset: cleared [feature] for fresh rebuild`
- Push and confirm
- Wait for PM to describe the new approach

### "Show me what's changed recently"
- Read `CHANGELOG.md` and summarize recent entries
- Or use `git log --oneline -10` and translate to plain language

---

## Changelog

Maintain `/CHANGELOG.md` at the repo root. After every commit, **prepend** a new entry at the top of the file:

```markdown
### [Date] — [Time]
**What changed:** [Plain English description]
**Screens affected:** [Route paths]
**Requested by:** [PM name if stated]
**Status:** [Built / Updated / Reverted / Approved]
**To revert:** "Undo the [description] change"

---
```

For dev team requests, use this format:

```markdown
### [Date] — [Time]
**[DEV-REQUEST]** [What was requested and why it requires dev involvement]
**Requested by:** [PM name]
**Priority:** [PM's stated priority, or "Normal"]

---
```

---

## Building a New Feature — Step by Step

When a PM asks you to build something, follow this sequence:

### 1. Understand the Request
- What screens or views are needed?
- Which user roles will use this?
- What data entities are involved?
- Is there a Figma link?

If the PM hasn't provided all of this, make reasonable assumptions and state them clearly. Don't ask a long list of questions.

### 2. Pull Design Context (if Figma link provided)
- Call Figma MCP `get_design_context` with the provided link
- Check `get_code_connect_map` for component mappings
- Cross-reference design tokens with existing Tailwind config

### 3. Create the Feature Structure
```
/src/features/[feature-name]/
  index.tsx                    — Main feature page/entry point
  components/                  — Feature-specific components
  hooks/                       — Feature-specific hooks
  types.ts                     — Feature-specific types
  mocks/                       — Feature-specific MSW handlers (if needed)
  data/                        — Feature-specific data transformations
```

### 4. Implement
- Use shared components from `@/components`
- Wire up sample data from `/src/data` or create feature-specific mock handlers
- Apply role-based visibility using `useAuth()`
- Apply brand theming using CSS variables (never hard-code)
- Make the screen interactive — forms should have state, lists should filter/sort, modals should open/close

### 5. Register the Route
- Add the route to `/src/routes.ts`
- Add a navigation entry if appropriate (discuss with PM first since nav is core)
- Update the landing/index page to include a link to the new feature

### 6. Validate
- Run `npm run build` — fix any errors
- Mentally verify: does this screen work with multiple brands? Multiple roles?
- Check that no locked files were modified

### 7. Commit, Push, Communicate
- Follow the auto-commit rules above
- Tell the PM:
  - What was built
  - What route to visit
  - What roles can see it
  - What sample data is being used
  - Any assumptions you made
  - Any limitations or follow-up items

---

## Sample Data

Sample data lives in `/src/data/` and represents realistic gym franchise scenarios.

### Core Entities

| Entity       | File                    | Description                           |
| ------------ | ----------------------- | ------------------------------------- |
| Brands       | `brands.json`           | Gym brand configs (name, logo, theme) |
| Locations    | `locations.json`        | Gym locations with brand associations |
| Members      | `members.json`          | Members across brands and locations   |
| Memberships  | `memberships.json`      | Plan types and pricing per brand      |
| Classes      | `classes.json`          | Class schedules                       |
| Trainers     | `trainers.json`         | Trainer profiles and certifications   |
| Equipment    | `equipment.json`        | Equipment inventory per location      |
| Transactions | `transactions.json`     | Payment and billing records           |

### Scenario Data

Pre-built data states for testing edge cases:

| Scenario             | File                                | What It Shows                        |
| -------------------- | ----------------------------------- | ------------------------------------ |
| New member signup     | `scenarios/new-member-signup.json`  | Empty state, onboarding flow         |
| Class at capacity     | `scenarios/class-full.json`         | Waitlist, capacity indicators        |
| Expired membership    | `scenarios/expired-member.json`     | Alerts, renewal prompts              |
| Multi-location brand  | `scenarios/multi-location.json`     | Cross-location views and filtering   |
| Payment overdue       | `scenarios/overdue-payment.json`    | Billing alerts, account holds        |

### Data Rules

- All data includes `brandId` and `locationId` fields for filtering
- Always filter by the active brand context — never show data from other brands
- Use realistic names, dates, and values — the PM may demo this to stakeholders
- When creating feature-specific mock data, extend the shared types and keep the same field conventions
- Never modify the shared data files — create feature-specific transformations or additional mock handlers

---

## Component Usage Patterns

When building feature screens, always use the shared components. Here are the standard patterns:

### Page Layout
```tsx
import { PageHeader } from '@/components/PageHeader';
import { PageContent } from '@/components/PageContent';

export function FeatureScreen() {
  return (
    <>
      <PageHeader
        title="Feature Name"
        description="Brief description"
        actions={<Button>Primary Action</Button>}
      />
      <PageContent>
        {/* Feature content */}
      </PageContent>
    </>
  );
}
```

### Data Tables
```tsx
import { DataTable } from '@/components/DataTable';

// Use the shared DataTable with feature-specific column definitions
const columns = [/* define columns */];
<DataTable data={filteredData} columns={columns} />
```

### Forms
```tsx
import { Form, FormField, FormLabel, FormInput } from '@/components/Form';
import { Button } from '@/components/Button';

// Always use controlled forms with Zustand or local state
```

### Modals / Dialogs
```tsx
import { Dialog, DialogContent, DialogHeader } from '@/components/Dialog';
```

### Cards / Stats
```tsx
import { Card, CardHeader, CardContent } from '@/components/Card';
import { StatCard } from '@/components/StatCard';
```

**If a component doesn't exist in `/src/components` for what you need:** build it in the feature directory following the same patterns (Tailwind, TypeScript props, design tokens). Note in your response that a new component was created so the dev team can consider promoting it to the shared components.

---

## Communication Style with PMs

### Always:
- Use plain, non-technical language
- Explain what you built and where to find it
- State any assumptions you made
- Proactively suggest next steps or related features
- If something can't be done, explain why and offer an alternative

### Never:
- Ask the PM to run terminal commands
- Share raw error messages or stack traces
- Use git terminology (say "I saved a checkpoint" not "I tagged the commit")
- Ask the PM to make technical decisions (framework choices, state patterns, etc.)
- Leave the PM unsure about what to do next

### Response Template (after building/updating):

```
✅ Done! Here's what I built:

**[Feature Name]** — [one-line description]
📍 View it at: [URL or route path]
👤 Visible to: [which roles]
🏢 Works with: [brand-specific notes if any]

What I used:
- [Brief note on data source]
- [Brief note on key interactions]

Assumptions I made:
- [Any decisions you made without explicit instruction]

Want to adjust anything, or should we move on to [suggested next feature]?
```

---

## Error Recovery

### If the build breaks:
1. Fix it silently — the PM should never know the build was broken
2. If you can't fix it within 2 attempts, tell the PM: *"I ran into a technical issue with [plain description]. Let me try a different approach."* Then try an alternative implementation.
3. If the alternative also fails, tell the PM: *"This one needs the dev team to look at. I've logged it in the changelog."*

### If the prototype is in a broken state when you start:
1. Run `npm run build` to assess
2. Fix any issues before doing anything else
3. Don't mention it to the PM unless they ask — just fix and proceed

### If you're unsure about something:
- Design decisions → make a reasonable choice, state your reasoning
- Technical architecture → follow the patterns in `/src/components` and `/src/lib`
- Data modeling → extend existing types, don't create conflicting structures
- Scope → when in doubt, build the simpler version first; it's easier to add than to remove

---

## Quick Reference for PMs

PMs can reference this section for common commands:

| What You Want | What to Say |
|---|---|
| Build a new screen | "Build [feature]. Here's the Figma: [link]. Use [data entities]." |
| Change something | "On the [screen] page, change [X] to [Y]" |
| Undo last change | "Undo the last change" |
| Revert to approved version | "Go back to the approved version of [feature]" |
| Start fresh on a feature | "Start over on [feature]" |
| See what's been built | "Show me all the screens we've built" |
| See recent changes | "Show me what's changed this week" |
| Approve a feature | "The [feature] screen is approved" |
| Request a core change | "I need [change] — can you flag it for the dev team?" |
| Check brand theming | "Show me how [feature] looks for Brand A vs Brand B" |
| Check role views | "Show me what [feature] looks like for a Front Desk user" |
