# FHIR Zod Schema Generator

This script automatically generates Zod schemas from FHIR R4B TypeScript type definitions using `ts-to-zod`.

## Purpose

This is a practical implementation of **Approach 1** from the proposal documents (see `../../proposals/`). It demonstrates how to leverage existing TypeScript types from `@types/fhir` to automatically generate Zod validation schemas.

## Quick Start

### 1. Install Dependencies

```bash
cd scripts/schema-generator
npm install
```

### 2. Generate Schemas

```bash
# Generate all core FHIR resources
npm run generate

# Generate a specific resource (e.g., Patient)
npm run generate:patient

# Generate a specific resource (e.g., Observation)
npm run generate:observation

# Or use the script directly
node generate-schemas.js --resource Patient --output ./my-output
```

### 3. Review Generated Files

The script creates:
- `generated/generated-schemas.ts` - Zod schemas for FHIR resources
- `generated/example-usage.ts` - Example code showing how to use the schemas

## What Gets Generated

By default, the script generates schemas for these core FHIR resources:

**Clinical Resources:**
- Patient
- Observation
- Practitioner
- Medication
- MedicationRequest
- Appointment
- AllergyIntolerance
- Condition
- Procedure
- DiagnosticReport
- Immunization

**Administrative Resources:**
- Organization
- Location
- Encounter

**Workflow Resources:**
- Questionnaire
- QuestionnaireResponse
- Bundle

**Core Data Types:**
- Address, Annotation, Attachment
- CodeableConcept, Coding
- ContactPoint, HumanName
- Identifier, Period
- Quantity, Range, Ratio
- Reference, Timing

## Usage Example

After generating, you can use the schemas like this:

```typescript
import { PatientSchema } from './generated/generated-schemas';

const patientData = {
  resourceType: 'Patient',
  id: 'patient-123',
  name: [{
    family: 'Smith',
    given: ['John']
  }],
  gender: 'male',
  birthDate: '1980-01-15'
};

// Validate at runtime
const result = PatientSchema.safeParse(patientData);

if (result.success) {
  console.log('Valid patient:', result.data);
} else {
  console.log('Validation errors:', result.error);
}

// Type inference
type Patient = z.infer<typeof PatientSchema>;
```

## Limitations & Known Issues

This is a **proof-of-concept** implementation. The generated schemas have some limitations:

### ⚠️ FHIR-Specific Features Not Fully Captured

1. **Choice Types (value[x])**: FHIR allows fields like `value[x]` where x can be different types (e.g., `valueString`, `valueQuantity`). ts-to-zod may not handle these optimally.

2. **Cardinality Constraints**: TypeScript optional (`?`) doesn't capture "at least 1" or "exactly 1" cardinality that FHIR requires in some cases.

3. **Value Set Bindings**: FHIR defines value sets for coded fields. TypeScript enums may not cover all possibilities, especially for extensible bindings.

4. **Reference Constraints**: FHIR References can point to specific resource types. The generator may create generic reference schemas.

5. **Extension Handling**: FHIR's extension mechanism is very flexible and may need special handling.

### 🔧 Recommended Post-Processing

For production use, you should:

1. **Review generated schemas** manually
2. **Add custom validations** for FHIR-specific rules
3. **Enhance choice type handling** using Zod unions
4. **Add value set constraints** using Zod enums or refinements
5. **Test thoroughly** with real FHIR data

## Integration with Proposals

This script demonstrates **Approach 1: TypeScript-to-Zod Generation** from the comprehensive proposals in `../../proposals/`:

- **Speed**: ⭐⭐⭐⭐⭐ (Very fast - seconds)
- **Accuracy**: ⭐⭐⭐ (Good, but needs refinement)
- **Maintenance**: Low (regenerate when types update)

For more accurate schemas, consider:
- **Approach 2**: Parse FHIR StructureDefinitions directly (see proposal)
- **Approach 3**: Use the Builder DSL pattern (see proposal)

## Customization

### Generate Specific Resources

Edit the `CORE_RESOURCES` array in `generate-schemas.js`:

```javascript
const CORE_RESOURCES = [
  'Patient',
  'MyCustomResource',
  // ... add more
];
```

### Change Output Location

```bash
node generate-schemas.js --output ./my-custom-output
```

### Add More Data Types

Edit the `CORE_DATATYPES` array in `generate-schemas.js`.

## Troubleshooting

### "ts-to-zod not found"

Install dependencies:
```bash
npm install
```

Or install ts-to-zod globally:
```bash
npm install -g ts-to-zod
```

### "@types/fhir not found"

Make sure you've installed dependencies in the main repository:
```bash
cd ../../
npm install
cd scripts/schema-generator
```

### Generation Fails or Produces Errors

This is expected with complex FHIR types. ts-to-zod has limitations with:
- Deeply nested types
- Complex union types
- Circular references

**Solution**: Use this as a starting point and refine manually, or consider implementing Approach 2 or 3 from the proposals.

## Script Workflow

The generator follows these steps:

1. **Extract Type Definitions**: Reads FHIR types from `@types/fhir/r4b.d.ts`
2. **Create Temporary File**: Builds a focused TypeScript file with selected interfaces
3. **Run ts-to-zod**: Converts TypeScript interfaces to Zod schemas
4. **Post-Process**: Adds headers, imports, and documentation
5. **Create Examples**: Generates usage example file
6. **Clean Up**: Removes temporary files

## File Structure

```
schema-generator/
├── package.json           # Dependencies and scripts
├── generate-schemas.js    # Main generator script
├── README.md             # This file
└── generated/            # Output directory (created on run)
    ├── generated-schemas.ts
    └── example-usage.ts
```

## Comparison with Manual Approach

### Before (Manual - Current)
- ⏱️ Time: 2-3 hours per resource
- 📏 Lines: ~100 lines per resource
- 🐛 Error Risk: High (manual typing)
- 🔄 Updates: Manual re-implementation

### After (Generated - This Script)
- ⏱️ Time: < 1 minute for all resources
- 📏 Lines: Automated
- 🐛 Error Risk: Lower (but needs validation)
- 🔄 Updates: Regenerate from types

## Related Documentation

- Main proposals: `../../proposals/FHIR_ZOD_SCHEMA_GENERATION_PROPOSAL.md`
- Visual guide: `../../proposals/VISUAL_DECISION_GUIDE.md`
- POC for Approach 1: `../../proposals/poc-approach1-typescript-to-zod.ts`
- POC for Approach 3: `../../proposals/poc-approach3-builder-dsl.ts`

## Contributing

This is a proof-of-concept script. Improvements welcome:

1. Better handling of FHIR choice types
2. Cardinality constraint validation
3. Value set binding support
4. Enhanced error messages
5. Support for more FHIR versions (R3, R5)

## License

MIT (same as parent project)

---

**Note**: This script is a demonstration of automated schema generation. For production use, carefully review and enhance the generated schemas based on your specific FHIR validation requirements.
