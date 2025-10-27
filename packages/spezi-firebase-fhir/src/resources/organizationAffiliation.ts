//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type OrganizationAffiliation } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedOrganizationAffiliationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('OrganizationAffiliation').readonly(),
  }).passthrough(),
)

export const organizationAffiliationSchema = untypedOrganizationAffiliationSchema

export class FhirOrganizationAffiliation extends FhirDomainResource<OrganizationAffiliation> {
  // Static Functions

  public static parse(value: unknown): FhirOrganizationAffiliation {
    const parsed = organizationAffiliationSchema.parse(value)
    return new FhirOrganizationAffiliation(parsed as unknown as OrganizationAffiliation)
  }
}
