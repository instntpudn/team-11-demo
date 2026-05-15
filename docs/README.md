# Documentation Index

This directory contains comprehensive documentation for the Life Stage Wizard application.

## Quick Navigation

| Document | Purpose | Audience |
|----------|---------|----------|
| [INSTRUCTIONS.md](./INSTRUCTIONS.md) | Setup and local development guide | Developers |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design and component structure | Architects, Senior Devs |
| [CODING_STANDARDS.md](../CODING_STANDARDS.md) | Code style and best practices | All Developers |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment procedures | DevOps, Release Managers |
| [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) | Azure-specific deployment guide | DevOps Engineers |
| [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md) | Project overview and status | Project Managers, Stakeholders |

## Documentation Guide

### For New Developers
1. Start with [INSTRUCTIONS.md](./INSTRUCTIONS.md) - Local setup and running
2. Read [CODING_STANDARDS.md](../CODING_STANDARDS.md) - Code conventions
3. Review [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand system design
4. Check [../README.md](../README.md) - Project overview

### For Architects/Technical Leads
1. [ARCHITECTURE.md](./ARCHITECTURE.md) - Complete system design
2. [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md) - High-level overview
3. [CODING_STANDARDS.md](../CODING_STANDARDS.md) - Quality standards

### For Deployment/DevOps
1. [DEPLOYMENT.md](./DEPLOYMENT.md) - General deployment guide
2. [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) - Azure-specific setup
3. [../scripts/README.md](../scripts/README.md) - Script documentation

### For Project Management
1. [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md) - Project status and features
2. [../README.md](../README.md) - Quick project overview
3. [../package.json](../package.json) - Dependencies and build info

## Key Documentation Files

### INSTRUCTIONS.md
Local development setup, installation, running the application locally.

### ARCHITECTURE.md
- Component hierarchy and relationships
- Data flow and state management
- Module organization
- Design patterns used

### CODING_STANDARDS.md
- TypeScript conventions
- React component patterns
- File naming and organization
- Code style guidelines
- Performance best practices

### DEPLOYMENT.md
- Production build process
- Deployment steps
- Environment configuration
- Post-deployment verification

### AZURE_DEPLOYMENT.md
- Azure Static Web App setup
- GitHub Actions CI/CD
- Azure resource configuration
- Troubleshooting Azure deployments

### SOLUTION_SUMMARY.md
- Project overview
- Feature list
- Technical stack
- Implementation progress
- Known issues and solutions

## File Organization

```
docs/
├── README.md                 (This file)
├── INSTRUCTIONS.md           (Setup and development)
├── ARCHITECTURE.md           (System design)
├── CODING_STANDARDS.md       (Code guidelines - in root)
├── DEPLOYMENT.md             (Production deployment)
├── AZURE_DEPLOYMENT.md       (Azure-specific)
└── SOLUTION_SUMMARY.md       (Project status)
```

## Related Resources

- **Main README**: [../README.md](../README.md)
- **Coding Standards**: [../CODING_STANDARDS.md](../CODING_STANDARDS.md)
- **Scripts Guide**: [../scripts/README.md](../scripts/README.md)
- **Package Info**: [../package.json](../package.json)

## Contributing

All documentation should:
- Be written in Markdown
- Include a clear purpose statement
- Link to related documents
- Be kept up-to-date with code changes
- Follow the structure of existing documents

## Document Maintenance

- Review documentation quarterly
- Update when major features are added/removed
- Mark deprecated content clearly
- Keep examples up-to-date with code

## Questions?

Refer to the appropriate documentation for your role:
- **Development**: INSTRUCTIONS.md + CODING_STANDARDS.md
- **Architecture**: ARCHITECTURE.md
- **Deployment**: DEPLOYMENT.md or AZURE_DEPLOYMENT.md
- **Project Status**: SOLUTION_SUMMARY.md

---

Last Updated: May 2026
