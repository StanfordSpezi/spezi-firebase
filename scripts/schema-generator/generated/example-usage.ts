/**
 * Example: Using the generated FHIR Zod schemas
 */

import {
  PatientSchema,
  ObservationSchema,
  PractitionerSchema,
  type Patient,
  type Observation,
} from './generated-schemas.js';

// ============================================================================
// Example 1: Validating a Patient resource
// ============================================================================

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
  telecom: [{
    system: 'phone',
    value: '555-1234',
    use: 'home',
  }],
  address: [{
    use: 'home',
    line: ['123 Main St'],
    city: 'Springfield',
    state: 'IL',
    postalCode: '62701',
    country: 'USA',
  }],
};

const patientResult = PatientSchema.safeParse(patientData);

if (patientResult.success) {
  console.log('✅ Valid patient resource');
  const patient: Patient = patientResult.data;
  console.log(`Patient: ${patient.name?.[0]?.given?.[0]} ${patient.name?.[0]?.family}`);
} else {
  console.log('❌ Invalid patient:', patientResult.error.format());
}

// ============================================================================
// Example 2: Validating an Observation
// ============================================================================

const observationData = {
  resourceType: 'Observation',
  status: 'final',
  code: {
    coding: [{
      system: 'http://loinc.org',
      code: '29463-7',
      display: 'Body Weight',
    }],
    text: 'Body Weight',
  },
  subject: {
    reference: 'Patient/patient-123',
    display: 'John Smith',
  },
  effectiveDateTime: '2024-01-15T10:30:00Z',
  valueQuantity: {
    value: 72.5,
    unit: 'kg',
    system: 'http://unitsofmeasure.org',
    code: 'kg',
  },
  performer: [{
    reference: 'Practitioner/pract-456',
    display: 'Dr. Jane Doe',
  }],
};

const observationResult = ObservationSchema.safeParse(observationData);

if (observationResult.success) {
  console.log('✅ Valid observation');
  const obs: Observation = observationResult.data;
  console.log(`Value: ${obs.valueQuantity?.value} ${obs.valueQuantity?.unit}`);
} else {
  console.log('❌ Invalid observation:', observationResult.error.format());
}

// ============================================================================
// Example 3: Type-safe data construction
// ============================================================================

// TypeScript will provide autocomplete and type checking
const newPatient: Patient = {
  resourceType: 'Patient',
  name: [{
    family: 'Doe',
    given: ['Jane'],
  }],
  gender: 'female',
  // TypeScript knows what properties are available!
};

// Validate before using
const validation = PatientSchema.safeParse(newPatient);
if (validation.success) {
  console.log('Patient is valid and can be sent to FHIR server');
}

// ============================================================================
// Example 4: Extracting validation errors
// ============================================================================

const invalidData = {
  resourceType: 'Patient',
  gender: 'invalid-value', // This will fail validation
};

const result = PatientSchema.safeParse(invalidData);

if (!result.success) {
  console.log('\nValidation errors:');
  result.error.issues.forEach(issue => {
    console.log(`- ${issue.path.join('.')}: ${issue.message}`);
  });
}

console.log('\n✅ Examples complete! Check the schemas for more resource types.');
