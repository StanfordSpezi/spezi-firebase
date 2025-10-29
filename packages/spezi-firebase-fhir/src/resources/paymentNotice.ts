//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type PaymentNotice } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  elementSchema,
  codeableConceptSchema,
  referenceSchema,
  moneySchema,
  dateTimeSchema,
  dateSchema,
} from '../elements/index.js'
import { financialResourceStatusSchema } from '../valueSets/index.js'

export const untypedPaymentNoticeSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PaymentNotice').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    request: referenceSchema.optional(),
    response: referenceSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    provider: referenceSchema.optional(),
    payment: referenceSchema,
    paymentDate: dateSchema.optional(),
    _paymentDate: elementSchema.optional(),
    payee: referenceSchema.optional(),
    recipient: referenceSchema,
    amount: moneySchema,
    paymentStatus: codeableConceptSchema.optional(),
  }),
) satisfies ZodType<PaymentNotice>

export const paymentNoticeSchema: ZodType<PaymentNotice> =
  untypedPaymentNoticeSchema

export class FhirPaymentNotice extends FhirDomainResource<PaymentNotice> {
  public static parse(value: unknown): FhirPaymentNotice {
    return new FhirPaymentNotice(paymentNoticeSchema.parse(value))
  }
}
