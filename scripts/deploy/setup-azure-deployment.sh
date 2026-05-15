#!/bin/bash

# Personetics Azure Deployment Setup Script
# This script adds the Azure deployment token to GitHub Secrets

REPO="instntpudn/personeticsv2demo"
SECRET_NAME="AZURE_STATIC_WEB_APPS_API_TOKEN"
CREDENTIALS_FILE="$HOME/.personetics-azure-credentials.json"

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  Personetics Azure Deployment Setup                           ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Check if credentials file exists
if [ ! -f "$CREDENTIALS_FILE" ]; then
  echo "❌ Credentials file not found at: $CREDENTIALS_FILE"
  echo "   Run Azure CLI setup first to generate credentials."
  exit 1
fi

echo ""
echo "✓ Found credentials file"

# Extract the API token
API_TOKEN=$(python3 << 'EOF'
import json
with open("$HOME/.personetics-azure-credentials.json") as f:
    data = json.load(f)
    print(data['azure']['deployment_api_token'])
EOF
)

if [ -z "$API_TOKEN" ]; then
  echo "❌ Failed to extract API token"
  exit 1
fi

echo "✓ Extracted deployment API token"
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  MANUAL GITHUB SECRET SETUP REQUIRED                          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Follow these steps to add the secret to GitHub:"
echo ""
echo "1. Open this link in your browser:"
echo "   https://github.com/$REPO/settings/secrets/actions"
echo ""
echo "2. Click 'New repository secret'"
echo ""
echo "3. Fill in the form:"
echo "   Name: $SECRET_NAME"
echo "   Value: (paste the token below)"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "TOKEN (copy this):"
echo "════════════════════════════════════════════════════════════════"
echo "$API_TOKEN"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "4. Click 'Add secret'"
echo ""
echo "5. Go to: https://github.com/$REPO/actions"
echo "   You should see a pending workflow. Once the secret is added,"
echo "   push to main to trigger deployment:"
echo ""
echo "   git add ."
echo "   git commit -m 'Deploy to Azure'"
echo "   git push origin main"
echo ""
echo "✓ Your site will be live at:"
echo "   https://proud-stone-0b512400f.7.azurestaticapps.net"
echo ""
