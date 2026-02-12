# AWS Deployment Setup Guide

This guide walks through setting up AWS credentials for automatic deployment of the gym franchise prototype.

## Prerequisites

- AWS Account with admin access (or permissions to create IAM users)
- GitHub repository with admin access
- The prototype project cloned locally

## Step 1: Create IAM User for Deployment

1. Log into [AWS Console](https://console.aws.amazon.com)
2. Navigate to **IAM** → **Users** → **Create User**
3. User name: `gym-prototype-deployer`
4. Select **Provide user access to the AWS Management Console** - Optional
5. Click **Next**

## Step 2: Attach Permissions

The deployment user needs permissions to manage:
- **S3** - Store static assets
- **CloudFront** - CDN distribution
- **CloudFormation** - Infrastructure management
- **IAM** - Create service roles for SST

### Option A: Use Managed Policies (Quick Setup)

Attach these AWS managed policies:
- `AmazonS3FullAccess`
- `CloudFrontFullAccess`
- `AWSCloudFormationFullAccess`
- `IAMFullAccess`

**Note:** These are broad permissions. For production use, create a custom policy with least-privilege access.

### Option B: Custom Policy (Recommended for Production)

Create a custom policy with specific resource restrictions. Example policy available in SST documentation.

## Step 3: Create Access Keys

1. After creating the user, go to **Security credentials** tab
2. Scroll to **Access keys** section
3. Click **Create access key**
4. Select **Application running outside AWS**
5. Click **Next** → **Create access key**
6. **Important:** Save both:
   - Access Key ID
   - Secret Access Key

   ⚠️ You won't be able to see the secret key again!

## Step 4: Add Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add two secrets:

   **Secret 1:**
   - Name: `AWS_ACCESS_KEY_ID`
   - Value: Your access key ID from Step 3

   **Secret 2:**
   - Name: `AWS_SECRET_ACCESS_KEY`
   - Value: Your secret access key from Step 3

## Step 5: Initial Manual Deployment

Before GitHub Actions can auto-deploy, you must run the **initial deployment manually** to bootstrap SST infrastructure.

### On your local machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Set AWS credentials** (temporary, for this terminal session):
   ```bash
   export AWS_ACCESS_KEY_ID=your-access-key-id
   export AWS_SECRET_ACCESS_KEY=your-secret-access-key
   export AWS_REGION=us-east-1
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

   This will:
   - Create S3 bucket for the application
   - Create CloudFront distribution
   - Upload built assets to S3
   - Configure cache invalidation
   - Output the CloudFront URL

5. **Save the CloudFront URL** displayed in the output - this is your permanent prototype URL!

   Example output:
   ```
   ✔ Complete
      GymPrototypeSite: https://d111111abcdef8.cloudfront.net
   ```

## Step 6: Verify Auto-Deployment

Test that automatic deployment works:

1. Make a small change to the code (e.g., update a dashboard stat)
2. Commit and push to `main`:
   ```bash
   git add .
   git commit -m "test: verify auto-deployment"
   git push origin main
   ```

3. Go to GitHub → **Actions** tab
4. Watch the "Deploy to AWS" workflow run
5. After completion (~1-2 minutes), visit your CloudFront URL
6. Verify changes appear (may take up to 2 minutes for CloudFront cache invalidation)

## Troubleshooting

### "No default VPC found"

Some AWS accounts don't have a default VPC. Create one:
1. Go to VPC Console
2. **Your VPCs** → **Actions** → **Create default VPC**

### "Access Denied" errors

Check that IAM user has all required permissions. Review CloudFormation stack events in AWS Console for specific permission errors.

### CloudFront distribution not found

The initial manual deploy must complete successfully. If it failed:
1. Check error messages in terminal
2. Fix any issues (usually permissions)
3. Run `npm run deploy` again

### GitHub Actions failing

1. Verify GitHub Secrets are set correctly (no extra spaces)
2. Check Actions logs for specific error
3. Ensure initial manual deploy completed successfully

### Changes not appearing

CloudFront caching means changes can take 1-2 minutes to propagate. SST automatically invalidates the cache, but there's a delay.

## Next Steps

Once setup is complete:
- Share the CloudFront URL with stakeholders
- All future code changes auto-deploy when pushed to `main`
- Monitor deployments in GitHub Actions tab
- CloudFront URL is permanent - no need to update it

## Cost Estimates

**Typical monthly costs for this prototype:**
- S3 storage: < $1 (minimal assets)
- CloudFront: $1-5 (depends on traffic)
- **Total: ~$2-6/month** for a low-traffic prototype

AWS Free Tier may cover most costs for the first 12 months.
