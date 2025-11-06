//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Invoice } from 'fhir/r4b.js'
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
  annotationSchema,
  moneySchema,
  decimalSchema,
  dateTimeSchema,
  positiveIntSchema,
} from '../elements/index.js'
import {
  invoiceStatusSchema,
  priceComponentTypeSchema,
} from '../valueSets/index.js'

export const untypedInvoiceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Invoice').readonly(),
    identifier: identifierSchema.array().optional(),
    status: invoiceStatusSchema,
    _status: elementSchema.optional(),
    cancelledReason: stringSchema.optional(),
    _cancelledReason: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    recipient: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    participant: backboneElementSchema
      .extend({
        role: codeableConceptSchema.optional(),
        actor: referenceSchema,
      })
      .array()
      .optional(),
    issuer: referenceSchema.optional(),
    account: referenceSchema.optional(),
    lineItem: backboneElementSchema
      .extend({
        sequence: positiveIntSchema.optional(),
        chargeItemReference: referenceSchema.optional(),
        chargeItemCodeableConcept: codeableConceptSchema.optional(),
        priceComponent: backboneElementSchema
          .extend({
            type: priceComponentTypeSchema,
            _type: elementSchema.optional(),
            code: codeableConceptSchema.optional(),
            factor: decimalSchema.optional(),
            amount: moneySchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    totalPriceComponent: backboneElementSchema
      .extend({
        type: priceComponentTypeSchema,
        _type: elementSchema.optional(),
        code: codeableConceptSchema.optional(),
        factor: decimalSchema.optional(),
        amount: moneySchema.optional(),
      })
      .array()
      .optional(),
    totalNet: moneySchema.optional(),
    totalGross: moneySchema.optional(),
    paymentTerms: stringSchema.optional(),
    _paymentTerms: elementSchema.optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<Invoice>

export const invoiceSchema: ZodType<Invoice> = untypedInvoiceSchema

export class FhirInvoice extends FhirDomainResource<Invoice> {
  // Static Functions

  public static parse(value: unknown): FhirInvoice {
    return new FhirInvoice(invoiceSchema.parse(value))
  }
}
