#!/usr/bin/env node

/**
 * FHIR Zod Schema Generator using ts-to-zod
 * 
 * This script generates Zod schemas from FHIR R4B TypeScript type definitions.
 * 
 * Usage:
 *   npm install
 *   npm run generate              # Generate all resources
 *   npm run generate:patient      # Generate Patient schema only
 *   npm run generate:observation  # Generate Observation schema only
 *   node generate-schemas.js --resource Patient --output ./output
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const resourceFilter = args.find(arg => !arg.startsWith('--'))?.replace('--resource=', '') || 
                       args[args.indexOf('--resource') + 1] || null;
const outputDir = args[args.indexOf('--output') + 1] || './generated';

console.log('🚀 FHIR Zod Schema Generator');
console.log('=' .repeat(50));

// Key FHIR resource types to generate
const CORE_RESOURCES = [
  'Patient',
  'Observation', 
  'Practitioner',
  'Medication',
  'MedicationRequest',
  'Appointment',
  'AllergyIntolerance',
  'Condition',
  'Procedure',
  'DiagnosticReport',
  'Immunization',
  'Questionnaire',
  'QuestionnaireResponse',
  'Organization',
  'Location',
  'Encounter',
  'Bundle',
];

// Core data types
const CORE_DATATYPES = [
  'Address',
  'Annotation',
  'Attachment',
  'CodeableConcept',
  'Coding',
  'ContactPoint',
  'HumanName',
  'Identifier',
  'Period',
  'Quantity',
  'Range',
  'Ratio',
  'Reference',
  'Timing',
];

const resourcesToGenerate = resourceFilter 
  ? [resourceFilter]
  : CORE_RESOURCES;

console.log(`📋 Resources to generate: ${resourcesToGenerate.join(', ')}`);
console.log(`📁 Output directory: ${outputDir}\n`);

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`✅ Created output directory: ${outputDir}`);
}

// Step 1: Create a temporary TypeScript file with the interfaces we want to convert
console.log('\n📝 Step 1: Extracting FHIR type definitions...');

// Try multiple possible locations for @types/fhir
const possiblePaths = [
  path.join(__dirname, 'node_modules/@types/fhir/r4b.d.ts'),
  path.join(__dirname, '../../node_modules/@types/fhir/r4b.d.ts'),
];

let fhirTypesPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    fhirTypesPath = p;
    break;
  }
}

if (!fhirTypesPath) {
  console.error('❌ Error: @types/fhir not found. Please run npm install first.');
  console.error('   Searched in:');
  possiblePaths.forEach(p => console.error(`   - ${p}`));
  process.exit(1);
}

// Read the FHIR types file
const fhirTypes = fs.readFileSync(fhirTypesPath, 'utf-8');

// Extract interfaces for our resources
function extractInterface(content, interfaceName) {
  // Find the start of the interface
  const startRegex = new RegExp(`export interface ${interfaceName}(\\s+extends\\s+\\w+)?\\s*\\{`);
  const startMatch = content.match(startRegex);
  
  if (!startMatch) {
    return null;
  }
  
  const startIndex = content.indexOf(startMatch[0]);
  let braceCount = 1;
  let currentIndex = startIndex + startMatch[0].length;
  
  // Count braces to find the matching closing brace
  while (braceCount > 0 && currentIndex < content.length) {
    const char = content[currentIndex];
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
    currentIndex++;
  }
  
  if (braceCount === 0) {
    return content.substring(startIndex, currentIndex);
  }
  
  return null;
}

// Create a temporary file with selected interfaces
const tempInputFile = path.join(outputDir, 'temp-fhir-types.ts');
let tempFileContent = `// Temporary file for ts-to-zod conversion\n`;
tempFileContent += `// Generated from @types/fhir/r4b.d.ts\n\n`;

// Add Element base type (required by most FHIR types)
const elementInterface = extractInterface(fhirTypes, 'Element');
if (elementInterface) {
  tempFileContent += elementInterface + '\n\n';
}

// Add DomainResource base type
const domainResourceInterface = extractInterface(fhirTypes, 'DomainResource');
if (domainResourceInterface) {
  tempFileContent += domainResourceInterface + '\n\n';
}

// Add Resource base type
const resourceInterface = extractInterface(fhirTypes, 'Resource');
if (resourceInterface) {
  tempFileContent += resourceInterface + '\n\n';
}

// Add core data types
console.log('📦 Adding core data types...');
for (const dataType of CORE_DATATYPES) {
  const interfaceCode = extractInterface(fhirTypes, dataType);
  if (interfaceCode) {
    tempFileContent += interfaceCode + '\n\n';
    console.log(`  ✓ ${dataType}`);
  }
}

// Add requested resources
console.log('\n🏥 Adding FHIR resources...');
for (const resource of resourcesToGenerate) {
  const interfaceCode = extractInterface(fhirTypes, resource);
  if (interfaceCode) {
    tempFileContent += interfaceCode + '\n\n';
    console.log(`  ✓ ${resource}`);
  } else {
    console.log(`  ⚠ ${resource} not found`);
  }
}

fs.writeFileSync(tempInputFile, tempFileContent);
console.log(`\n✅ Created temporary types file: ${tempInputFile}`);

// Step 2: Create ts-to-zod configuration
console.log('\n⚙️  Step 2: Configuring ts-to-zod...');

const configFile = path.join(outputDir, 'tsconfig.json');
const tsConfig = {
  compilerOptions: {
    target: 'ES2020',
    module: 'ES2020',
    lib: ['ES2020'],
    declaration: true,
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    moduleResolution: 'node'
  },
  include: ['temp-fhir-types.ts']
};

fs.writeFileSync(configFile, JSON.stringify(tsConfig, null, 2));
console.log(`✅ Created TypeScript config: ${configFile}`);

// Step 3: Run ts-to-zod
console.log('\n🔄 Step 3: Running ts-to-zod conversion...');
console.log('This may take a moment...\n');

try {
  // Note: ts-to-zod needs to be run as a CLI command
  const command = `npx ts-to-zod ${tempInputFile} ${outputDir}/generated-schemas.ts`;
  console.log(`Running: ${command}\n`);
  
  execSync(command, { 
    cwd: __dirname,
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: '1' }
  });
  
  console.log('\n✅ Schema generation complete!');
} catch (error) {
  console.error('\n❌ Error running ts-to-zod:', error.message);
  console.error('\nNote: ts-to-zod may have limitations with complex FHIR types.');
  console.error('You can try installing ts-to-zod globally: npm install -g ts-to-zod');
  process.exit(1);
}

// Step 4: Post-process the generated schemas
console.log('\n🔧 Step 4: Post-processing generated schemas...');

const generatedFile = path.join(outputDir, 'generated-schemas.ts');

if (fs.existsSync(generatedFile)) {
  let generatedContent = fs.readFileSync(generatedFile, 'utf-8');
  
  // Add header comment
  const header = `/**
 * FHIR Zod Schemas - Auto-generated
 * 
 * Generated from @types/fhir R4B type definitions using ts-to-zod
 * Generated at: ${new Date().toISOString()}
 * 
 * IMPORTANT: This is a proof-of-concept generation.
 * These schemas may need manual refinement for:
 * - FHIR choice types (value[x])
 * - Cardinality constraints (min/max occurrences)
 * - Value set bindings
 * - Reference type constraints
 * - Extension handling
 * 
 * See the proposal documents in proposals/ for more details on
 * improving schema generation accuracy.
 */

