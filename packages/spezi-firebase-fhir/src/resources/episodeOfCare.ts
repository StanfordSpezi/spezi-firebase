//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type EpisodeOfCare } from 'fhir/r4b.js'
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

export const untypedEpisodeOfCareSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EpisodeOfCare').readonly(),
    identifier: identifierSchema.array().optional(),
    status: episodeOfCareStatusSchema,
    statusHistory: backboneElementSchema
      .extend({
        status: episodeOfCareStatusSchema,
        period: periodSchema,
      })
      .array()
      .optional(),
    type: codeableConceptSchema.array().optional(),
    diagnosis: backboneElementSchema
      .extend({
        condition: referenceSchema,
        role: codeableConceptSchema.optional(),
        rank: positiveIntSchema.optional(),
      })
      .array()
      .optional(),
    patient: referenceSchema,
    managingOrganization: referenceSchema.optional(),
    period: periodSchema.optional(),
    referralRequest: referenceSchema.array().optional(),
    careManager: referenceSchema.optional(),
    team: referenceSchema.array().optional(),
    account: referenceSchema.array().optional(),
  }),
)

export const episodeOfCareSchema: ZodType<EpisodeOfCare> =
  untypedEpisodeOfCareSchema

export class FhirEpisodeOfCare extends FhirDomainResource<EpisodeOfCare> {
  // Static Functions

  public static parse(value: unknown): FhirEpisodeOfCare {
    return new FhirEpisodeOfCare(episodeOfCareSchema.parse(value))
  }
}
