//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CareTeam } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const careTeamStatusSchema = z.enum([
  'proposed',
  'active',
  'suspended',
  'inactive',
  'entered-in-error',
])

export const untypedCareTeamSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CareTeam').readonly(),
    identifier: identifierSchema.array().optional(),
    status: careTeamStatusSchema.optional(),
    _status: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    period: periodSchema.optional(),
    participant: backboneElementSchema
      .extend({
        role: codeableConceptSchema.array().optional(),
        member: referenceSchema.optional(),
        onBehalfOf: referenceSchema.optional(),
        period: periodSchema.optional(),
      })
      .array()
      .optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    managingOrganization: referenceSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<CareTeam>

export const careTeamSchema: ZodType<CareTeam> = untypedCareTeamSchema

export class FhirCareTeam extends FhirDomainResource<CareTeam> {
  // Static Functions

  public static parse(value: unknown): FhirCareTeam {
    return new FhirCareTeam(careTeamSchema.parse(value))
  }
}
