//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CarePlan } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  canonicalSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
  timingSchema,
  uriSchema,
} from '../elements/index.js'

const carePlanStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

const carePlanIntentSchema = z.enum(['proposal', 'plan', 'order', 'option'])

const carePlanActivityKindSchema = z.enum([
  'Appointment',
  'CommunicationRequest',
  'DeviceRequest',
  'MedicationRequest',
  'NutritionOrder',
  'Task',
  'ServiceRequest',
  'VisionPrescription',
])

const carePlanActivityStatusSchema = z.enum([
  'not-started',
  'scheduled',
  'in-progress',
  'on-hold',
  'completed',
  'cancelled',
  'stopped',
  'unknown',
  'entered-in-error',
])

export const untypedCarePlanSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CarePlan').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    replaces: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: carePlanStatusSchema,
    _status: elementSchema.optional(),
    intent: carePlanIntentSchema,
    _intent: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    period: periodSchema.optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    author: referenceSchema.optional(),
    contributor: referenceSchema.array().optional(),
    careTeam: referenceSchema.array().optional(),
    addresses: referenceSchema.array().optional(),
    supportingInfo: referenceSchema.array().optional(),
    goal: referenceSchema.array().optional(),
    activity: backboneElementSchema
      .extend({
        outcomeCodeableConcept: codeableConceptSchema.array().optional(),
        outcomeReference: referenceSchema.array().optional(),
        progress: annotationSchema.array().optional(),
        reference: referenceSchema.optional(),
        detail: backboneElementSchema
          .extend({
            kind: carePlanActivityKindSchema.optional(),
            _kind: elementSchema.optional(),
            instantiatesCanonical: canonicalSchema.array().optional(),
            _instantiatesCanonical: elementSchema.array().optional(),
            instantiatesUri: uriSchema.array().optional(),
            _instantiatesUri: elementSchema.array().optional(),
            code: codeableConceptSchema.optional(),
            reasonCode: codeableConceptSchema.array().optional(),
            reasonReference: referenceSchema.array().optional(),
            goal: referenceSchema.array().optional(),
            status: carePlanActivityStatusSchema,
            _status: elementSchema.optional(),
            statusReason: codeableConceptSchema.optional(),
            doNotPerform: booleanSchema.optional(),
            _doNotPerform: elementSchema.optional(),
            scheduledTiming: timingSchema.optional(),
            scheduledPeriod: periodSchema.optional(),
            scheduledString: stringSchema.optional(),
            _scheduledString: elementSchema.optional(),
            location: referenceSchema.optional(),
            performer: referenceSchema.array().optional(),
            productCodeableConcept: codeableConceptSchema.optional(),
            productReference: referenceSchema.optional(),
            dailyAmount: quantitySchema.optional(),
            quantity: quantitySchema.optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
          })
          .optional(),
      })
      .array()
      .optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<CarePlan>

export const carePlanSchema: ZodType<CarePlan> = untypedCarePlanSchema

export class FhirCarePlan extends FhirDomainResource<CarePlan> {
  // Static Functions

  public static parse(value: unknown): FhirCarePlan {
    return new FhirCarePlan(carePlanSchema.parse(value))
  }
}
