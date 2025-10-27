//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type PaymentReconciliation } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedPaymentReconciliationSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('PaymentReconciliation').readonly(),
    })
    .passthrough(),
)

export const paymentReconciliationSchema = untypedPaymentReconciliationSchema

export class FhirPaymentReconciliation extends FhirDomainResource<PaymentReconciliation> {
  // Static Functions

  public static parse(value: unknown): FhirPaymentReconciliation {
    const parsed = paymentReconciliationSchema.parse(value)
    return new FhirPaymentReconciliation(
      parsed as unknown as PaymentReconciliation,
    )
  }
}
