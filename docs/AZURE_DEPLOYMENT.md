# Azure Static Web Apps Deployment Guide

## Overview
This deploys your Personetics wizard to Azure Static Web Apps (free tier).
- **Cost**: Free tier (~$0-5/month if you exceed limits)
- **Performance**: Global CDN included
- **Features**: Auto-deployment from GitHub, staging environments

## Prerequisites
- Azure CLI installed (`brew install azure-cli`)
- Logged into Azure (`az login`)
- GitHub repo already connected

## Step 1: Create Resource Group (One time)
```bash
az group create \
  --name personetics-rg \
  --location eastus
```

## Step 2: Create Static Web Apps Resource
```bash
az staticwebapp create \
  --name personetics-wizard \
  --resource-group personetics-rg \
  --source https://github.com/instntpudn/personeticsv2demo \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --sku Free
```

This command will:
- Create the Static Web Apps resource
- Connect your GitHub repo
- Set up GitHub Actions automatically
- Trigger initial build and deployment

## Step 3: Get the API Token
After creation, Azure will output a deployment token. You can also get it:
```bash
az staticwebapp secrets list \
  --name personetics-wizard \
  --resource-group personetics-rg
```

Copy the token under `apiToken`

## Step 4: Add GitHub Secret
1. Go to https://github.com/instntpudn/personeticsv2demo/settings/secrets/actions
2. Click "New repository secret"
3. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
4. Value: (paste the token from Step 3)
5. Click "Add secret"

## Step 5: Push to GitHub
```bash
cd /Users/scottmcq/AndroidStudioProjects/Life\ Stage
git add .
git commit -m "Add Azure Static Web Apps deployment"
git push origin main
```

This will trigger the GitHub Actions workflow to build and deploy!

## Step 6: Monitor Deployment
1. Go to GitHub repo → Actions
2. Watch the workflow run
3. Once complete, you'll see a live URL in the workflow logs

## Cost Breakdown (Free Tier)
- Storage: 0.5 GB included (you're ~2-3 MB)
- Bandwidth: 1 GB/month included
- Staging environments: Yes
- Custom domain: Yes
- SSL certificate: Free (automatic)

**Total monthly cost: $0 (unless you exceed free limits)**

## Custom Domain (Optional)
```bash
az staticwebapp custom-domain create \
  --name personetics-wizard \
  --resource-group personetics-rg \
  --domain-name yourdomain.com
```

## View Live Site
After deployment completes, your site will be at:
`https://personetics-wizard-RANDOMID.azurestaticapps.net`

## Troubleshooting
If build fails, check the GitHub Actions log for errors.

Common issues:
- **"dist folder not found"** → Make sure `npm run build` runs successfully locally
- **"Node version"** → Azure uses Node 16+ by default (check `.github/workflows/azure-static-web-apps-deploy.yml`)
