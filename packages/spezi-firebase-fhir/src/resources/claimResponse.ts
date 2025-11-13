//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ClaimResponseItem,
  type ClaimResponseItemAdjudication,
  type ClaimResponseItemDetail,
  type ClaimResponse,
  type Coding,
  type ClaimResponseAddItem,
  type ClaimResponseAddItemDetail,
  type ClaimResponseTotal,
  type ClaimResponsePayment,
  type ClaimResponseProcessNote,
  type ClaimResponseInsurance,
  type ClaimResponseError,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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
  booleanSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  remittanceOutcomeSchema,
  claimUseSchema,
  noteTypeSchema,
} from '../valueSets/index.js'

const claimResponseItemAdjudicationSchema: ZodType<ClaimResponseItemAdjudication> =
  backboneElementSchema.extend({
    category: codeableConceptSchema,
    reason: codeableConceptSchema.optional(),
    amount: moneySchema.optional(),
    value: decimalSchema.optional(),
  })

const claimResponseItemDetailSchema: ZodType<ClaimResponseItemDetail> =
  backboneElementSchema.extend({
    detailSequence: positiveIntSchema,
    noteNumber: positiveIntSchema.array().optional(),
    adjudication: claimResponseItemAdjudicationSchema.array(),
  })

const claimResponseItemSchema: ZodType<ClaimResponseItem> =
  backboneElementSchema.extend({
    itemSequence: positiveIntSchema,
    noteNumber: positiveIntSchema.array().optional(),
    adjudication: claimResponseItemAdjudicationSchema.array(),
    detail: claimResponseItemDetailSchema.array().optional(),
  })

const claimResponseAddItemDetailSchema: ZodType<ClaimResponseAddItemDetail> =
  backboneElementSchema.extend({
    productOrService: codeableConceptSchema,
    modifier: codeableConceptSchema.array().optional(),
    quantity: quantitySchema.optional(),
    unitPrice: moneySchema.optional(),
    factor: decimalSchema.optional(),
    net: moneySchema.optional(),
    noteNumber: positiveIntSchema.array().optional(),
    adjudication: claimResponseItemAdjudicationSchema.array(),
  })

const claimResponseAddItemSchema: ZodType<ClaimResponseAddItem> =
  backboneElementSchema.extend({
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
    adjudication: claimResponseItemAdjudicationSchema.array(),
    detail: claimResponseAddItemDetailSchema.array().optional(),
  })

const claimResponseTotalSchema: ZodType<ClaimResponseTotal> =
  backboneElementSchema.extend({
    category: codeableConceptSchema,
    amount: moneySchema,
  })

const claimResponsePaymentSchema: ZodType<ClaimResponsePayment> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    adjustment: moneySchema.optional(),
    adjustmentReason: codeableConceptSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    amount: moneySchema,
    identifier: identifierSchema.optional(),
  })

const claimResponseProcessNoteSchema: ZodType<ClaimResponseProcessNote> =
  backboneElementSchema.extend({
    number: positiveIntSchema.optional(),
    type: noteTypeSchema.optional(),
    _type: elementSchema.optional(),
    text: stringSchema,
    _text: elementSchema.optional(),
    language: codeableConceptSchema.optional(),
  })

const claimResponseInsuranceSchema: ZodType<ClaimResponseInsurance> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    focal: booleanSchema,
    _focal: elementSchema.optional(),
    coverage: referenceSchema,
    businessArrangement: stringSchema.optional(),
    _businessArrangement: elementSchema.optional(),
    claimResponse: referenceSchema.optional(),
  })

const claimResponseErrorSchema: ZodType<ClaimResponseError> =
  backboneElementSchema.extend({
    itemSequence: positiveIntSchema.optional(),
    detailSequence: positiveIntSchema.optional(),
    subDetailSequence: positiveIntSchema.optional(),
    code: codeableConceptSchema,
  })

/**
 * Zod schema for FHIR ClaimResponse resource (untyped version).
 */
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
    item: claimResponseItemSchema.array().optional(),
    addItem: claimResponseAddItemSchema.array().optional(),
    total: claimResponseTotalSchema.array().optional(),
    payment: claimResponsePaymentSchema.optional(),
    fundsReserve: codeableConceptSchema.optional(),
    formCode: codeableConceptSchema.optional(),
    form: attachmentSchema.optional(),
    processNote: claimResponseProcessNoteSchema.array().optional(),
    communicationRequest: referenceSchema.array().optional(),
    insurance: claimResponseInsuranceSchema.array().optional(),
    error: claimResponseErrorSchema.array().optional(),
  }),
) satisfies ZodType<ClaimResponse>

/**
 * Zod schema for FHIR ClaimResponse resource.
 */
export const claimResponseSchema: ZodType<ClaimResponse> =
  untypedClaimResponseSchema

/**
 * Wrapper class for FHIR ClaimResponse resources.
 * Provides utility methods for working with claim responses and adjudications.
 */
export class FhirClaimResponse extends FhirDomainResource<ClaimResponse> {
  // Static Functions

  /**
   * Parses a ClaimResponse resource from unknown data.
   *
   * @param value - The data to parse and validate against the ClaimResponse schema
   * @returns A FhirClaimResponse instance containing the validated resource
   */
  public static parse(value: unknown): FhirClaimResponse {
    return new FhirClaimResponse(claimResponseSchema.parse(value))
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
