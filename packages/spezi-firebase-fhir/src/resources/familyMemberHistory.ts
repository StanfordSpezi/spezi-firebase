//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type FamilyMemberHistory } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedFamilyMemberHistorySchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('FamilyMemberHistory').readonly(),
    })
    .passthrough(),
)

export const familyMemberHistorySchema = untypedFamilyMemberHistorySchema

export class FhirFamilyMemberHistory extends FhirDomainResource<FamilyMemberHistory> {
  // Static Functions

  public static parse(value: unknown): FhirFamilyMemberHistory {
    const parsed = familyMemberHistorySchema.parse(value)
    return new FhirFamilyMemberHistory(parsed as unknown as FamilyMemberHistory)
  }
}
