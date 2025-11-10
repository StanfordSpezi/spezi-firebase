//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ExplanationOfBenefitAccident,
  type ExplanationOfBenefitAddItem,
  type ExplanationOfBenefitBenefitBalance,
  type ExplanationOfBenefitBenefitBalanceFinancial,
  type ExplanationOfBenefitCareTeam,
  type ExplanationOfBenefitDiagnosis,
  type ExplanationOfBenefitInsurance,
  type ExplanationOfBenefitItem,
  type ExplanationOfBenefitItemAdjudication,
  type ExplanationOfBenefitItemDetail,
  type ExplanationOfBenefitPayee,
  type ExplanationOfBenefitPayment,
  type ExplanationOfBenefitProcedure,
  type ExplanationOfBenefitProcessNote,
  type ExplanationOfBenefitRelated,
  type ExplanationOfBenefitSupportingInfo,
  type ExplanationOfBenefitTotal,
  type ExplanationOfBenefit,
} from 'fhir/r4b.js'
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
  periodSchema,
  moneySchema,
  decimalSchema,
  positiveIntSchema,
  booleanSchema,
  dateSchema,
  attachmentSchema,
  addressSchema,
  quantitySchema,
  unsignedIntSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  remittanceOutcomeSchema,
  claimUseSchema,
  noteTypeSchema,
} from '../valueSets/index.js'

const explanationOfBenefitRelatedSchema: ZodType<ExplanationOfBenefitRelated> =
  backboneElementSchema.extend({
    claim: referenceSchema.optional(),
    relationship: codeableConceptSchema.optional(),
    reference: identifierSchema.optional(),
  })

const explanationOfBenefitPayeeSchema: ZodType<ExplanationOfBenefitPayee> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    party: referenceSchema.optional(),
  })

const explanationOfBenefitCareTeamSchema: ZodType<ExplanationOfBenefitCareTeam> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    provider: referenceSchema,
    responsible: booleanSchema.optional(),
    _responsible: elementSchema.optional(),
    role: codeableConceptSchema.optional(),
    qualification: codeableConceptSchema.optional(),
  })

const explanationOfBenefitSupportingInfoSchema: ZodType<ExplanationOfBenefitSupportingInfo> =
  backboneElementSchema.extend({
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

const explanationOfBenefitDiagnosisSchema: ZodType<ExplanationOfBenefitDiagnosis> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    diagnosisCodeableConcept: codeableConceptSchema.optional(),
    diagnosisReference: referenceSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    onAdmission: codeableConceptSchema.optional(),
    packageCode: codeableConceptSchema.optional(),
  })

const explanationOfBenefitProcedureSchema: ZodType<ExplanationOfBenefitProcedure> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    type: codeableConceptSchema.array().optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    procedureCodeableConcept: codeableConceptSchema.optional(),
    procedureReference: referenceSchema.optional(),
    udi: referenceSchema.array().optional(),
  })

const explanationOfBenefitInsuranceSchema: ZodType<ExplanationOfBenefitInsurance> =
  backboneElementSchema.extend({
    focal: booleanSchema,
    _focal: elementSchema.optional(),
    coverage: referenceSchema,
    preAuthRef: stringSchema.array().optional(),
    _preAuthRef: elementSchema.array().optional(),
  })

const explanationOfBenefitAccidentSchema: ZodType<ExplanationOfBenefitAccident> =
  backboneElementSchema.extend({
    date: dateSchema.optional(),
    _date: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    locationAddress: addressSchema.optional(),
    locationReference: referenceSchema.optional(),
  })

const explanationOfBenefitItemAdjudicationSchema: ZodType<ExplanationOfBenefitItemAdjudication> =
  backboneElementSchema.extend({
    category: codeableConceptSchema,
    reason: codeableConceptSchema.optional(),
    amount: moneySchema.optional(),
    value: decimalSchema.optional(),
  })

const explanationOfBenefitItemDetailSchema: ZodType<ExplanationOfBenefitItemDetail> =
  backboneElementSchema.extend({
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
    noteNumber: positiveIntSchema.array().optional(),
    adjudication: explanationOfBenefitItemAdjudicationSchema.array().optional(),
  })

const explanationOfBenefitItemSchema: ZodType<ExplanationOfBenefitItem> =
  backboneElementSchema.extend({
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
    noteNumber: positiveIntSchema.array().optional(),
    adjudication: explanationOfBenefitItemAdjudicationSchema.array().optional(),
    detail: explanationOfBenefitItemDetailSchema.array().optional(),
  })

const explanationOfBenefitAddItemSchema: ZodType<ExplanationOfBenefitAddItem> =
  backboneElementSchema.extend({
    itemSequence: positiveIntSchema.array().optional(),
    detailSequence: positiveIntSchema.array().optional(),
    subdetailSequence: positiveIntSchema.array().optional(),
    provider: referenceSchema.array().optional(),
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
    bodySite: codeableConceptSchema.optional(),
    subSite: codeableConceptSchema.array().optional(),
    noteNumber: positiveIntSchema.array().optional(),
    adjudication: explanationOfBenefitItemAdjudicationSchema.array(),
  })

