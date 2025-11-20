/**
 * FHIR Zod Schemas - Generated
 * 
 * Generated from @types/fhir R4B type definitions
 * Generated at: 2025-11-01T13:23:12.338Z
 * 
 * IMPORTANT: These are simplified schemas based on FHIR R4B types.
 * They provide basic structure and type validation but may not capture
 * all FHIR constraints such as:
 * - Choice types (value[x])
 * - Cardinality constraints (min/max occurrences)
 * - Value set bindings
 * - Reference type constraints
 * 
 * Use these as a starting point and enhance based on your requirements.
 */

import { z } from 'zod';

// ============================================================================
// FHIR Primitive Types
// ============================================================================

export const stringSchema = z.string();
export const booleanSchema = z.boolean();
export const integerSchema = z.number().int();
export const decimalSchema = z.number();
export const dateSchema = z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/);
export const dateTimeSchema = z.string();
export const timeSchema = z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/);
export const instantSchema = z.string();
export const uriSchema = z.string();
export const urlSchema = z.string();
export const canonicalSchema = z.string();
export const codeSchema = z.string();
export const oidSchema = z.string();
export const idSchema = z.string().regex(/^[A-Za-z0-9\-\.]{1,64}$/);
export const markdownSchema = z.string();
export const base64BinarySchema = z.string();
export const unsignedIntSchema = z.number().int().nonnegative();
export const positiveIntSchema = z.number().int().positive();

// ============================================================================
// FHIR Element (Base for all types)
// ============================================================================

export const elementSchema: z.ZodType<any> = z.lazy(() => z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
}).passthrough());

// ============================================================================
// FHIR Extension
// ============================================================================

export const extensionSchema: z.ZodType<any> = z.lazy(() => z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  url: z.string(),
  valueString: z.string().optional(),
  valueBoolean: z.boolean().optional(),
  valueInteger: z.number().optional(),
  valueDecimal: z.number().optional(),
  valueUri: z.string().optional(),
  valueUrl: z.string().optional(),
  valueCode: z.string().optional(),
  valueDateTime: z.string().optional(),
  // ... other value types can be added
}).passthrough());

// ============================================================================
// Core FHIR Data Types
// ============================================================================

export const codingSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  system: z.string().optional(),
  version: z.string().optional(),
  code: z.string().optional(),
  display: z.string().optional(),
  userSelected: z.boolean().optional(),
}).passthrough();

export const codeableConceptSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  coding: z.array(codingSchema).optional(),
  text: z.string().optional(),
}).passthrough();

export const identifierSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  use: z.enum(['usual', 'official', 'temp', 'secondary', 'old']).optional(),
  type: codeableConceptSchema.optional(),
  system: z.string().optional(),
  value: z.string().optional(),
  period: z.lazy(() => periodSchema).optional(),
  assigner: z.lazy(() => referenceSchema).optional(),
}).passthrough();

export const periodSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  start: dateTimeSchema.optional(),
  end: dateTimeSchema.optional(),
}).passthrough();

export const quantitySchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  value: z.number().optional(),
  comparator: z.enum(['<', '<=', '>=', '>']).optional(),
  unit: z.string().optional(),
  system: z.string().optional(),
  code: z.string().optional(),
}).passthrough();

export const rangeSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  low: quantitySchema.optional(),
  high: quantitySchema.optional(),
}).passthrough();

export const ratioSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  numerator: quantitySchema.optional(),
  denominator: quantitySchema.optional(),
}).passthrough();

export const referenceSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  reference: z.string().optional(),
  type: z.string().optional(),
  identifier: identifierSchema.optional(),
  display: z.string().optional(),
}).passthrough();

export const humanNameSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  use: z.enum(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden']).optional(),
  text: z.string().optional(),
  family: z.string().optional(),
  given: z.array(z.string()).optional(),
  prefix: z.array(z.string()).optional(),
  suffix: z.array(z.string()).optional(),
  period: periodSchema.optional(),
}).passthrough();

export const addressSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  use: z.enum(['home', 'work', 'temp', 'old', 'billing']).optional(),
  type: z.enum(['postal', 'physical', 'both']).optional(),
  text: z.string().optional(),
  line: z.array(z.string()).optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  period: periodSchema.optional(),
}).passthrough();

export const contactPointSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  system: z.enum(['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other']).optional(),
  value: z.string().optional(),
  use: z.enum(['home', 'work', 'temp', 'old', 'mobile']).optional(),
  rank: z.number().int().positive().optional(),
  period: periodSchema.optional(),
}).passthrough();

export const attachmentSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  contentType: z.string().optional(),
  language: z.string().optional(),
  data: z.string().optional(),
  url: z.string().optional(),
  size: z.number().int().optional(),
  hash: z.string().optional(),
  title: z.string().optional(),
  creation: dateTimeSchema.optional(),
}).passthrough();

export const annotationSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  authorReference: referenceSchema.optional(),
  authorString: z.string().optional(),
  time: dateTimeSchema.optional(),
  text: z.string(),
}).passthrough();

