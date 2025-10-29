//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ClaimResponse } from 'fhir/r4b.js'
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
  dateTimeSchema,
  moneySchema,
  decimalSchema,
  addressSchema,
  periodSchema,
  positiveIntSchema,
  quantitySchema,
  attachmentSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  remittanceOutcomeSchema,
} from '../valueSets/index.js'

const claimUseSchema = z.enum(['claim', 'preauthorization', 'predetermination'])

export const untypedClaimResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ClaimResponse').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema,
    subType: codeableConceptSchema.optional(),
    use: claimUseSchema,
    _use: elementSchema.optional(),
    patient: referenceSchema,
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    insurer: referenceSchema,
    requestor: referenceSchema.optional(),
    request: referenceSchema.optional(),
    outcome: remittanceOutcomeSchema,
    _outcome: elementSchema.optional(),
    disposition: stringSchema.optional(),
    _disposition: elementSchema.optional(),
    preAuthRef: stringSchema.optional(),
    _preAuthRef: elementSchema.optional(),
    preAuthPeriod: periodSchema.optional(),
    payeeType: codeableConceptSchema.optional(),
    item: backboneElementSchema
      .extend({
        itemSequence: positiveIntSchema,
        noteNumber: positiveIntSchema.array().optional(),
        adjudication: backboneElementSchema
          .extend({
            category: codeableConceptSchema,
            reason: codeableConceptSchema.optional(),
            amount: moneySchema.optional(),
            value: decimalSchema.optional(),
          })
          .array(),
        detail: backboneElementSchema
          .extend({
            detailSequence: positiveIntSchema,
            noteNumber: positiveIntSchema.array().optional(),
            adjudication: backboneElementSchema
              .extend({
                category: codeableConceptSchema,
                reason: codeableConceptSchema.optional(),
                amount: moneySchema.optional(),
                value: decimalSchema.optional(),
              })
              .array(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    addItem: backboneElementSchema
      .extend({
        itemSequence: positiveIntSchema.array().optional(),
        detailSequence: positiveIntSchema.array().optional(),
        subdetailSequence: positiveIntSchema.array().optional(),
        provider: referenceSchema.array().optional(),
        productOrService: codeableConceptSchema,
        modifier: codeableConceptSchema.array().optional(),
        programCode: codeableConceptSchema.array().optional(),
        servicedDate: z.string().optional(),
        _servicedDate: elementSchema.optional(),
        servicedPeriod: periodSchema.optional(),
        locationCodeableConcept: codeableConceptSchema.optional(),
        locationAddress: addressSchema.optional(),
        locationReference: referenceSchema.optional(),
        quantity: quantitySchema.optional(),
        unitPrice: moneySchema.optional(),
        factor: decimalSchema.optional(),
        net: moneySchema.optional(),
        bodySite: codeableConceptSchema.optional(),
        subSite: codeableConceptSchema.array().optional(),
        noteNumber: positiveIntSchema.array().optional(),
        adjudication: backboneElementSchema
          .extend({
            category: codeableConceptSchema,
            reason: codeableConceptSchema.optional(),
            amount: moneySchema.optional(),
            value: decimalSchema.optional(),
          })
          .array(),
        detail: backboneElementSchema
          .extend({
            productOrService: codeableConceptSchema,
            modifier: codeableConceptSchema.array().optional(),
            quantity: quantitySchema.optional(),
            unitPrice: moneySchema.optional(),
            factor: decimalSchema.optional(),
            net: moneySchema.optional(),
            noteNumber: positiveIntSchema.array().optional(),
            adjudication: backboneElementSchema
              .extend({
                category: codeableConceptSchema,
                reason: codeableConceptSchema.optional(),
                amount: moneySchema.optional(),
                value: decimalSchema.optional(),
              })
              .array(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    total: backboneElementSchema
      .extend({
        category: codeableConceptSchema,
        amount: moneySchema,
      })
      .array()
      .optional(),
    payment: backboneElementSchema
      .extend({
        type: codeableConceptSchema,
        adjustment: moneySchema.optional(),
        adjustmentReason: codeableConceptSchema.optional(),
        date: z.string().optional(),
        _date: elementSchema.optional(),
        amount: moneySchema,
        identifier: identifierSchema.optional(),
      })
      .optional(),
    fundsReserve: codeableConceptSchema.optional(),
    formCode: codeableConceptSchema.optional(),
    form: attachmentSchema.optional(),
    processNote: backboneElementSchema
      .extend({
        number: positiveIntSchema.optional(),
        type: z.enum(['display', 'print', 'printoper']).optional(),
        _type: elementSchema.optional(),
        text: stringSchema,
        _text: elementSchema.optional(),
        language: codeableConceptSchema.optional(),
      })
      .array()
      .optional(),
    communicationRequest: referenceSchema.array().optional(),
    insurance: backboneElementSchema
      .extend({
        sequence: positiveIntSchema,
        focal: z.boolean(),
        _focal: elementSchema.optional(),
        coverage: referenceSchema,
        businessArrangement: stringSchema.optional(),
        _businessArrangement: elementSchema.optional(),
        claimResponse: referenceSchema.optional(),
      })
      .array()
      .optional(),
    error: backboneElementSchema
      .extend({
        itemSequence: positiveIntSchema.optional(),
        detailSequence: positiveIntSchema.optional(),
        subDetailSequence: positiveIntSchema.optional(),
        code: codeableConceptSchema,
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<ClaimResponse>

export const claimResponseSchema: ZodType<ClaimResponse> =
  untypedClaimResponseSchema

export class FhirClaimResponse extends FhirDomainResource<ClaimResponse> {
  public static parse(value: unknown): FhirClaimResponse {
    return new FhirClaimResponse(claimResponseSchema.parse(value))
  }
}