const explanationOfBenefitTotalSchema: ZodType<ExplanationOfBenefitTotal> =
  backboneElementSchema.extend({
    category: codeableConceptSchema,
    amount: moneySchema,
  })

const explanationOfBenefitPaymentSchema: ZodType<ExplanationOfBenefitPayment> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    adjustment: moneySchema.optional(),
    adjustmentReason: codeableConceptSchema.optional(),
    date: dateSchema.optional(),
    _date: elementSchema.optional(),
    amount: moneySchema.optional(),
    identifier: identifierSchema.optional(),
  })

const explanationOfBenefitProcessNoteSchema: ZodType<ExplanationOfBenefitProcessNote> =
  backboneElementSchema.extend({
    number: positiveIntSchema.optional(),
    type: noteTypeSchema.optional(),
    _type: elementSchema.optional(),
    text: stringSchema.optional(),
    _text: elementSchema.optional(),
    language: codeableConceptSchema.optional(),
  })

const explanationOfBenefitBenefitBalanceFinancialSchema: ZodType<ExplanationOfBenefitBenefitBalanceFinancial> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    allowedUnsignedInt: unsignedIntSchema.optional(),
    allowedString: stringSchema.optional(),
    _allowedString: elementSchema.optional(),
    allowedMoney: moneySchema.optional(),
    usedUnsignedInt: unsignedIntSchema.optional(),
    usedMoney: moneySchema.optional(),
  })

const explanationOfBenefitBenefitBalanceSchema: ZodType<ExplanationOfBenefitBenefitBalance> =
  backboneElementSchema.extend({
    category: codeableConceptSchema,
    excluded: booleanSchema.optional(),
    _excluded: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    network: codeableConceptSchema.optional(),
    unit: codeableConceptSchema.optional(),
    term: codeableConceptSchema.optional(),
    financial: explanationOfBenefitBenefitBalanceFinancialSchema
      .array()
      .optional(),
  })

export const untypedExplanationOfBenefitSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ExplanationOfBenefit').readonly(),
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
    insurer: referenceSchema,
    provider: referenceSchema,
    priority: codeableConceptSchema.optional(),
    fundsReserveRequested: codeableConceptSchema.optional(),
    fundsReserve: codeableConceptSchema.optional(),
    related: explanationOfBenefitRelatedSchema.array().optional(),
    prescription: referenceSchema.optional(),
    originalPrescription: referenceSchema.optional(),
    payee: explanationOfBenefitPayeeSchema.optional(),
    referral: referenceSchema.optional(),
    facility: referenceSchema.optional(),
    claim: referenceSchema.optional(),
    claimResponse: referenceSchema.optional(),
    outcome: remittanceOutcomeSchema,
    _outcome: elementSchema.optional(),
    disposition: stringSchema.optional(),
    _disposition: elementSchema.optional(),
    preAuthRef: stringSchema.array().optional(),
    _preAuthRef: elementSchema.array().optional(),
    preAuthRefPeriod: periodSchema.array().optional(),
    careTeam: explanationOfBenefitCareTeamSchema.array().optional(),
    supportingInfo: explanationOfBenefitSupportingInfoSchema.array().optional(),
    diagnosis: explanationOfBenefitDiagnosisSchema.array().optional(),
    procedure: explanationOfBenefitProcedureSchema.array().optional(),
    precedence: positiveIntSchema.optional(),
    insurance: explanationOfBenefitInsuranceSchema.array(),
    accident: explanationOfBenefitAccidentSchema.optional(),
    item: explanationOfBenefitItemSchema.array().optional(),
    addItem: explanationOfBenefitAddItemSchema.array().optional(),
    adjudication: explanationOfBenefitItemAdjudicationSchema.array().optional(),
    total: explanationOfBenefitTotalSchema.array().optional(),
    payment: explanationOfBenefitPaymentSchema.optional(),
    formCode: codeableConceptSchema.optional(),
    form: attachmentSchema.optional(),
    processNote: explanationOfBenefitProcessNoteSchema.array().optional(),
    benefitPeriod: periodSchema.optional(),
    benefitBalance: explanationOfBenefitBenefitBalanceSchema.array().optional(),
  }),
) satisfies ZodType<ExplanationOfBenefit>

export const explanationOfBenefitSchema: ZodType<ExplanationOfBenefit> =
  untypedExplanationOfBenefitSchema

export class FhirExplanationOfBenefit extends FhirDomainResource<ExplanationOfBenefit> {
  // Static Functions

  public static parse(value: unknown): FhirExplanationOfBenefit {
    return new FhirExplanationOfBenefit(explanationOfBenefitSchema.parse(value))
  }
}
