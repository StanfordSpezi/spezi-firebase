# Scripts

This directory contains utility scripts for the Spezi Firebase project.

## Available Scripts

### FHIR Zod Schema Generator

Located in `schema-generator/`, this script automatically generates Zod validation schemas from FHIR R4B TypeScript type definitions.

**Quick Start:**
```bash
cd schema-generator
./quick-start.sh
```

**What it does:**
- Generates Zod schemas from `@types/fhir` TypeScript definitions
- Creates validation schemas for core FHIR resources (Patient, Observation, etc.)
- Provides usage examples and documentation

**Documentation:**
- [Getting Started Guide](./schema-generator/GETTING_STARTED.md) - Quick start guide
- [Full README](./schema-generator/README.md) - Detailed documentation
- [Related Proposals](../proposals/) - Background and alternatives

**Use Case:**
This demonstrates **Approach 1** (TypeScript-to-Zod) from the FHIR schema generation proposals. It's a proof-of-concept showing how to leverage existing TypeScript types to automatically generate validation schemas.

---

For more scripts and tools, check the individual directories.
