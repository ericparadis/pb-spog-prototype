# Feature Spec: Core UI Elements

**Status:** Built
**Date:** 2026-02-13
**Requested by:** PM
**Route:** All screens (navigation/logo), `/customers` (table)

---

## Description

Defined the three foundational UI elements of the prototype to match the Figma design: the left navigation structure, the brand logo container, and the standard data table styling. These patterns are now the baseline for all future features.

## Figma Reference

https://www.figma.com/design/3I1BztZOaIxR6Jjhako2mS/AF-SPOG-Design?node-id=0-1

**Frames used:**
- "Navigation" frame — used for left sidebar nav structure and item grouping
- "Logo Container" frame — used for brand wordmark display at top of sidebar
- "Table Container" frame — used for data table styling, headers, and cell patterns

## Roles

Who can see this feature:

- [x] Franchise Owner
- [x] Regional Manager
- [x] Gym Manager
- [x] Front Desk Staff
- [x] Trainer

Navigation and logo are visible to all roles. The member table at `/customers` is visible to Franchise Owner, Regional Manager, Gym Manager, and Front Desk Staff.

## Data Used

- Members — displayed in the table with name, ID, join date, and attendance data
- Memberships — used to show membership tier badges (Elite, Basic, Premium, Wellness)

## Key Interactions

- Sort table by clicking any sortable column header (Member, Membership, Join Date, Classes, Last Visit)
- Visual trend indicators show weekly attendance direction (green up, red down)
- Colored alert pills highlight member statuses (New Join, No HRM, Low Utilization, etc.)

## Design Decisions

- Navigation restructured: Schedule, Customers, Marketing, Resources, Reporting moved to the main section (out of ADMIN) to match Figma hierarchy
- Items with expandable submenus show a chevron arrow (not yet functional — visual indicator only)
- Logo displays as full brand wordmark SVG (icon + text as one image) instead of separate icon and text
- Table uses `FigmaDataTable` component (bypasses the basic `DataTable`) for Figma-accurate styling
- Weekly attendance data and alerts are generated mock data since the shared data model doesn't include these fields
- Membership tier names are derived from the first word of the membership plan name (e.g., "Premium Zen" becomes "Premium")

## Related Screens

- Member Management (`/members`) — uses the same table component
- All screens share the updated navigation and logo

## Files Created/Modified

- `src/components/AppLayout.tsx` — Navigation restructured, logo container updated
- `src/features/_shared/components/FigmaDataTable.tsx` — New Figma-styled table component
- `src/features/_shared/components/cell-renderers/MemberCell.tsx` — Avatar + name + ID cell
- `src/features/_shared/components/cell-renderers/MembershipBadge.tsx` — Colored tier badge
- `src/features/_shared/components/cell-renderers/TrendCell.tsx` — Number with trend arrow
- `src/features/_shared/components/cell-renderers/AlertPill.tsx` — Colored status pill
- `src/features/_shared/components/cell-renderers/SortableHeader.tsx` — Sortable column header
- `src/features/member-management/index.tsx` — Updated to use FigmaDataTable
- `src/features/member-management/types.ts` — MemberTableRow type definition
- `src/features/member-management/data/member-table-data.ts` — Data transformation with mock enrichment
- `src/features/member-management/components/MemberTableColumns.tsx` — Column definitions
- `src/routes.ts` — Added `/customers` route

---

## Change History

| Date | Change | Requested by |
|---|---|---|
| 2026-02-13 | Initial build: navigation, logo, and table matched to Figma | PM |
