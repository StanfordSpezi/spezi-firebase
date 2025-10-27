//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { ChargeItemDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedChargeItemDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ChargeItemDefinition').readonly(),
    })
    .passthrough(),
)

export const chargeItemDefinitionSchema = untypedChargeItemDefinitionSchema

export class FhirChargeItemDefinition extends FhirDomainResource<ChargeItemDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirChargeItemDefinition {
    const parsed = chargeItemDefinitionSchema.parse(value)
    return new FhirChargeItemDefinition(
      parsed as unknown as ChargeItemDefinition,
    )
  }
}
