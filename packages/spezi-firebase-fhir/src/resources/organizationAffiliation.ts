//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type OrganizationAffiliation } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'

export const untypedOrganizationAffiliationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('OrganizationAffiliation').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    period: periodSchema.optional(),
    organization: referenceSchema.optional(),
    participatingOrganization: referenceSchema.optional(),
    network: referenceSchema.array().optional(),
    code: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    location: referenceSchema.array().optional(),
    healthcareService: referenceSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    endpoint: referenceSchema.array().optional(),
  }),
) satisfies ZodType<OrganizationAffiliation>

export const organizationAffiliationSchema: ZodType<OrganizationAffiliation> =
  untypedOrganizationAffiliationSchema

export class FhirOrganizationAffiliation extends FhirDomainResource<OrganizationAffiliation> {
  // Static Functions

  public static parse(value: unknown): FhirOrganizationAffiliation {
    return new FhirOrganizationAffiliation(
      organizationAffiliationSchema.parse(value),
    )
  }
}