import { z } from 'zod';

`;
  
  generatedContent = header + generatedContent;
  
  // Write back the enhanced content
  fs.writeFileSync(generatedFile, generatedContent);
  console.log(`✅ Enhanced generated schemas with header and imports`);
}

// Step 5: Create a usage example
console.log('\n📚 Step 5: Creating usage example...');

const exampleFile = path.join(outputDir, 'example-usage.ts');
const exampleContent = `/**
 * Example: Using the generated FHIR Zod schemas
 */

import { PatientSchema, ObservationSchema } from './generated-schemas';

// Example 1: Validate a Patient resource
const patientData = {
  resourceType: 'Patient',
  id: 'patient-123',
  name: [{
    use: 'official',
    family: 'Smith',
    given: ['John', 'Michael'],
  }],
  gender: 'male',
  birthDate: '1980-01-15',
};

const patientResult = PatientSchema.safeParse(patientData);

if (patientResult.success) {
  console.log('✅ Valid patient:', patientResult.data);
} else {
  console.log('❌ Invalid patient:', patientResult.error);
}

// Example 2: Validate an Observation
const observationData = {
  resourceType: 'Observation',
  status: 'final',
  code: {
    coding: [{
      system: 'http://loinc.org',
      code: '29463-7',
      display: 'Body Weight',
    }],
  },
  subject: {
    reference: 'Patient/patient-123',
  },
  valueQuantity: {
    value: 72.5,
    unit: 'kg',
    system: 'http://unitsofmeasure.org',
    code: 'kg',
  },
};

const observationResult = ObservationSchema.safeParse(observationData);

if (observationResult.success) {
  console.log('✅ Valid observation:', observationResult.data);
} else {
  console.log('❌ Invalid observation:', observationResult.error);
}

// Example 3: Type inference
type Patient = z.infer<typeof PatientSchema>;
type Observation = z.infer<typeof ObservationSchema>;

const myPatient: Patient = {
  resourceType: 'Patient',
  // TypeScript will provide autocomplete here!
};
`;

fs.writeFileSync(exampleFile, exampleContent);
console.log(`✅ Created usage example: ${exampleFile}`);

// Step 6: Clean up temporary files
console.log('\n🧹 Step 6: Cleaning up...');
fs.unlinkSync(tempInputFile);
fs.unlinkSync(configFile);
console.log('✅ Removed temporary files');

// Summary
console.log('\n' + '='.repeat(50));
console.log('✨ Schema Generation Complete!');
console.log('='.repeat(50));
console.log(`\n📁 Generated files in: ${outputDir}/`);
console.log('  - generated-schemas.ts  (Zod schemas)');
console.log('  - example-usage.ts      (Usage examples)');
console.log('\n📖 Next steps:');
console.log('  1. Review the generated schemas');
console.log('  2. Add manual refinements as needed');
console.log('  3. Test with your FHIR data');
console.log('  4. See proposals/ for improvement strategies\n');
console.log('⚠️  Note: Generated schemas are a starting point and may need');
console.log('   refinement for FHIR-specific constraints (choice types,');
console.log('   cardinality, value sets, etc.).\n');