export const timingSchema = z.object({
  id: z.string().optional(),
  extension: z.array(extensionSchema).optional(),
  event: z.array(dateTimeSchema).optional(),
  repeat: z.object({
    boundsDuration: quantitySchema.optional(),
    boundsRange: rangeSchema.optional(),
    boundsPeriod: periodSchema.optional(),
    count: z.number().int().optional(),
    countMax: z.number().int().optional(),
    duration: z.number().optional(),
    durationMax: z.number().optional(),
    durationUnit: z.enum(['s', 'min', 'h', 'd', 'wk', 'mo', 'a']).optional(),
    frequency: z.number().int().optional(),
    frequencyMax: z.number().int().optional(),
    period: z.number().optional(),
    periodMax: z.number().optional(),
    periodUnit: z.enum(['s', 'min', 'h', 'd', 'wk', 'mo', 'a']).optional(),
  }).optional(),
  code: codeableConceptSchema.optional(),
}).passthrough();

// ============================================================================
// FHIR Resource Base
// ============================================================================

const resourceBaseSchema = z.object({
  id: z.string().optional(),
  meta: z.object({
    versionId: z.string().optional(),
    lastUpdated: instantSchema.optional(),
    source: z.string().optional(),
    profile: z.array(canonicalSchema).optional(),
    security: z.array(codingSchema).optional(),
    tag: z.array(codingSchema).optional(),
  }).optional(),
  implicitRules: z.string().optional(),
  language: z.string().optional(),
}).passthrough();

const domainResourceBase = resourceBaseSchema.extend({
  text: z.object({
    status: z.enum(['generated', 'extensions', 'additional', 'empty']),
    div: z.string(),
  }).optional(),
  contained: z.array(z.any()).optional(),
  extension: z.array(extensionSchema).optional(),
  modifierExtension: z.array(extensionSchema).optional(),
}).passthrough();

// ============================================================================
// FHIR Resource Schemas
// ============================================================================

export const PatientSchema = domainResourceBase.extend({
  resourceType: z.literal('Patient'),
  identifier: z.array(identifierSchema).optional(),
  active: z.boolean().optional(),
  name: z.array(humanNameSchema).optional(),
  telecom: z.array(contactPointSchema).optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  birthDate: dateSchema.optional(),
  deceasedBoolean: z.boolean().optional(),
  deceasedDateTime: dateTimeSchema.optional(),
  address: z.array(addressSchema).optional(),
  maritalStatus: codeableConceptSchema.optional(),
  multipleBirthBoolean: z.boolean().optional(),
  multipleBirthInteger: z.number().int().optional(),
  photo: z.array(attachmentSchema).optional(),
  contact: z.array(z.object({
    relationship: z.array(codeableConceptSchema).optional(),
    name: humanNameSchema.optional(),
    telecom: z.array(contactPointSchema).optional(),
    address: addressSchema.optional(),
    gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
    organization: referenceSchema.optional(),
    period: periodSchema.optional(),
  })).optional(),
  communication: z.array(z.object({
    language: codeableConceptSchema,
    preferred: z.boolean().optional(),
  })).optional(),
  generalPractitioner: z.array(referenceSchema).optional(),
  managingOrganization: referenceSchema.optional(),
  link: z.array(z.object({
    other: referenceSchema,
    type: z.enum(['replaced-by', 'replaces', 'refer', 'seealso']),
  })).optional(),
}).passthrough();

export const ObservationSchema = domainResourceBase.extend({
  resourceType: z.literal('Observation'),
  identifier: z.array(identifierSchema).optional(),
  basedOn: z.array(referenceSchema).optional(),
  partOf: z.array(referenceSchema).optional(),
  status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
  category: z.array(codeableConceptSchema).optional(),
  code: codeableConceptSchema,
  subject: referenceSchema.optional(),
  focus: z.array(referenceSchema).optional(),
  encounter: referenceSchema.optional(),
  effectiveDateTime: dateTimeSchema.optional(),
  effectivePeriod: periodSchema.optional(),
  effectiveTiming: timingSchema.optional(),
  effectiveInstant: instantSchema.optional(),
  issued: instantSchema.optional(),
  performer: z.array(referenceSchema).optional(),
  valueQuantity: quantitySchema.optional(),
  valueCodeableConcept: codeableConceptSchema.optional(),
  valueString: z.string().optional(),
  valueBoolean: z.boolean().optional(),
  valueInteger: z.number().int().optional(),
  valueRange: rangeSchema.optional(),
  valueRatio: ratioSchema.optional(),
  valueTime: timeSchema.optional(),
  valueDateTime: dateTimeSchema.optional(),
  valuePeriod: periodSchema.optional(),
  dataAbsentReason: codeableConceptSchema.optional(),
  interpretation: z.array(codeableConceptSchema).optional(),
  note: z.array(annotationSchema).optional(),
  bodySite: codeableConceptSchema.optional(),
  method: codeableConceptSchema.optional(),
  specimen: referenceSchema.optional(),
  device: referenceSchema.optional(),
  referenceRange: z.array(z.object({
    low: quantitySchema.optional(),
    high: quantitySchema.optional(),
    type: codeableConceptSchema.optional(),
    appliesTo: z.array(codeableConceptSchema).optional(),
    age: rangeSchema.optional(),
    text: z.string().optional(),
  })).optional(),
  hasMember: z.array(referenceSchema).optional(),
  derivedFrom: z.array(referenceSchema).optional(),
  component: z.array(z.object({
    code: codeableConceptSchema,
    valueQuantity: quantitySchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueString: z.string().optional(),
    valueBoolean: z.boolean().optional(),
    valueInteger: z.number().int().optional(),
    valueRange: rangeSchema.optional(),
    valueRatio: ratioSchema.optional(),
    valueTime: timeSchema.optional(),
    valueDateTime: dateTimeSchema.optional(),
    valuePeriod: periodSchema.optional(),
    dataAbsentReason: codeableConceptSchema.optional(),
    interpretation: z.array(codeableConceptSchema).optional(),
    referenceRange: z.array(z.object({
      low: quantitySchema.optional(),
      high: quantitySchema.optional(),
      type: codeableConceptSchema.optional(),
      appliesTo: z.array(codeableConceptSchema).optional(),
      age: rangeSchema.optional(),
      text: z.string().optional(),
    })).optional(),
  })).optional(),
}).passthrough();

