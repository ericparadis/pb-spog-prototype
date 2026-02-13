# Product Manager Guide

How to use Claude Code to build and iterate on the gym franchise prototype.

---

## Getting Started

This prototype is a working web application for gym franchise management. You interact with it by describing what you want in plain English — Claude Code reads your Figma designs, builds the screens, and saves everything automatically.

**What you need:**
- Claude Code (Desktop app or CLI)
- Your Figma design files (screenshots or links)
- Access to this project's GitHub repository
- A clear idea of what screen or feature you want to build

**What happens when you make a request:**
1. You describe what you want (with a Figma screenshot, link, or description)
2. Claude builds it using the existing design system and components
3. Claude saves a checkpoint and tells you what route to visit
4. You review and request changes, or approve

---

## Prompt Templates

Copy and fill in the blanks. These are the most effective ways to ask for things.

### Build a new feature (with Figma)
```
Use this Figma {paste your Figma link} to build the {feature name} screen.
It should be visible to {role, e.g. "Gym Managers"}.
```

### Build a new feature (without Figma)
```
Build a {feature name} screen that shows {what it displays}.
It should be visible to {role}.
Use {data type, e.g. "member data" or "class schedule data"}.
```

### Make a change
```
On the {screen name} page, change {what you see now} to {what you want instead}.
```

### Check a specific role's view
```
Show me what {feature} looks like for a {role, e.g. "Front Desk Staff"} user.
```

### Undo the last change
```
Undo the last change.
```

### Go back to an approved version
```
Go back to the approved version of {feature name}.
```

### Start fresh on a feature
```
Start over on {feature name}.
```

### Approve a feature
```
The {feature name} screen is approved.
```

### See recent changes
```
Show me what's changed this week.
```

### Flag something for the dev team
```
I need {description of change} — can you flag it for the dev team?
```

---

## Working with Figma

Each time you request a feature, you can share a Figma design to guide the implementation. There are two ways:

### Option 1: Paste a Figma link
If you have Figma MCP configured locally, paste the link directly and the AI will read the design:
```
Use this Figma https://www.figma.com/design/abc123/My-Design?node-id=42-100
to build the Staff Schedule view. Use the "Weekly Calendar" frame as the layout.
It should be visible to Gym Managers and Regional Managers.
```

### Option 2: Share a screenshot (always works)
Take a screenshot of the Figma frame and paste it into the chat. The AI can read images and extract layout details, spacing, columns, and styling.

### What to include with your Figma reference
- **Which frame or component** you're referencing (name it: "the Table Container", "the Navigation frame", etc.)
- **What screen or feature** it should be applied to
- **Which user roles** should see this screen

### What the AI does with your design
- Reads the design structure (layout, spacing, colors)
- Matches Figma components to existing prototype components
- Applies brand-appropriate colors (never hard-codes them)
- Tells you what it built and what assumptions it made

---

## Approving & Locking Features

When you're satisfied with a feature, you can "approve" it. This creates a saved checkpoint that protects it from accidental changes.

**To approve:** Say "The {feature name} screen is approved."

**What happens:**
- A checkpoint is created that you can always go back to
- The feature is marked as protected
- You'll be asked to confirm before any future changes to that feature

**To make changes to an approved feature:** Just ask — you'll be prompted to confirm that you want to unlock it. Make as many changes as you need, then say "approved" again to re-lock it with a new checkpoint.

**To go back to the approved version:** Say "Go back to the approved version of {feature name}."

---

## How File Protection Works

Some areas of the prototype may be protected to keep things stable. At launch, **nothing is locked** — you have full freedom to build and change anything.

Over time, protection gets added in two ways:
1. **You approve a feature** — it gets locked so no one accidentally changes your finalized work
2. **The dev team locks shared infrastructure** — things like the core components and theme system get protected once they're stable

### If you hit a protected file

The AI will tell you and offer to temporarily unlock it:

*"That file is in a protected area. I can unlock it, make the change, and re-lock it automatically. Should I go ahead?"*

Just say yes if you want the change, or no to try a different approach.

### Everything is tracked

Every unlock is logged — who did it, when, and why. This keeps everyone on the same page across sessions.

---

## Tips for Better Results

1. **Be specific about which screen** — "On the Member Management page" is better than "on the page"
2. **Name the role** — "Visible to Gym Managers" helps the AI set up the right permissions
3. **Reference Figma frames by name** — "Use the Table Container frame" is clearer than "make it look like the table"
4. **One thing at a time** — Smaller requests get better results than "build everything at once"
5. **Review after each change** — Check the route the AI tells you to visit before asking for the next thing
6. **Use brand switching** — After a change, switch brands to make sure it looks right for both

---

## What You Can Change vs. What Needs the Dev Team

At launch, you can change anything! As the project matures and some areas get locked, here's the general guide:

### You can always freely request:
- New feature screens and views
- Changes to how data is displayed (tables, cards, charts)
- Adding filters, sorting, search to existing screens
- Changing text, labels, and descriptions
- Adding or removing columns from tables
- New data visualizations using the existing chart library
- Changes to the navigation structure, layout, or branding

### These always need the dev team:
- Installing new software libraries or packages
- Changes to the build system or deployment configuration

### These may need confirmation once locked:
- Changes to shared components (buttons, cards, tables)
- Theme and color system changes
- Shared data model changes
- Navigation and brand switcher changes

When something needs the dev team, just say: "I need {change} — can you flag it for the dev team?" It will be logged for them.

---

## Available User Roles

When you specify who should see a feature, use these roles:

| Role | What they see |
|---|---|
| Franchise Owner | All locations, high-level analytics, full admin access |
| Regional Manager | Subset of locations, operational metrics |
| Gym Manager | Single location, full operational control |
| Front Desk Staff | Check-in, basic member lookup, class rosters |
| Trainer | Own schedule, assigned members, class management |

---

## Available Data

The prototype has sample data for these entities:

| Data | What's in it |
|---|---|
| Members | Names, contact info, membership type, join dates |
| Memberships | Plan types (Basic, Premium, Elite, Wellness) with pricing |
| Classes | Scheduled classes with times, instructors, capacity |
| Trainers | Trainer profiles, certifications, schedules |
| Locations | Gym locations with addresses and brand associations |
| Equipment | Equipment inventory per location |
| Transactions | Payment and billing records |

All data is filtered by the active brand — you'll only see data for the brand currently selected.

---

## Troubleshooting

**"I don't see my feature"**
- Check that you're on the right route (the AI will tell you the URL)
- Check that you're using the right role — some features are only visible to certain roles
- Try switching brands — the feature might be built but filtered to a different brand

**"Something looks broken"**
- Say "Undo the last change" to go back to the previous state
- If it's still broken, say "Show me what's changed recently" to understand what happened

**"I want to go back to how it was"**
- "Undo the last change" — reverses the most recent change
- "Go back to the approved version of {feature}" — restores to the last approved checkpoint
- "Start over on {feature}" — clears everything and starts fresh

**"The colors look wrong"**
- Try switching brands using the brand selector — the prototype uses brand-specific colors
- If colors are hard-coded instead of adapting to the brand, say "The colors on {screen} aren't adapting to the brand theme"
