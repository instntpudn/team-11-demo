# Build & Data Scripts

## Quick Start

### Update JSON from Excel
When you modify `personetics-demo-data.xlsx`, run:
```bash
npm run update-from-excel
```

This converts the Excel file to JSON and saves it to `src/content/lifeEvents/base-life-events.json`. The app will use this static JSON file.

### Build Production Bundle
```bash
npm run build
```

The build is now **fast** (~230ms) because it uses pre-generated JSON, not Excel conversion.

## Workflow

1. **Edit Excel file** → `personetics-demo-data.xlsx`
2. **Run update script** → `npm run update-from-excel`
3. **Commit JSON changes** → git commit
4. **Build app** → `npm run build` (fast, decoupled from data)

## Development

```bash
npm run dev      # Start dev server with hot reload
npm run lint     # Run linter
npm run preview  # Preview production build
```

## Architecture

- **Data Decoupling**: Build process no longer depends on Excel conversion
- **Fast Builds**: TypeScript + Vite without data transformation overhead
- **Static JSON**: App uses pre-generated `base-life-events.json`
- **Standalone Script**: `scripts/fetch-excel-and-convert.js` independent of build pipeline
