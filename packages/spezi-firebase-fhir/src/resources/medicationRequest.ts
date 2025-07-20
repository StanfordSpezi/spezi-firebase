//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MedicationRequest } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  canonicalSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  dosageSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  unsignedIntSchema,
  uriSchema,
} from '../elements/index.js'

const medicationRequestStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'completed',
  'entered-in-error',
  'stopped',
  'unknown',
])
export type MedicationRequestStatus = z.infer<
  typeof medicationRequestStatusSchema
>

const medicationRequestIntentSchema = z.enum([
  'proposal',
  'plan',
  'order',
  'original-order',
  'reflex-order',
  'filler-order',
  'instance-order',
])
export type MedicationRequestIntent = z.infer<
  typeof medicationRequestIntentSchema
>

const medicationRequestPrioritySchema = z.enum([
  'routine',
  'urgent',
  'asap',
  'stat',
])
export type MedicationRequestPriority = z.infer<
  typeof medicationRequestPrioritySchema
>

export const medicationRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationRequest'),
    identifier: identifierSchema.array().optional(),
    status: medicationRequestStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    intent: medicationRequestIntentSchema,
    category: codeableConceptSchema.array().optional(),
    priority: medicationRequestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    doNotPerform: booleanSchema.optional(),
    _doNotPerform: elementSchema.optional(),
    medicationCodeableConcept: codeableConceptSchema.optional(),
    medicationReference: referenceSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    supportingInformation: referenceSchema.array().optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    requester: referenceSchema.optional(),
    performer: referenceSchema.optional(),
    performerType: codeableConceptSchema.optional(),
    recorder: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    courseOfTherapyType: codeableConceptSchema.optional(),
    insurance: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    dosageInstruction: dosageSchema.array().optional(),
    dispenseRequest: backboneElementSchema
      .extend({
        initialFill: backboneElementSchema
          .extend({
            quantity: quantitySchema.optional(),
            duration: quantitySchema.optional(),
          })
          .optional(),
        dispenseInterval: quantitySchema.optional(),
        validityPeriod: periodSchema.optional(),
        numberOfRepeatsAllowed: unsignedIntSchema.optional(),
        quantity: quantitySchema.optional(),
        expectedSupplyDuration: quantitySchema.optional(),
        performer: referenceSchema.optional(),
      })
      .optional(),
    substitution: backboneElementSchema
      .extend({
        allowedBoolean: booleanSchema.optional(),
        _allowedBoolean: elementSchema.optional(),
        allowedCodeableConcept: codeableConceptSchema.optional(),
      })
      .optional(),
    priorPrescription: referenceSchema.optional(),
    detectedIssue: referenceSchema.array().optional(),
    eventHistory: referenceSchema.array().optional(),
  }),
) satisfies ZodType<MedicationRequest>
