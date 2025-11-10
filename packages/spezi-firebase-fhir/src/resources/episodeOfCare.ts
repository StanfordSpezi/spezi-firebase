//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type EpisodeOfCareDiagnosis,
  type EpisodeOfCareStatusHistory,
  type EpisodeOfCare,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  identifierSchema,
  periodSchema,
  positiveIntSchema,
  referenceSchema,
} from '../elements/index.js'
import { episodeOfCareStatusSchema } from '../valueSets/index.js'

const episodeOfCareStatusHistorySchema: ZodType<EpisodeOfCareStatusHistory> =
  backboneElementSchema.extend({
    status: episodeOfCareStatusSchema,
    period: periodSchema,
  })

const episodeOfCareDiagnosisSchema: ZodType<EpisodeOfCareDiagnosis> =
  backboneElementSchema.extend({
    condition: referenceSchema,
    role: codeableConceptSchema.optional(),
    rank: positiveIntSchema.optional(),
  })

export const untypedEpisodeOfCareSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EpisodeOfCare').readonly(),
    identifier: identifierSchema.array().optional(),
    status: episodeOfCareStatusSchema,
    statusHistory: episodeOfCareStatusHistorySchema.array().optional(),
    type: codeableConceptSchema.array().optional(),
    diagnosis: episodeOfCareDiagnosisSchema.array().optional(),
    patient: referenceSchema,
    managingOrganization: referenceSchema.optional(),
    period: periodSchema.optional(),
    referralRequest: referenceSchema.array().optional(),
    careManager: referenceSchema.optional(),
    team: referenceSchema.array().optional(),
    account: referenceSchema.array().optional(),
  }),
) satisfies ZodType<EpisodeOfCare>

export const episodeOfCareSchema: ZodType<EpisodeOfCare> =
  untypedEpisodeOfCareSchema

export class FhirEpisodeOfCare extends FhirDomainResource<EpisodeOfCare> {
  // Static Functions

  public static parse(value: unknown): FhirEpisodeOfCare {
    return new FhirEpisodeOfCare(episodeOfCareSchema.parse(value))
  }
}
