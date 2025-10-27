//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type ChargeItem } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedChargeItemSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ChargeItem').readonly(),
    })
    .passthrough(),
)

export const chargeItemSchema = untypedChargeItemSchema

export class FhirChargeItem extends FhirDomainResource<ChargeItem> {
  // Static Functions

  public static parse(value: unknown): FhirChargeItem {
    const parsed = chargeItemSchema.parse(value)
    return new FhirChargeItem(parsed as unknown as ChargeItem)
  }
}
