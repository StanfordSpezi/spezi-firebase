//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { PaymentNotice } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedPaymentNoticeSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('PaymentNotice').readonly(),
    })
    .passthrough(),
)

export const paymentNoticeSchema = untypedPaymentNoticeSchema

export class FhirPaymentNotice extends FhirDomainResource<PaymentNotice> {
  // Static Functions

  public static parse(value: unknown): FhirPaymentNotice {
    const parsed = paymentNoticeSchema.parse(value)
    return new FhirPaymentNotice(parsed as unknown as PaymentNotice)
  }
}
