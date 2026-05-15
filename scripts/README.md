# Scripts Directory

This directory contains utility and build scripts for the Life Stage Wizard application.

## Directory Structure

```
scripts/
├── data/              # Data processing and transformation scripts
├── deploy/            # Deployment and infrastructure scripts
├── README.md          # This file
```

## Data Scripts (`scripts/data/`)

These scripts handle Excel file processing, data transformation, and JSON data manipulation.

### `fetch-excel-and-convert.js`
Fetches and converts Excel data to JSON format.

**Purpose**: Read Excel file and convert life events data to JSON structure  
**Usage**: `node scripts/data/fetch-excel-and-convert.js`  
**Input**: Local `personetics-demo-data.xlsx` or GitHub fallback  
**Output**: JSON data structure with life events and journey data

### `populate-signals.js`
Populates empty signal and bankOutcome fields with capability-based content.

**Purpose**: Generate signal messages and financial impact statements based on capability  
**Usage**: `node scripts/data/populate-signals.js`  
**Input**: `src/content/lifeEvents/base-life-events.json`  
**Output**: Updated JSON with signal and bankOutcome fields

### `add-banker-channels.js`
Adds banker channel messaging to events.

**Purpose**: Populate banker-specific outreach messages for all events  
**Usage**: `node scripts/data/add-banker-channels.js`  
**Input**: `src/content/lifeEvents/base-life-events.json`  
**Output**: Events with banker channel data added

### `check-excel-structure.js`
Validates Excel file structure.

**Purpose**: Verify Excel file has correct format and required sheets  
**Usage**: `node scripts/data/check-excel-structure.js`  
**Input**: `personetics-demo-data.xlsx`  
**Output**: Console validation report

### `trim-excel-to-5-events.js`
⚠️ **ARCHIVE**: Reduces events to 5 for testing. Deprecated in favor of full 20-event dataset.

**Purpose**: Create test dataset with limited events  
**Usage**: `node scripts/data/trim-excel-to-5-events.js`  
**Note**: Use only for development testing; production uses full dataset

### `export-to-excel.js`
Exports JSON data back to Excel format.

**Purpose**: Convert JSON life events back to Excel workbook  
**Usage**: `node scripts/data/export-to-excel.js`  
**Input**: `src/content/lifeEvents/base-life-events.json`  
**Output**: `personetics-demo-data.xlsx`

## Deployment Scripts (`scripts/deploy/`)

These scripts handle Azure deployment and infrastructure setup.

### `setup-azure-deployment.sh`
Sets up Azure Static Web App for deployment.

**Purpose**: Create and configure Azure Static Web App  
**Usage**: `./scripts/deploy/setup-azure-deployment.sh`  
**Requirements**: Azure CLI, authenticated Azure account  
**Output**: Deployed application URL

### `azure-credentials.py`
Manages Azure authentication and credentials.

**Purpose**: Handle Azure service principal authentication  
**Usage**: Python script for Azure credential management  
**Requires**: Python 3.x, Azure SDK

## Common Workflows

### Updating Life Events Data

1. Edit `personetics-demo-data.xlsx`
2. Run data conversion: `node scripts/data/fetch-excel-and-convert.js`
3. Populate signals: `node scripts/data/populate-signals.js`
4. Verify structure: `node scripts/data/check-excel-structure.js`

### Deploying to Azure

1. Ensure credentials: `python scripts/deploy/azure-credentials.py`
2. Run deployment: `./scripts/deploy/setup-azure-deployment.sh`
3. Monitor deployment in Azure Portal

### Exporting Updated Data

1. Make changes to `src/content/lifeEvents/base-life-events.json`
2. Export to Excel: `node scripts/data/export-to-excel.js`
3. Verify output: `personetics-demo-data.xlsx`

## Data Flow

```
personetics-demo-data.xlsx
           ↓
fetch-excel-and-convert.js
           ↓
base-life-events.json
           ↓
populate-signals.js (adds signal/bankOutcome)
           ↓
add-banker-channels.js (adds banker channel data)
           ↓
Final: base-life-events.json (ready for app)
           ↓
export-to-excel.js (optional: export back to Excel)
```

## Backup Strategy

- **Current Data**: `src/content/lifeEvents/base-life-events.json`
- **Master Backup**: `src/content/lifeEvents/base-life-events-full.json` (never modified)
- **Recovery**: `cp src/content/lifeEvents/base-life-events-full.json src/content/lifeEvents/base-life-events.json`

## Notes

- All data scripts are Node.js (JavaScript)
- All deployment scripts require system-level tools (Bash, Python)
- Scripts follow camelCase naming convention
- Scripts are idempotent where possible (safe to run multiple times)

## Troubleshooting

**Excel file not found**:
- Check `personetics-demo-data.xlsx` exists in project root
- Scripts have GitHub fallback if local file unavailable

**Data validation fails**:
- Run `node scripts/data/check-excel-structure.js` to identify issues
- Verify Excel file format matches expected structure

**Deployment fails**:
- Check Azure credentials: `python scripts/deploy/azure-credentials.py`
- Verify permissions in Azure Portal
- Check logs in Azure Static Web App dashboard
