<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Firebase open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Spezi Firebase FHIR

[![Build and Test](https://github.com/StanfordSpezi/spezi-firebase/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/spezi-firebase/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/spezi-firebase/graph/badge.svg)](https://codecov.io/gh/StanfordSpezi/spezi-firebase)

Type-safe FHIR R4B resource schemas and utilities for Firebase applications. This package provides comprehensive [Zod](https://zod.dev) schemas for FHIR (Fast Healthcare Interoperability Resources) data validation, making it easy to work with healthcare data in Firebase Functions, Firestore, and TypeScript applications.

This package is part of the [Spezi Firebase](https://github.com/StanfordSpezi/spezi-firebase) project, bringing standardized healthcare data exchange to the Stanford Spezi ecosystem.

## Why Use This Package?

Working with FHIR resources in TypeScript can be challenging due to their complex, nested structures and strict validation requirements. This package solves that by providing:

- **Type Safety**: Leverage TypeScript's type system with automatically generated types from Zod schemas
- **Runtime Validation**: Validate FHIR resources at runtime to catch data issues early
- **Firebase Integration**: Designed to work seamlessly with Firebase Functions and Firestore
- **Standards Compliance**: Schemas based on FHIR R4B specification
- **Developer Experience**: Intuitive API with helpful utility methods

## Installation

```bash
npm install @stanfordspezi/spezi-firebase-fhir
```

## Features

- **Comprehensive FHIR Resources**: Schemas for 40+ FHIR resources including Patient, Observation, Medication, Appointment, and more
- **FHIR Elements**: Support for all FHIR data types (CodeableConcept, Quantity, Reference, etc.)
- **Value Sets**: Pre-defined schemas for FHIR value sets and enumerations
- **Helper Methods**: Convenient utilities for working with coded concepts and extensions
- **Full Type Inference**: Get complete TypeScript autocompletion and type checking

### Supported FHIR Resources

Patient, Practitioner, Observation, Medication, MedicationRequest, Appointment, AllergyIntolerance, Condition, Procedure, DiagnosticReport, Immunization, Questionnaire, QuestionnaireResponse, and many more. See the [full list](./src/index.ts).

## Quick Start

### Validating FHIR Resources

```typescript
import { FhirPatient } from '@stanfordspezi/spezi-firebase-fhir'

// Parse and validate a patient resource
const rawData = {
  resourceType: 'Patient',
  id: 'patient-123',
  name: [
    {
      use: 'official',
      family: 'Smith',
      given: ['John', 'Michael'],
    },
  ],
  gender: 'male',
  birthDate: '1980-01-15',
}

// Validate the data and get a typed resource
const patient = FhirPatient.parse(rawData)
console.log(patient.value.name?.[0]?.family) // 'Smith'
```

### Working with Observations

```typescript
import { FhirObservation } from '@stanfordspezi/spezi-firebase-fhir'

const observationData = {
  resourceType: 'Observation',
  status: 'final',
  code: {
    coding: [
      {
        system: 'http://loinc.org',
        code: '29463-7',
        display: 'Body Weight',
      },
    ],
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
}

const observation = FhirObservation.parse(observationData)
console.log(observation.value.valueQuantity?.value) // 72.5
```

### Using Helper Methods

```typescript
import { FhirCondition } from '@stanfordspezi/spezi-firebase-fhir'

const condition = FhirCondition.parse({
  resourceType: 'Condition',
  code: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '73211009',
        display: 'Diabetes mellitus',
      },
    ],
  },
  // ... other fields
})

// Check if condition contains specific coding
const hasDiabetes = condition.containsCoding(condition.value.code, [
  {
    system: 'http://snomed.info/sct',
    code: '73211009',
  },
])

// Extract codes from CodeableConcept
const codes = condition.codes(condition.value.code, {
  system: 'http://snomed.info/sct',
})
console.log(codes) // ['73211009']
```

### Firebase Functions Integration

```typescript
import { onCall } from 'firebase-functions/v2/https'
import { getFirestore } from 'firebase-admin/firestore'
import { FhirPatient } from '@stanfordspezi/spezi-firebase-fhir'

export const createPatient = onCall(async (request) => {
  const patientData = request.data

  // Validate the patient data
  const patient = FhirPatient.parse(patientData)

  // Store in Firestore
  const firestore = getFirestore()
  await firestore
    .collection('patients')
    .doc(patient.value.id)
    .set(patient.value)

  return { success: true, id: patient.value.id }
})
```

### Firestore Integration

```typescript
import { getFirestore } from 'firebase-admin/firestore'
import { FhirObservation } from '@stanfordspezi/spezi-firebase-fhir'

const firestore = getFirestore()

// Read and validate from Firestore
const doc = await firestore.collection('observations').doc('obs-123').get()
const observation = FhirObservation.parse(doc.data())

// Write validated data to Firestore
const newObservation = FhirObservation.parse({
  /* ... */
})
await firestore
  .collection('observations')
  .doc(newObservation.value.id)
  .set(newObservation.value)
```

## API Overview

### Resource Classes

All FHIR resources are exported as classes that extend `FhirDomainResource`:

```typescript
import {
  FhirPatient,
  FhirObservation,
  FhirMedicationRequest,
  FhirAppointment,
} from '@stanfordspezi/spezi-firebase-fhir'

// Each resource has a parse method
const patient = FhirPatient.parse(rawData)

// Access the validated value
console.log(patient.value) // Typed FHIR Patient resource
```

### Helper Methods

The `FhirDomainResource` base class provides useful utilities:

- **`codes(concept, filter)`**: Extract code values from a CodeableConcept
- **`containsCoding(concept, filter)`**: Check if a CodeableConcept contains specific codings
- **`getExtension(url)`**: Retrieve extensions by URL

### Type Safety

All schemas provide full TypeScript type inference:

```typescript
import { type Patient } from 'fhir/r4b.js'

// The parsed value is fully typed
const patient = FhirPatient.parse(data)
const name: string | undefined = patient.value.name?.[0]?.family
```

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/spezi-firebase/tree/main/LICENSES) for more information.

## Contributors

This project is developed as part of the Stanford Mussallem Center for Biodesign at Stanford University.
See [CONTRIBUTORS.md](https://github.com/StanfordSpezi/spezi-firebase/tree/main/CONTRIBUTORS.md) for a full list of all Spezi Firebase contributors.

![Stanford Mussallem Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-light.png#gh-light-mode-only)
![Stanford Mussallem Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-dark.png#gh-dark-mode-only)
