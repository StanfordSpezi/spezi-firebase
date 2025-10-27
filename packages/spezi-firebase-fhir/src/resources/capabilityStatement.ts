//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type CapabilityStatement } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedCapabilityStatementSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('CapabilityStatement').readonly(),
    })
    .passthrough(),
)

export const capabilityStatementSchema = untypedCapabilityStatementSchema

export class FhirCapabilityStatement extends FhirDomainResource<CapabilityStatement> {
  // Static Functions

  public static parse(value: unknown): FhirCapabilityStatement {
    const parsed = capabilityStatementSchema.parse(value)
    return new FhirCapabilityStatement(parsed as unknown as CapabilityStatement)
  }
}
