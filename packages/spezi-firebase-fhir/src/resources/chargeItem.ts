//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ChargeItem } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  moneySchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
  timingSchema,
  uriSchema,
} from '../elements/index.js'

const chargeItemStatusSchema = z.enum([
  'planned',
  'billable',
  'not-billable',
  'aborted',
  'billed',
  'entered-in-error',
  'unknown',
])

export const untypedChargeItemSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ChargeItem').readonly(),
    identifier: identifierSchema.array().optional(),
    definitionUri: uriSchema.array().optional(),
    _definitionUri: elementSchema.array().optional(),
    definitionCanonical: stringSchema.array().optional(),
    _definitionCanonical: elementSchema.array().optional(),
    status: chargeItemStatusSchema,
    _status: elementSchema.optional(),
    partOf: referenceSchema.array().optional(),
    code: codeableConceptSchema,
    subject: referenceSchema,
    context: referenceSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    performer: backboneElementSchema
      .extend({
        function: codeableConceptSchema.optional(),
        actor: referenceSchema,
      })
      .array()
      .optional(),
    performingOrganization: referenceSchema.optional(),
    requestingOrganization: referenceSchema.optional(),
    costCenter: referenceSchema.optional(),
    quantity: quantitySchema.optional(),
    bodysite: codeableConceptSchema.array().optional(),
    factorOverride: decimalSchema.optional(),
    priceOverride: moneySchema.optional(),
    overrideReason: stringSchema.optional(),
    _overrideReason: elementSchema.optional(),
    enterer: referenceSchema.optional(),
    enteredDate: dateTimeSchema.optional(),
    _enteredDate: elementSchema.optional(),
    reason: codeableConceptSchema.array().optional(),
    service: referenceSchema.array().optional(),
    productReference: referenceSchema.optional(),
    productCodeableConcept: codeableConceptSchema.optional(),
    account: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    supportingInformation: referenceSchema.array().optional(),
  }),
) satisfies ZodType<ChargeItem>

export const chargeItemSchema: ZodType<ChargeItem> = untypedChargeItemSchema

export class FhirChargeItem extends FhirDomainResource<ChargeItem> {
  public static parse(value: unknown): FhirChargeItem {
    return new FhirChargeItem(chargeItemSchema.parse(value))
  }
}
