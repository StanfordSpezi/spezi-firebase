//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Encounter } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import {
  backboneElementSchema,
  codeableConceptSchema,
  codingSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
} from '../elements/index.js'

export const encounterStatusSchema = z.enum([
  'planned',
  'arrived',
  'triaged',
  'in-progress',
  'onleave',
  'finished',
  'cancelled',
  'entered-in-error',
  'unknown',
])

export const encounterClassHistorySchema = z.lazy(() =>
  backboneElementSchema.extend({
    class: codingSchema,
    period: periodSchema,
  }),
)

export const encounterDiagnosisSchema = z.lazy(() =>
  backboneElementSchema.extend({
    condition: referenceSchema,
    use: codeableConceptSchema.optional(),
    rank: intSchema.optional(),
  }),
)

export const encounterHospitalizationSchema = z.lazy(() =>
  backboneElementSchema.extend({
    preAdmissionIdentifier: identifierSchema.optional(),
    origin: referenceSchema.optional(),
    admitSource: codeableConceptSchema.optional(),
    reAdmission: codeableConceptSchema.optional(),
    dietPreference: codeableConceptSchema.array().optional(),
    specialCourtesy: codeableConceptSchema.array().optional(),
    specialArrangement: codeableConceptSchema.array().optional(),
    destination: referenceSchema.optional(),
    dischargeDisposition: codeableConceptSchema.optional(),
  }),
)

export const encounterLocationSchema = z.lazy(() =>
  backboneElementSchema.extend({
    location: referenceSchema,
    status: z.enum(['planned', 'active', 'reserved', 'completed']).optional(),
    _status: elementSchema.optional(),
    physicalType: codeableConceptSchema.optional(),
    period: periodSchema.optional(),
  }),
)

export const encounterParticipantSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema.array().optional(),
    period: periodSchema.optional(),
    individual: referenceSchema.optional(),
  }),
)

export const encounterStatusHistorySchema = z.lazy(() =>
  backboneElementSchema.extend({
    status: encounterStatusSchema,
    period: periodSchema,
  }),
)

export const untypedEncounterSchema = z.lazy(
  () =>
    domainResourceSchema.extend({
      resourceType: z.literal('Encounter').readonly(),
      account: referenceSchema.array().optional(),
      appointment: referenceSchema.array().optional(),
      basedOn: referenceSchema.array().optional(),
      class: codingSchema,
      classHistory: encounterClassHistorySchema.array().optional(),
      diagnosis: encounterDiagnosisSchema.array().optional(),
      episodeOfCare: referenceSchema.array().optional(),
      hospitalization: encounterHospitalizationSchema.optional(),
      identifier: identifierSchema.array().optional(),
      length: quantitySchema.optional(),
      location: encounterLocationSchema.array().optional(),
      participant: encounterParticipantSchema.array().optional(),
      partOf: referenceSchema.optional(),
      period: periodSchema.optional(),
      priority: codeableConceptSchema.optional(),
      reasonReference: referenceSchema.array().optional(),
      serviceProvider: referenceSchema.optional(),
      status: encounterStatusSchema,
      _status: elementSchema.optional(),
      statusHistory: encounterStatusHistorySchema.array().optional(),
      subject: referenceSchema.optional(),
      type: codeableConceptSchema.array().optional(),
    }) satisfies ZodType<Encounter>,
)

export const encounterSchema: ZodType<Encounter> = untypedEncounterSchema
