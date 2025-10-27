//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CareTeam } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedCareTeamSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CareTeam').readonly(),
  }).passthrough(),
)

export const careTeamSchema = untypedCareTeamSchema

export class FhirCareTeam extends FhirDomainResource<CareTeam> {
  // Static Functions

  public static parse(value: unknown): FhirCareTeam {
    const parsed = careTeamSchema.parse(value)
    return new FhirCareTeam(parsed as unknown as CareTeam)
  }
}
