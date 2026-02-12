# Architecture Decision: Deployment Strategy

> **Status:** Decided
> **Date:** February 12, 2026
> **Decision:** Use SST v3 with StaticSite for deployment to AWS CloudFront + S3

---

## Context

We are building a frontend-only React prototype for a gym franchise SaaS platform. The prototype uses mock data (MSW + JSON fixtures) with no backend services. Product Managers iterate on the prototype using Claude Code, which auto-commits and pushes to `main`. We need a deployment strategy that automatically deploys on every push.

## Options Evaluated

### Option 1: Vercel

**What it is:** A managed hosting platform purpose-built for frontend apps. Connect a GitHub repo and it auto-deploys on every push with zero configuration.

**Pros:**
- Zero configuration — auto-detects Vite/React and sets build commands
- Fastest deploy times (~10-15 seconds to live)
- Built-in preview URLs per branch
- No AWS account or infrastructure knowledge needed
- Simple dashboard for non-technical users

**Cons:**
- External platform outside our AWS ecosystem
- May require procurement/security approval at the company
- Paid plan ($20/user/month) required for commercial use
- No path to backend infrastructure if the prototype evolves
- Another vendor relationship to manage

**Verdict:** Best developer experience, but adds an external dependency outside our existing AWS setup.

---

### Option 2: SST v3 with StaticSite ✅ (Selected)

**What it is:** SST's `StaticSite` construct deploys a Vite/React app to S3 + CloudFront with a single configuration block. SST v3 uses Pulumi under the hood and manages all AWS resources declaratively.

**Pros:**
- Stays within our existing AWS account and SST tooling
- Simple configuration (~10 lines in `sst.config.ts`)
- Handles S3 bucket creation, CloudFront distribution, origin access, cache invalidation, and SPA routing automatically
- Future-proof — if the prototype needs a real API, auth, or database, we add more constructs to the same config
- Team already has SST v3 experience
- Auto-deploy via GitHub Actions with `npx sst deploy --stage production`
- No new vendor, no new billing relationship

**Cons:**
- Slightly slower deploys than Vercel (~1-2 minutes including CloudFront cache invalidation)
- Requires AWS credentials in GitHub Secrets
- Initial SST bootstrap deploy must be run manually once from the CLI
- More infrastructure knowledge than Vercel (though minimal with SST abstracting it)

**Verdict:** Right fit for our team. Leverages existing AWS and SST expertise with minimal overhead.

---

### Option 3: AWS CloudFront + S3 (Direct / Manual)

**What it is:** Manually configure an S3 bucket and CloudFront distribution — either through the AWS Console, AWS CLI, or a custom deploy script.

**Pros:**
- No framework dependency
- Full control over every setting

**Cons:**
- Requires manually creating and configuring: S3 bucket + policy, CloudFront distribution, Origin Access Control, cache behaviors, error pages for SPA routing
- Need a separate deploy script for S3 sync and cache invalidation
- No declarative infrastructure-as-code unless you also add Terraform or CloudFormation
- Significantly more work for the same result SST provides in 10 lines
- Harder to reproduce, tear down, or replicate across environments
- No upgrade path — adding backend services later means starting from scratch with a different tool

**Verdict:** Rejected. All overhead, no benefit over SST for this use case.

---

### Option 4: AWS CloudFormation

**What it is:** Write a CloudFormation YAML template that defines the S3 bucket, CloudFront distribution, and supporting resources.

**Pros:**
- Native AWS infrastructure-as-code
- No third-party framework dependency
- Full control over resource configuration

**Cons:**
- 150-200+ lines of YAML for what SST does in 10 lines of TypeScript
- Still requires a separate deploy script for file sync and cache invalidation (CloudFormation only manages infrastructure, not application deployment)
- Verbose, error-prone, and harder to iterate on
- No dev mode or local development story
- SST v3 generates Pulumi/Terraform under the hood — writing CloudFormation manually is going one level lower for no benefit
- Adding backend services later means writing significantly more CloudFormation

**Verdict:** Rejected. This is what SST abstracts away. Writing it by hand adds complexity with no upside for a prototype.

---

## Decision

**Use SST v3 with `StaticSite`** because:

1. **We already know it.** The team uses SST v3 on other projects. No learning curve.
2. **It stays in AWS.** No new vendor, no procurement, no external dependencies.
3. **Minimal config.** The entire deployment infrastructure is ~10 lines in `sst.config.ts`.
4. **Future-proof.** If the prototype graduates to a real app with APIs and auth, we extend the same SST config rather than migrating platforms.
5. **Auto-deploy works.** GitHub Actions runs `npx sst deploy --stage production` on every push to `main`. PMs never see infrastructure.

## Implementation

### Files

- `sst.config.ts` — StaticSite construct pointing at the Vite build output
- `.github/workflows/deploy.yml` — GitHub Actions workflow triggered on push to `main`

### GitHub Secrets Required

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key with deploy permissions |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |

### First Deploy

Run once manually to bootstrap SST state and create the CloudFront distribution:

```bash
npx sst deploy --stage production
```

SST outputs the CloudFront URL. This becomes the prototype's permanent URL.

### Subsequent Deploys

Fully automated. Claude Code pushes to `main` → GitHub Actions triggers → SST deploys to the existing CloudFront distribution → site updates in ~1-2 minutes.

### Deploy Concurrency

The GitHub Actions workflow uses `concurrency: cancel-in-progress: true` so rapid pushes from Claude Code don't cause overlapping SST deploys.

---

## When to Revisit

- If deploy speed becomes a blocker for PM iteration (consider Vercel or CloudFront Functions)
- If the prototype needs server-side rendering (swap `StaticSite` for SST's `Nextjs` or `React` construct)
- If the prototype graduates to production (add API, auth, and database constructs to the same `sst.config.ts`)
