//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Claim } from 'fhir/r4b.js'
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
  periodSchema,
  dateTimeSchema,
  moneySchema,
  quantitySchema,
  decimalSchema,
  addressSchema,
  booleanSchema,
  positiveIntSchema,
  dateSchema,
  attachmentSchema,
} from '../elements/index.js'
import { financialResourceStatusSchema, claimUseSchema } from '../valueSets/index.js'

export const untypedClaimSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Claim').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema,
    subType: codeableConceptSchema.optional(),
    use: claimUseSchema,
    _use: elementSchema.optional(),
    patient: referenceSchema,
    billablePeriod: periodSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    enterer: referenceSchema.optional(),
    insurer: referenceSchema.optional(),
    provider: referenceSchema,
    priority: codeableConceptSchema,
    fundsReserve: codeableConceptSchema.optional(),
    related: backboneElementSchema
      .extend({
        claim: referenceSchema.optional(),
        relationship: codeableConceptSchema.optional(),
        reference: identifierSchema.optional(),
      })
      .array()
      .optional(),
    prescription: referenceSchema.optional(),
    originalPrescription: referenceSchema.optional(),
    payee: backboneElementSchema
      .extend({
        type: codeableConceptSchema,
        party: referenceSchema.optional(),
      })
      .optional(),
    referral: referenceSchema.optional(),
    facility: referenceSchema.optional(),
    careTeam: backboneElementSchema
      .extend({
        sequence: positiveIntSchema,
        provider: referenceSchema,
        responsible: booleanSchema.optional(),
        _responsible: elementSchema.optional(),
        role: codeableConceptSchema.optional(),
        qualification: codeableConceptSchema.optional(),
      })
      .array()
      .optional(),
    supportingInfo: backboneElementSchema
      .extend({
        sequence: positiveIntSchema,
        category: codeableConceptSchema,
        code: codeableConceptSchema.optional(),
        timingDate: dateSchema.optional(),
        _timingDate: elementSchema.optional(),
        timingPeriod: periodSchema.optional(),
        valueBoolean: booleanSchema.optional(),
        _valueBoolean: elementSchema.optional(),
        valueString: stringSchema.optional(),
        _valueString: elementSchema.optional(),
        valueQuantity: quantitySchema.optional(),
        valueAttachment: attachmentSchema.optional(),
        valueReference: referenceSchema.optional(),
        reason: codeableConceptSchema.optional(),
      })
      .array()
      .optional(),
    diagnosis: backboneElementSchema
      .extend({
        sequence: positiveIntSchema,
        diagnosisCodeableConcept: codeableConceptSchema.optional(),
        diagnosisReference: referenceSchema.optional(),
        type: codeableConceptSchema.array().optional(),
        onAdmission: codeableConceptSchema.optional(),
        packageCode: codeableConceptSchema.optional(),
      })
      .array()
      .optional(),
    procedure: backboneElementSchema
      .extend({
        sequence: positiveIntSchema,
        type: codeableConceptSchema.array().optional(),
        date: dateTimeSchema.optional(),
        _date: elementSchema.optional(),
        procedureCodeableConcept: codeableConceptSchema.optional(),
        procedureReference: referenceSchema.optional(),
        udi: referenceSchema.array().optional(),
      })
      .array()
      .optional(),
    insurance: backboneElementSchema
      .extend({
        sequence: positiveIntSchema,
        focal: booleanSchema,
        _focal: elementSchema.optional(),
        identifier: identifierSchema.optional(),
        coverage: referenceSchema,
        businessArrangement: stringSchema.optional(),
        _businessArrangement: elementSchema.optional(),
        preAuthRef: stringSchema.array().optional(),
        _preAuthRef: elementSchema.array().optional(),
        claimResponse: referenceSchema.optional(),
      })
      .array(),
    accident: backboneElementSchema
      .extend({
        date: dateSchema,
        _date: elementSchema.optional(),
        type: codeableConceptSchema.optional(),
        locationAddress: addressSchema.optional(),
        locationReference: referenceSchema.optional(),
      })
      .optional(),
    item: backboneElementSchema
      .extend({
        sequence: positiveIntSchema,
        careTeamSequence: positiveIntSchema.array().optional(),
        diagnosisSequence: positiveIntSchema.array().optional(),
        procedureSequence: positiveIntSchema.array().optional(),
        informationSequence: positiveIntSchema.array().optional(),
        revenue: codeableConceptSchema.optional(),
        category: codeableConceptSchema.optional(),
        productOrService: codeableConceptSchema,
        modifier: codeableConceptSchema.array().optional(),
        programCode: codeableConceptSchema.array().optional(),
        servicedDate: dateSchema.optional(),
        _servicedDate: elementSchema.optional(),
        servicedPeriod: periodSchema.optional(),
        locationCodeableConcept: codeableConceptSchema.optional(),
        locationAddress: addressSchema.optional(),
        locationReference: referenceSchema.optional(),
        quantity: quantitySchema.optional(),
        unitPrice: moneySchema.optional(),
        factor: decimalSchema.optional(),
        net: moneySchema.optional(),
        udi: referenceSchema.array().optional(),
        bodySite: codeableConceptSchema.optional(),
        subSite: codeableConceptSchema.array().optional(),
        encounter: referenceSchema.array().optional(),
        detail: backboneElementSchema
          .extend({
            sequence: positiveIntSchema,
            revenue: codeableConceptSchema.optional(),
            category: codeableConceptSchema.optional(),
            productOrService: codeableConceptSchema,
            modifier: codeableConceptSchema.array().optional(),
            programCode: codeableConceptSchema.array().optional(),
            quantity: quantitySchema.optional(),
            unitPrice: moneySchema.optional(),
            factor: decimalSchema.optional(),
            net: moneySchema.optional(),
            udi: referenceSchema.array().optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    total: moneySchema.optional(),
  }),
) satisfies ZodType<Claim>

export const claimSchema: ZodType<Claim> = untypedClaimSchema

export class FhirClaim extends FhirDomainResource<Claim> {
  public static parse(value: unknown): FhirClaim {
    return new FhirClaim(claimSchema.parse(value))
  }
}
