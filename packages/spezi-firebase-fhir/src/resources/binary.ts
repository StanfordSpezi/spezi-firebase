//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { Binary } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedBinarySchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Binary').readonly(),
    })
    .passthrough(),
)

export const binarySchema = untypedBinarySchema

export class FhirBinary extends FhirDomainResource<Binary> {
  // Static Functions

  public static parse(value: unknown): FhirBinary {
    const parsed = binarySchema.parse(value)
    return new FhirBinary(parsed as unknown as Binary)
  }
}
