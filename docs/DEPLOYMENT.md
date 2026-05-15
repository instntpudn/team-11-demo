# Personetics Azure Deployment

Your Personetics wizard is deployed to **Azure Static Web Apps** on the free tier.

## ✓ Deployment Status

- **Status**: Infrastructure created and ready
- **Resource Group**: `personetics-rg`
- **Region**: `eastus2`
- **SKU**: Free (includes global CDN, auto-scaling, staging environments)
- **Cost**: ~$0/month

## 🔗 Your Site URL

Once deployment completes:
```
https://proud-stone-0b512400f.7.azurestaticapps.net
```

Check the URL with:
```bash
python3 scripts/azure-credentials.py url
```

## 📋 Credentials Management

### Secure Credential Storage
All Azure credentials are stored locally (NOT in git) at:
```
~/.personetics-azure-credentials.json
```

This file is:
- ✓ Excluded from git (see `.gitignore`)
- ✓ Readable only by your user (chmod 600)
- ✓ Contains all necessary deployment info
- ✓ Persists across sessions

### View Credentials
```bash
# Show all Azure credentials
python3 scripts/azure-credentials.py info

# Get just the deployment token
python3 scripts/azure-credentials.py token

# Get the site URL
python3 scripts/azure-credentials.py url
```

## 🚀 Complete Deployment Setup (5 minutes)

### Step 1: Verify Credentials Exist
```bash
python3 scripts/azure-credentials.py info
```

### Step 2: Add GitHub Secret
You need to manually add the deployment token to GitHub Secrets (this is a one-time step):

1. Open: https://github.com/instntpudn/personeticsv2demo/settings/secrets/actions
2. Click **"New repository secret"**
3. Fill in the form:
   - **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - **Value**: Run this and paste the output:
     ```bash
     python3 scripts/azure-credentials.py token
     ```
4. Click **"Add secret"**

### Step 3: Deploy
Push any changes to `main` branch to trigger automatic deployment:
```bash
git add .
git commit -m "Deploy to Azure"
git push origin main
```

Then watch the deployment:
- Go to: https://github.com/instntpudn/personeticsv2demo/actions
- Click the running workflow
- Wait for "Build and Deploy" job to complete
- Your site will be live!

## 📊 Deployment Details

### Azure Resources Created
- **Static Web App**: `personetics-wizard`
  - 0.5 GB storage (you're using ~5MB)
  - 1 GB bandwidth/month
  - Global CDN included
  - Free SSL certificate
  - Auto-scaling

### GitHub Actions Workflow
File: `.github/workflows/azure-static-web-apps-deploy.yml`

Automatically triggered on:
- Push to `main` branch
- Pull requests to `main`

The workflow:
1. Checks out code
2. Runs `npm run build`
3. Deploys `dist/` folder to Azure
4. Creates preview environments for PRs

### Free Tier Limits
| Feature | Limit | Status |
|---------|-------|--------|
| Storage | 0.5 GB | ✓ OK (using ~5MB) |
| Bandwidth | 1 GB/month | ✓ OK |
| Functions | 200k/month | ✓ OK (no functions) |
| Builds | 3/day | ✓ OK |

## 🔄 Next Time Setup

When you want to deploy on a new machine or after credentials expire:

### Quick Setup
```bash
# 1. Clone the repo
git clone https://github.com/instntpudn/personeticsv2demo
cd personeticsv2demo

# 2. Get credentials from Azure (if needed)
az staticwebapp secrets list --name personetics-wizard --resource-group personetics-rg

# 3. Store locally (copy the output to ~/.personetics-azure-credentials.json)

# 4. Verify
python3 scripts/azure-credentials.py info

# 5. Push to deploy
git push origin main
```

## 🛠️ Useful Commands

```bash
# Check Azure Static Web App status
az staticwebapp show --name personetics-wizard --resource-group personetics-rg

# View deployment logs (GitHub Actions)
gh run list --repo instntpudn/personeticsv2demo

# View Azure costs
az costmanagement query --scope /subscriptions/014f6db0-cde4-4c35-abaa-14e9abdd8ab3

# Get live site URL
az staticwebapp show --name personetics-wizard --resource-group personetics-rg --query "defaultHostname" -o tsv
```

## 📱 Test Locally Before Deploying

```bash
# Install dependencies
npm install

# Run locally
npm run dev
# Visit http://localhost:5175

# Build for production
npm run build

# Test production build locally
npx serve -s dist
```

## 🔐 Security Notes

- ✓ Credentials file is NOT in git
- ✓ GitHub secret is separate from code
- ✓ Azure Static Web Apps provides free SSL
- ✓ No exposed API keys in code
- ✓ Environment variables can be added via Azure Portal if needed

## ❓ Troubleshooting

### "Credentials file not found"
1. Check it exists: `ls -la ~/.personetics-azure-credentials.json`
2. If missing, restore from Azure:
   ```bash
   az staticwebapp secrets list --name personetics-wizard --resource-group personetics-rg
   ```
3. Save to `~/.personetics-azure-credentials.json`

### Build fails in GitHub Actions
1. Check: https://github.com/instntpudn/personeticsv2demo/actions
2. Common issues:
   - Node version mismatch → Azure uses Node 16+
   - Build script fails → Run `npm run build` locally first
   - Missing dependencies → Run `npm install`

### Site shows "404"
1. Check GitHub Actions workflow completed ✓
2. Wait 30 seconds for CDN propagation
3. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
4. Check site URL is correct: `python3 scripts/azure-credentials.py url`

## 📞 Support

For issues:
1. Check GitHub Actions logs: https://github.com/instntpudn/personeticsv2demo/actions
2. Check Azure portal: https://portal.azure.com (search "personetics-wizard")
3. Check build locally: `npm run build`
