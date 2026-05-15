#!/usr/bin/env python3
"""
Personetics Azure Credentials Manager
Stores and retrieves Azure deployment credentials securely
"""

import json
import os
import sys
from pathlib import Path


class AzureCredentialsManager:
    def __init__(self):
        self.creds_file = Path.home() / ".personetics-azure-credentials.json"
        
    def load(self):
        """Load credentials from file"""
        if not self.creds_file.exists():
            print(f"❌ Credentials file not found: {self.creds_file}")
            return None
        
        with open(self.creds_file) as f:
            return json.load(f)
    
    def save(self, data):
        """Save credentials to file"""
        with open(self.creds_file, 'w') as f:
            json.dump(data, f, indent=2)
        os.chmod(self.creds_file, 0o600)  # Only readable by owner
        print(f"✓ Saved credentials to {self.creds_file}")
    
    def get_azure_credentials(self):
        """Get Azure credentials"""
        creds = self.load()
        if not creds:
            return None
        return creds.get('azure', {})
    
    def get_deployment_token(self):
        """Get the deployment API token"""
        azure = self.get_azure_credentials()
        if not azure:
            return None
        return azure.get('deployment_api_token')
    
    def get_site_url(self):
        """Get the deployed site URL"""
        azure = self.get_azure_credentials()
        if not azure:
            return None
        return azure.get('site_url')
    
    def print_info(self):
        """Print formatted credentials info"""
        creds = self.load()
        if not creds:
            return
        
        azure = creds.get('azure', {})
        print("\n╔════════════════════════════════════════════════════════════════╗")
        print("║  Azure Deployment Credentials                                 ║")
        print("╚════════════════════════════════════════════════════════════════╝\n")
        
        print(f"Resource Group:     {azure.get('resource_group')}")
        print(f"Region:             {azure.get('region')}")
        print(f"Static Web App:     {azure.get('static_web_app_name')}")
        print(f"Site URL:           {azure.get('site_url')}")
        print(f"Created:            {creds.get('deployment_status')}")
        print()
    
    def setup_instructions(self):
        """Print setup instructions"""
        creds = self.load()
        if not creds:
            return
        
        token = creds['azure'].get('deployment_api_token')
        
        print("\n╔════════════════════════════════════════════════════════════════╗")
        print("║  Next: Add GitHub Secret                                      ║")
        print("╚════════════════════════════════════════════════════════════════╝\n")
        
        print("1. Go to: https://github.com/instntpudn/personeticsv2demo/settings/secrets/actions")
        print("\n2. Click 'New repository secret'")
        print("\n3. Fill in:")
        print(f"   Name: {creds['github'].get('actions_secret_name')}")
        print(f"   Value: (paste below)")
        print("\n" + "="*66)
        print("TOKEN:")
        print("="*66)
        print(token)
        print("="*66)
        print("\n4. Click 'Add secret'")
        print("\n5. Push to main to trigger deployment:")
        print("   git push origin main")
        print()


if __name__ == '__main__':
    manager = AzureCredentialsManager()
    
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == 'info':
            manager.print_info()
        elif cmd == 'setup':
            manager.setup_instructions()
        elif cmd == 'token':
            token = manager.get_deployment_token()
            if token:
                print(token)
        elif cmd == 'url':
            url = manager.get_site_url()
            if url:
                print(url)
    else:
        manager.print_info()
        manager.setup_instructions()
