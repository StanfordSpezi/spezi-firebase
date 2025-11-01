//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type PaymentReconciliation } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  referenceSchema,
  stringSchema,
  moneySchema,
  dateTimeSchema,
  periodSchema,
  dateSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  remittanceOutcomeSchema,
  noteTypeSchema,
} from '../valueSets/index.js'

export const untypedPaymentReconciliationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PaymentReconciliation').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    period: periodSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    paymentIssuer: referenceSchema.optional(),
    request: referenceSchema.optional(),
    requestor: referenceSchema.optional(),
    outcome: remittanceOutcomeSchema.optional(),
    _outcome: elementSchema.optional(),
    disposition: stringSchema.optional(),
    _disposition: elementSchema.optional(),
    paymentDate: dateSchema,
    _paymentDate: elementSchema.optional(),
    paymentAmount: moneySchema,
    paymentIdentifier: identifierSchema.optional(),
    detail: backboneElementSchema
      .extend({
        identifier: identifierSchema.optional(),
        predecessor: identifierSchema.optional(),
        type: codeableConceptSchema,
        request: referenceSchema.optional(),
        submitter: referenceSchema.optional(),
        response: referenceSchema.optional(),
        date: dateSchema.optional(),
        _date: elementSchema.optional(),
        responsible: referenceSchema.optional(),
        payee: referenceSchema.optional(),
        amount: moneySchema.optional(),
      })
      .array()
      .optional(),
    formCode: codeableConceptSchema.optional(),
    processNote: backboneElementSchema
      .extend({
        type: noteTypeSchema.optional(),
        _type: elementSchema.optional(),
        text: stringSchema.optional(),
        _text: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<PaymentReconciliation>

export const paymentReconciliationSchema: ZodType<PaymentReconciliation> =
  untypedPaymentReconciliationSchema

export class FhirPaymentReconciliation extends FhirDomainResource<PaymentReconciliation> {
  public static parse(value: unknown): FhirPaymentReconciliation {
    return new FhirPaymentReconciliation(
      paymentReconciliationSchema.parse(value),
    )
  }
}
