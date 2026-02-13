# Product Manager Guide

How to use Claude Code to build and iterate on the gym franchise prototype.

---

## Getting Started

This prototype is a working web application for gym franchise management. You interact with it by describing what you want in plain English — Claude Code reads your Figma designs, builds the screens, and saves everything automatically.

**What you need:**
- Access to Claude Code (browser or desktop)
- Your Figma design files
- A clear idea of what screen or feature you want to build

**What happens when you make a request:**
1. You describe what you want (with or without a Figma link)
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

Each time you request a feature, you can include a Figma link to guide the design. Here's how:

### How to copy a Figma link
1. Open your Figma file
2. Select the frame or component you want to reference
3. Right-click and choose **Copy link to selection** (or use the Share button)
4. Paste the link into your prompt

### What to include with your Figma link
- **Which frame or component** you're referencing (name it: "the Table Container", "the Navigation frame", etc.)
- **What screen or feature** it should be applied to
- **Which user roles** should see this screen

### Example prompt with Figma
```
Use this Figma https://www.figma.com/design/abc123/My-Design?node-id=42-100
to build the Staff Schedule view. Use the "Weekly Calendar" frame as the layout.
It should be visible to Gym Managers and Regional Managers.
```

### What the AI does with your Figma link
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

**To make changes to an approved feature:** Just ask — you'll be prompted to confirm that you want to unlock it.

**To go back to the approved version:** Say "Go back to the approved version of {feature name}."

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

### You can freely request:
- New feature screens and views
- Changes to how data is displayed (tables, cards, charts)
- Adding filters, sorting, search to existing screens
- Changing text, labels, and descriptions
- Adding or removing columns from tables
- New data visualizations using the existing chart library

### These need the dev team (just ask and it'll be flagged):
- Changes to the core navigation structure
- New color schemes or theme changes
- Different icon styles or a new icon library
- Changes to how the brand switcher or role switcher works
- Adding new data fields to the shared database models
- Installing new software libraries

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
