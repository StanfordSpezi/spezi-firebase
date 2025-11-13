# Getting Started with FHIR Zod Schema Generator

This guide will help you quickly generate Zod schemas from FHIR R4B types.

## Prerequisites

- Node.js 18+ installed
- Access to this repository

## Option 1: Using the Quick Start Script (Recommended)

The easiest way to get started:

```bash
cd scripts/schema-generator
./quick-start.sh
```

This will:
1. Install dependencies automatically
2. Generate schemas for all core FHIR resources
3. Create example usage files

### Generate Specific Resources

```bash
# Generate only Patient schema
./quick-start.sh --resource Patient

# Generate Observation schema
./quick-start.sh --resource Observation

# Custom output directory
./quick-start.sh --output ./my-schemas
```

## Option 2: Manual Setup

If you prefer manual control:

### Step 1: Install Dependencies

```bash
cd scripts/schema-generator
npm install
```

### Step 2: Run Generator

```bash
# All resources
npm run generate

# Specific resources
npm run generate:patient
npm run generate:observation

# Or use Node directly
node generate-schemas.js --resource Patient
```

## What You Get

After running the generator, you'll find in the `generated/` directory:

1. **generated-schemas.ts** - Zod schemas for FHIR resources
2. **example-usage.ts** - Code examples showing how to use the schemas

## Using the Generated Schemas

Here's a quick example:

```typescript
import { PatientSchema } from './generated/generated-schemas';

// Your FHIR data
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

// Validate
const result = PatientSchema.safeParse(patientData);

if (result.success) {
  console.log('✅ Valid!', result.data);
  // result.data is now typed!
} else {
  console.log('❌ Invalid:', result.error.format());
}
```

## What Resources Are Generated?

By default, these core resources are generated:

**Clinical:**
- Patient, Observation, Practitioner
- Medication, MedicationRequest
- Appointment, AllergyIntolerance
- Condition, Procedure
- DiagnosticReport, Immunization

**Administrative:**
- Organization, Location, Encounter

**Workflow:**
- Questionnaire, QuestionnaireResponse, Bundle

**Plus common data types** like Address, CodeableConcept, Identifier, etc.

## Customization

Edit `generate-schemas.js` to customize:

```javascript
// Add more resources
const CORE_RESOURCES = [
  'Patient',
  'YourCustomResource',  // Add here
  // ...
];

// Add more data types
const CORE_DATATYPES = [
  'Address',
  'YourCustomType',  // Add here
  // ...
];
```

## Important Notes

⚠️ **This is a proof-of-concept** demonstrating Approach 1 from the proposals.

The generated schemas are a **starting point** and may need refinement for:
- FHIR choice types (value[x])
- Cardinality constraints (min/max)
- Value set bindings
- Reference constraints
- Extension handling

For production use, review and enhance the generated schemas based on your requirements.

## Troubleshooting

### "Command not found: node"
Install Node.js from https://nodejs.org/

### "Cannot find module @types/fhir"
Run from the repository root first:
```bash
cd ../../
npm install
cd scripts/schema-generator
```

### ts-to-zod errors
This is expected with complex types. Use generated schemas as a starting point and refine manually.

### Permission denied: ./quick-start.sh
Make it executable:
```bash
chmod +x quick-start.sh
```

## Integration with Main Project

The generated schemas are standalone. To use them in the main project:

1. Copy `generated/generated-schemas.ts` to your project
2. Install zod: `npm install zod`
3. Import and use the schemas

## Learn More

- **Full proposals**: See `../../proposals/FHIR_ZOD_SCHEMA_GENERATION_PROPOSAL.md`
- **Visual guide**: See `../../proposals/VISUAL_DECISION_GUIDE.md`
- **Detailed README**: See `README.md` in this directory

## Examples

### Example 1: Basic Validation

```typescript
import { PatientSchema } from './generated/generated-schemas';

const isValid = PatientSchema.safeParse(myData).success;
```

### Example 2: Type Inference

```typescript
import { z } from 'zod';
import { PatientSchema } from './generated/generated-schemas';

type Patient = z.infer<typeof PatientSchema>;

const patient: Patient = {
  resourceType: 'Patient',
  // TypeScript autocomplete works here!
};
```

### Example 3: Validation with Error Details

```typescript
const result = PatientSchema.safeParse(data);

if (!result.success) {
  console.log('Validation errors:');
  result.error.issues.forEach(issue => {
    console.log(`- ${issue.path.join('.')}: ${issue.message}`);
  });
}
```

## Next Steps

1. ✅ Generate schemas using this tool
2. 📝 Review the generated schemas
3. 🔧 Add manual refinements as needed
4. 🧪 Test with your FHIR data
5. 📚 Read the proposals for improvement strategies

---

**Questions?** See the main README.md or the proposal documents in `../../proposals/`.
