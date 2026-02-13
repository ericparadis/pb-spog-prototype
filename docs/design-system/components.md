# Component Catalog

All reusable components available in the prototype. When building features, always use these before creating new components.

---

## Shared Components (`@/components`)

These are the core design system components. They are **locked** and cannot be modified.

### Layout

#### PageHeader
**Location:** `@/components/PageHeader.tsx`
**Use when:** Every feature page needs a title bar at the top.
```tsx
<PageHeader
  title="Feature Name"
  description="Brief description of this screen"
  actions={<Button>Primary Action</Button>}
/>
```

#### PageContent
**Location:** `@/components/PageContent.tsx`
**Use when:** Wrapping the main content of any feature page.
```tsx
<PageContent>
  {/* Feature content goes here */}
</PageContent>
```

#### AppLayout
**Location:** `@/components/AppLayout.tsx`
**Use when:** Already applied globally — do not import directly in features.

### Data Display

#### DataTable
**Location:** `@/components/DataTable.tsx`
**Use when:** Basic table with sorting. Has a rounded border container.
**Prefer:** `FigmaDataTable` for Figma-accurate styling (see Feature-Shared section below).
```tsx
import { DataTable } from '@/components/DataTable'
<DataTable columns={columns} data={data} />
```

#### StatCard
**Location:** `@/components/StatCard.tsx`
**Use when:** Displaying a metric with title, value, trend, and icon.
```tsx
<StatCard
  title="Total Members"
  value="1,234"
  description="+5% from last month"
  icon={Users}
  trend="up"
/>
```

### UI Primitives (shadcn/ui)

#### Button
**Location:** `@/components/ui/button.tsx`
**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes:** `default`, `sm`, `lg`, `icon`
```tsx
import { Button } from '@/components/ui/button'
<Button variant="outline" size="sm">Click me</Button>
```

#### Card
**Location:** `@/components/ui/card.tsx`
**Parts:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

#### Badge
**Location:** `@/components/ui/badge.tsx`
**Variants:** `default`, `secondary`, `destructive`, `outline`
```tsx
import { Badge } from '@/components/ui/badge'
<Badge variant="secondary">Active</Badge>
```

#### Avatar
**Location:** `@/components/ui/avatar.tsx`
**Parts:** `Avatar`, `AvatarImage`, `AvatarFallback`
```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
<Avatar>
  <AvatarImage src="/photo.jpg" alt="Name" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

#### Dialog
**Location:** `@/components/ui/dialog.tsx`
**Parts:** `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

#### Tabs
**Location:** `@/components/ui/tabs.tsx`
**Parts:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Other UI Primitives
- **Input** — `@/components/ui/input.tsx` — Text input field
- **Label** — `@/components/ui/label.tsx` — Form label
- **Select** — `@/components/ui/select.tsx` — Dropdown select
- **Separator** — `@/components/ui/separator.tsx` — Horizontal/vertical divider
- **DropdownMenu** — `@/components/ui/dropdown-menu.tsx` — Context menus and action menus

---

## Feature-Shared Components (`@/features/_shared`)

These are reusable components built in the open zone. They follow the Figma design patterns.

### FigmaDataTable
**Location:** `@/features/_shared/components/FigmaDataTable.tsx`
**Use when:** Building any data table that should match the Figma table style.
**Prefer over:** `@/components/DataTable` for new features.
```tsx
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'

const columns: ColumnDef<MyType>[] = [/* column definitions */]
<FigmaDataTable columns={columns} data={data} />
```

**Styling:** Gray header background, uppercase column labels, 68px row height, no outer border, sort support.

### Cell Renderers
**Location:** `@/features/_shared/components/cell-renderers/`
**Import:** `import { MemberCell, MembershipBadge, TrendCell, AlertPill, SortableHeader } from '@/features/_shared/components/cell-renderers'`

#### MemberCell
**Use when:** Displaying a person with photo, name, and ID.
```tsx
<MemberCell name="John Doe" memberId="M001" photoUrl="/photos/john.jpg" />
```

#### MembershipBadge
**Use when:** Showing membership tier as a colored pill.
**Tier styles:** Elite (dark), Basic (outlined), Premier/Premium (brand color), Wellness (accent)
```tsx
<MembershipBadge tier="Elite" />
```

#### TrendCell
**Use when:** Showing a number with a directional trend indicator.
```tsx
<TrendCell value={3} trend="up" />    // Green arrow up
<TrendCell value={1} trend="down" />  // Red arrow down
<TrendCell value={2} />               // No arrow
```

#### AlertPill
**Use when:** Showing a colored status label.
**Types:** `new-join` (green), `no-hrm` (red), `low-utilization` (amber), `milestone` (blue), `anniversary` (orange), `freeze` (sky)
```tsx
<AlertPill type="new-join" label="New Join" />
```

#### SortableHeader
**Use when:** Making a table column header sortable.
```tsx
// Inside a column definition:
header: ({ column }) => <SortableHeader column={column} label="Member" />
```

---

## Icons

All icons come from **Lucide React** (already installed). Browse available icons at https://lucide.dev.

```tsx
import { Users, Calendar, ChevronRight } from 'lucide-react'
<Users className="h-5 w-5" />
```

Standard sizes: `h-4 w-4` (small), `h-5 w-5` (default nav/UI), `h-6 w-6` (large).

---

## Charts

**Recharts** is available for data visualizations. Use it for dashboards and reporting screens.

```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
```
