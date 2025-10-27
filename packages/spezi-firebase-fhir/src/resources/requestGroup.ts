//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { RequestGroup } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedRequestGroupSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('RequestGroup').readonly(),
    })
    .passthrough(),
)

export const requestGroupSchema = untypedRequestGroupSchema

export class FhirRequestGroup extends FhirDomainResource<RequestGroup> {
  // Static Functions

  public static parse(value: unknown): FhirRequestGroup {
    const parsed = requestGroupSchema.parse(value)
    return new FhirRequestGroup(parsed as unknown as RequestGroup)
  }
}