export const PractitionerSchema = domainResourceBase.extend({
  resourceType: z.literal('Practitioner'),
  identifier: z.array(identifierSchema).optional(),
  active: z.boolean().optional(),
  name: z.array(humanNameSchema).optional(),
  telecom: z.array(contactPointSchema).optional(),
  address: z.array(addressSchema).optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  birthDate: dateSchema.optional(),
  photo: z.array(attachmentSchema).optional(),
  qualification: z.array(z.object({
    identifier: z.array(identifierSchema).optional(),
    code: codeableConceptSchema,
    period: periodSchema.optional(),
    issuer: referenceSchema.optional(),
  })).optional(),
  communication: z.array(codeableConceptSchema).optional(),
}).passthrough();

export const MedicationSchema = domainResourceBase.extend({
  resourceType: z.literal('Medication'),
  identifier: z.array(identifierSchema).optional(),
  code: codeableConceptSchema.optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error']).optional(),
  manufacturer: referenceSchema.optional(),
  form: codeableConceptSchema.optional(),
  amount: ratioSchema.optional(),
  ingredient: z.array(z.object({
    itemCodeableConcept: codeableConceptSchema.optional(),
    itemReference: referenceSchema.optional(),
    isActive: z.boolean().optional(),
    strength: ratioSchema.optional(),
  })).optional(),
  batch: z.object({
    lotNumber: z.string().optional(),
    expirationDate: dateTimeSchema.optional(),
  }).optional(),
}).passthrough();

export const OrganizationSchema = domainResourceBase.extend({
  resourceType: z.literal('Organ ization'),
  identifier: z.array(identifierSchema).optional(),
  active: z.boolean().optional(),
  type: z.array(codeableConceptSchema).optional(),
  name: z.string().optional(),
  alias: z.array(z.string()).optional(),
  telecom: z.array(contactPointSchema).optional(),
  address: z.array(addressSchema).optional(),
  partOf: referenceSchema.optional(),
  contact: z.array(z.object({
    purpose: codeableConceptSchema.optional(),
    name: humanNameSchema.optional(),
    telecom: z.array(contactPointSchema).optional(),
    address: addressSchema.optional(),
  })).optional(),
  endpoint: z.array(referenceSchema).optional(),
}).passthrough();

export const LocationSchema = domainResourceBase.extend({
  resourceType: z.literal('Location'),
  identifier: z.array(identifierSchema).optional(),
  status: z.enum(['active', 'suspended', 'inactive']).optional(),
  operationalStatus: codingSchema.optional(),
  name: z.string().optional(),
  alias: z.array(z.string()).optional(),
  description: z.string().optional(),
  mode: z.enum(['instance', 'kind']).optional(),
  type: z.array(codeableConceptSchema).optional(),
  telecom: z.array(contactPointSchema).optional(),
  address: addressSchema.optional(),
  physicalType: codeableConceptSchema.optional(),
  position: z.object({
    longitude: z.number(),
    latitude: z.number(),
    altitude: z.number().optional(),
  }).optional(),
  managingOrganization: referenceSchema.optional(),
  partOf: referenceSchema.optional(),
  hoursOfOperation: z.array(z.object({
    daysOfWeek: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])).optional(),
    allDay: z.boolean().optional(),
    openingTime: timeSchema.optional(),
    closingTime: timeSchema.optional(),
  })).optional(),
  availabilityExceptions: z.string().optional(),
  endpoint: z.array(referenceSchema).optional(),
}).passthrough();

// ============================================================================
// Type Inference Helpers
// ============================================================================

export type Patient = z.infer<typeof PatientSchema>;
export type Observation = z.infer<typeof ObservationSchema>;
export type Practitioner = z.infer<typeof PractitionerSchema>;
export type Medication = z.infer<typeof MedicationSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type Location = z.infer<typeof LocationSchema>;
