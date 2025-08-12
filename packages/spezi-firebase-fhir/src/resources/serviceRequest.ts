//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import z, { type ZodType } from 'zod'
import { ServiceRequest } from 'fhir/r4b.js'
import {
  annotationSchema,
  booleanSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
  timingSchema,
} from '../elements/index.js'

export const serviceRequestPrioritySchema = z.enum([
  'routine',
  'urgent',
  'asap',
  'stat',
])

export const serviceRequestStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

export const serviceRequestIntentSchema = z.enum([
  'proposal',
  'plan',
  'directive',
  'order',
  'original-order',
  'reflex-order',
  'filler-order',
  'instance-order',
  'option',
])

export const untypedServiceRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ServiceRequest').readonly(),
    asNeededBoolean: booleanSchema.optional(),
    _asNeededBoolean: elementSchema.optional(),
    asNeededCodeableConcept: codeableConceptSchema.optional(),
    authoredOn: stringSchema.optional(),
    _authoredOn: elementSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    bodySite: codeableConceptSchema.array().optional(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    doNotPerform: booleanSchema.optional(),
    _doNotPerform: elementSchema.optional(),
    encounter: referenceSchema.optional(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: stringSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: stringSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    insurance: referenceSchema.array().optional(),
    intent: serviceRequestIntentSchema,
    _intent: elementSchema.optional(),
    locationCode: codeableConceptSchema.array().optional(),
    locationReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    occurrenceDateTime: stringSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    orderDetail: codeableConceptSchema.array().optional(),
    patientInstruction: stringSchema.optional(),
    _patientInstruction: elementSchema.optional(),
    performer: referenceSchema.array().optional(),
    performerType: codeableConceptSchema.optional(),
    priority: serviceRequestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    quantityQuantity: quantitySchema.optional(),
    quantityRatio: ratioSchema.optional(),
    quantityRange: rangeSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    relevantHistory: referenceSchema.array().optional(),
    replaces: referenceSchema.array().optional(),
    requester: referenceSchema.optional(),
    requisition: identifierSchema.optional(),
    specimen: referenceSchema.array().optional(),
    status: serviceRequestStatusSchema,
    _status: elementSchema.optional(),
    subject: referenceSchema,
    supportingInfo: referenceSchema.array().optional(),
  }),
) satisfies ZodType<ServiceRequest>

export const serviceRequestSchema: ZodType<ServiceRequest> =
  untypedServiceRequestSchema
