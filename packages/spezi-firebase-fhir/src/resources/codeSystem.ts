//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type CodeSystem } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedCodeSystemSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('CodeSystem').readonly(),
    })
    .passthrough(),
)

export const codeSystemSchema = untypedCodeSystemSchema

export class FhirCodeSystem extends FhirDomainResource<CodeSystem> {
  // Static Functions

  public static parse(value: unknown): FhirCodeSystem {
    const parsed = codeSystemSchema.parse(value)
    return new FhirCodeSystem(parsed as unknown as CodeSystem)
  }
}
