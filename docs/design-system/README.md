# Design System

Established visual patterns and design decisions for the gym franchise prototype. This document is the AI's reference for maintaining consistency across all features.

---

## Working with Figma

Each PM provides their own Figma file URLs when requesting features. There is no single master Figma file — different PMs may work from different design files.

### How Figma links are used

When a PM shares a Figma link:
1. The AI reads the design structure (layout, spacing, typography, colors)
2. Maps Figma components to existing prototype components
3. Applies brand-appropriate theme tokens (never hard-codes colors)
4. Creates the feature matching the Figma layout

### Referencing specific Figma frames

PMs should name the frame they want used: "Use the Table Container frame" or "Match the Navigation frame." This helps the AI target the right part of a complex design file.

---

## Established Core Patterns

These UI patterns have been established and should be used consistently across all features.

### Navigation (Left Sidebar)

**File:** `/src/components/AppLayout.tsx`

The left nav is 280px wide with two sections:

**Main section (no title):**
- Overview, Tasks (badge), Conversations (badge)
- Schedule, Customers (badge), Marketing, Resources, Reporting
- Items with submenus show a chevron arrow (ChevronRight icon)

**ADMIN section (with "ADMIN" header):**
- Location Management, Staff Management, Memberships & Packages, Catalog Administration

Sections are separated by a horizontal divider line.

**Nav item specs:** 44px height, 15px font, -0.234px letter spacing, 20px icons, rounded-lg corners.

### Logo Container

**File:** `/src/components/AppLayout.tsx`

Displays the full brand wordmark SVG (icon + text as one image) at 74px tall. The SVG files at `/public/brands/{brand}/` contain the complete wordmark. No separate text rendering.

### Table (FigmaDataTable)

**File:** `/src/features/_shared/components/FigmaDataTable.tsx`

The standard table component for all data-heavy views. Key styling:
- **Header:** Light gray background (`bg-muted/50`), uppercase text, 12px font, sort indicators
- **Rows:** 68px tall (fits avatars), subtle bottom border dividers
- **No outer border** — clean, borderless table (unlike the basic DataTable)

Use `FigmaDataTable` for new feature tables. The older `DataTable` in `@/components` has a different style.

### Cell Renderers

Reusable cell components in `/src/features/_shared/components/cell-renderers/`:

| Component | Use for | Example |
|---|---|---|
| `MemberCell` | Person with avatar, name, and ID | Member lists, staff lists |
| `MembershipBadge` | Colored tier/status pill | Elite, Basic, Premier, Wellness |
| `TrendCell` | Number with trend arrow | Weekly attendance, metrics |
| `AlertPill` | Colored status indicator | New Join (green), No HRM (red), Low Utilization (amber) |
| `SortableHeader` | Column header with sort icon | Any sortable table column |

---

## Brand Themes

Two brands are configured. All colors adapt automatically via CSS custom properties.

### Anytime Fitness
- Primary: Purple (#440099)
- Accent: Darker purple (#360073)
- Logo: `/public/brands/anytime-fitness/af-logo.svg`

### Orange Theory Fitness
- Primary: Orange (#F26922)
- Accent: Darker orange (#E65100)
- Logo: `/public/brands/orangetheory/otf-logo.svg`

### Theming rules
- Never hard-code colors — always use Tailwind theme classes (`bg-primary`, `text-muted-foreground`, `border-border`)
- Semantic data colors (green for success, red for danger, amber for warning) are fixed across brands — these are data visualization colors, not brand colors
- Always verify new screens look correct with both brands before committing

---

## Color Tokens

Use these Tailwind classes. They automatically adapt to the active brand.

| Token | Tailwind Class | Purpose |
|---|---|---|
| Primary | `bg-primary`, `text-primary` | Brand accent color (purple/orange) |
| Primary Foreground | `text-primary-foreground` | Text on primary background (white) |
| Muted | `bg-muted`, `text-muted-foreground` | Subdued backgrounds and secondary text |
| Border | `border-border` | Dividers, card edges, table rows |
| Background | `bg-background` | Page background (white) |
| Foreground | `text-foreground` | Primary text (near black) |
| Card | `bg-card` | Card and sidebar backgrounds |
| Destructive | `bg-destructive`, `text-destructive` | Error states, delete actions |
| Accent | `bg-accent` | Hover states, active indicators |
| Secondary | `bg-secondary` | Secondary button backgrounds |

### Fixed semantic colors (not brand-dependent)

| Color | Tailwind | Use for |
|---|---|---|
| Green | `text-green-700`, `bg-green-50` | Success, new joins, positive trends |
| Red | `text-red-700`, `bg-red-50` | Errors, alerts, negative trends |
| Amber | `text-amber-700`, `bg-amber-50` | Warnings, low utilization |
| Blue | `text-blue-700`, `bg-blue-50` | Info, milestones |
| Orange | `text-orange-700`, `bg-orange-50` | Anniversaries, special events |

---

## Layout Dimensions

From Figma specifications:

| Element | Dimension |
|---|---|
| Left sidebar width | 280px |
| Logo container height | 74px |
| Top header height | 80px |
| User profile section height | 93px |
| Nav item height | 44px |
| Table row height | 68px |
| Table header height | 44px |
| Border radius (default) | 0.5rem (8px) |
