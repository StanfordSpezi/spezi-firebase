//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { Linkage } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedLinkageSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Linkage').readonly(),
    })
    .passthrough(),
)

export const linkageSchema = untypedLinkageSchema

export class FhirLinkage extends FhirDomainResource<Linkage> {
  // Static Functions

  public static parse(value: unknown): FhirLinkage {
    const parsed = linkageSchema.parse(value)
    return new FhirLinkage(parsed as unknown as Linkage)
  }
}
