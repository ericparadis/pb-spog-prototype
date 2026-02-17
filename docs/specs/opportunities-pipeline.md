# Feature Spec: Opportunities Pipeline

---

**Status:** Built
**Date:** 2026-02-17
**Requested by:** PM
**Route:** /opportunities

---

## Description

A CRM-style kanban pipeline view showing the customer lifecycle from initial lead through patron to full member. Eight columns represent distinct stages, grouped into Leads (warm colors), Patrons (transitional), and Members (cool colors). The pipeline is read-only — customers move between stages automatically based on activity. Each card represents an Opportunity (a conversion/revenue event tied to a customer). Cards include a deal aging indicator that signals how likely an opportunity is to close-lost based on days in stage.

## Figma Reference

No Figma — built from PM description and CRM design conventions (Zoho/Pipedrive/HubSpot style).

## Roles

Who can see this feature:

- [x] Franchise Owner
- [x] Regional Manager
- [x] Gym Manager
- [ ] Front Desk Staff
- [ ] Trainer

## Data Used

- Leads (`leads.json`) — mapped to lead pipeline stages based on existing status
- Members (`members.json`) — mapped to patron/member stages based on membership type and status
- Memberships (`memberships.json`) — used to determine revenue values
- Tasks (`tasks.json`) — linked to opportunities via customer ID for task count and detail drawer
- Synthetic records — additional mock opportunities to populate sparse stages

## Key Interactions

- Horizontal scroll through 8 pipeline columns
- Click any opportunity card to open detail drawer with full info
- Detail drawer shows: opportunity info, related tasks, activity timeline, contact info
- Summary funnel stats update based on active brand/location filter
- Brand switcher filters all pipeline data
- Location selector further filters for gym-manager role

## Design Decisions

- **Data model**: Opportunity is a first-class entity (Customer > Opportunity > Tasks), not just a customer in a stage
- **Zoho-style cards**: Show opportunity name, customer name, owner, dollar value, and days-in-stage
- **Column headers**: Include aggregate dollar value and opportunity count (Zoho pattern)
- **Deal aging indicator**: Left border color changes from green (fresh) to amber (aging) to red (stale) based on days in stage
- **Stage-specific thresholds**: Lead stages age faster (15+ days = stale) vs patron stages (31+ days = stale)
- **At-risk count**: Column headers show warning icon when stale opportunities exist; summary stat shows total at-risk count
- **Warm/cool colors**: Amber/orange for lead stages, sky/indigo for patron/member stages
- **Visual divider**: Thin vertical line between lead group and patron/member group
- **No drag-and-drop**: Pipeline is read-only; stages reflect activity, not manual moves
- **Target icon**: Used for nav item (conveying pipeline/conversion target)

## Related Screens

- Customers (/customers) — shows member/lead tables
- Tasks (/tasks) — tasks linked to opportunities appear in detail drawer

## Files Created/Modified

- `src/features/opportunities/index.tsx` — Main pipeline page
- `src/features/opportunities/types.ts` — Pipeline types, stage config, aging utilities
- `src/features/opportunities/data/opportunities-data.ts` — Mock data mapping + summary calculation
- `src/features/opportunities/components/OpportunityCard.tsx` — Compact Zoho-style card with aging indicator
- `src/features/opportunities/components/PipelineColumn.tsx` — Stage column with header and card list
- `src/features/opportunities/components/PipelineSummary.tsx` — Funnel stat cards
- `src/features/opportunities/components/OpportunityDetailDrawer.tsx` — Slide-in detail panel
- `src/components/AppLayout.tsx` — Added nav item + route title
- `src/routes.ts` — Added /opportunities route

---

## Change History

| Date | Change | Requested by |
|---|---|---|
| 2026-02-17 | Initial build: 8-stage pipeline with aging indicators, summary stats, and detail drawer | PM |
