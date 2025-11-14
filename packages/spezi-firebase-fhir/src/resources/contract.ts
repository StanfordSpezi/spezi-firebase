//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ContractContentDefinition,
  type ContractFriendly,
  type ContractLegal,
  type ContractRule,
  type ContractSigner,
  type ContractTermAction,
  type ContractTermActionSubject,
  type ContractTermAsset,
  type ContractTermAssetContext,
  type ContractTermAssetValuedItem,
  type ContractTermOffer,
  type ContractTermOfferAnswer,
  type ContractTermOfferParty,
  type ContractTermSecurityLabel,
  type Coding,
  type Contract,
  type ContractTerm,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  attachmentSchema,
  backboneElementSchema,
  codeableConceptSchema,
  codingSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  moneySchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  signatureSchema,
  stringSchema,
  timingSchema,
  uriSchema,
} from '../elements/index.js'
import {
  contractPublicationStatusSchema,
  contractStatusSchema,
} from '../valueSets/index.js'

// TODO: Separate schemas

const contractTermSecurityLabelSchema: ZodType<ContractTermSecurityLabel> =
  backboneElementSchema.extend({
    number: z.number().array().optional(),
    classification: codingSchema,
    category: codingSchema.array().optional(),
    control: codingSchema.array().optional(),
  })

const contractTermOfferPartySchema: ZodType<ContractTermOfferParty> =
  backboneElementSchema.extend({
    reference: referenceSchema.array().min(1),
    role: codeableConceptSchema,
  })

const contractTermOfferAnswerSchema: ZodType<ContractTermOfferAnswer> =
  backboneElementSchema.extend({
    valueBoolean: z.boolean().optional(),
    _valueBoolean: elementSchema.optional(),
    valueDecimal: z.number().optional(),
    valueInteger: z.number().optional(),
    valueDate: z.string().optional(),
    _valueDate: elementSchema.optional(),
    valueDateTime: dateTimeSchema.optional(),
    _valueDateTime: elementSchema.optional(),
    valueTime: z.string().optional(),
    _valueTime: elementSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueUri: uriSchema.optional(),
    _valueUri: elementSchema.optional(),
    valueAttachment: attachmentSchema.optional(),
    valueCoding: codingSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueReference: referenceSchema.optional(),
  })

const contractTermOfferSchema: ZodType<ContractTermOffer> =
  backboneElementSchema.extend({
    identifier: identifierSchema.array().optional(),
    party: contractTermOfferPartySchema.array().optional(),
    topic: referenceSchema.optional(),
    type: codeableConceptSchema.optional(),
    decision: codeableConceptSchema.optional(),
    decisionMode: codeableConceptSchema.array().optional(),
    answer: contractTermOfferAnswerSchema.array().optional(),
    text: stringSchema.optional(),
    _text: elementSchema.optional(),
    linkId: stringSchema.array().optional(),
    _linkId: elementSchema.array().optional(),
    securityLabelNumber: z.number().array().optional(),
  })

const contractTermAssetContextSchema: ZodType<ContractTermAssetContext> =
  backboneElementSchema.extend({
    reference: referenceSchema.optional(),
    code: codeableConceptSchema.array().optional(),
    text: stringSchema.optional(),
    _text: elementSchema.optional(),
  })

const contractTermAssetValuedItemSchema: ZodType<ContractTermAssetValuedItem> =
  backboneElementSchema.extend({
    entityCodeableConcept: codeableConceptSchema.optional(),
    entityReference: referenceSchema.optional(),
    identifier: identifierSchema.optional(),
    effectiveTime: dateTimeSchema.optional(),
    _effectiveTime: elementSchema.optional(),
    quantity: quantitySchema.optional(),
    unitPrice: moneySchema.optional(),
    factor: z.number().optional(),
    points: z.number().optional(),
    net: moneySchema.optional(),
    payment: stringSchema.optional(),
    _payment: elementSchema.optional(),
    paymentDate: dateTimeSchema.optional(),
    _paymentDate: elementSchema.optional(),
    responsible: referenceSchema.optional(),
    recipient: referenceSchema.optional(),
    linkId: stringSchema.array().optional(),
    _linkId: elementSchema.array().optional(),
    securityLabelNumber: z.number().array().optional(),
  })

const contractTermAssetSchema: ZodType<ContractTermAsset> =
  backboneElementSchema.extend({
    scope: codeableConceptSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    typeReference: referenceSchema.array().optional(),
    subtype: codeableConceptSchema.array().optional(),
    relationship: codingSchema.optional(),
    context: contractTermAssetContextSchema.array().optional(),
    condition: stringSchema.optional(),
    _condition: elementSchema.optional(),
    periodType: codeableConceptSchema.array().optional(),
    period: periodSchema.array().optional(),
    usePeriod: periodSchema.array().optional(),
    text: stringSchema.optional(),
    _text: elementSchema.optional(),
    linkId: stringSchema.array().optional(),
    _linkId: elementSchema.array().optional(),
    answer: backboneElementSchema.array().optional(),
    securityLabelNumber: z.number().array().optional(),
    valuedItem: contractTermAssetValuedItemSchema.array().optional(),
  })

const contractTermActionSubjectSchema: ZodType<ContractTermActionSubject> =
  backboneElementSchema.extend({
    reference: referenceSchema.array().min(1),
    role: codeableConceptSchema.optional(),
  })

const contractTermActionSchema: ZodType<ContractTermAction> =
  backboneElementSchema.extend({
    doNotPerform: z.boolean().optional(),
    _doNotPerform: elementSchema.optional(),
    type: codeableConceptSchema,
    subject: contractTermActionSubjectSchema.array().optional(),
    intent: codeableConceptSchema,
    linkId: stringSchema.array().optional(),
    _linkId: elementSchema.array().optional(),
    status: codeableConceptSchema,
    context: referenceSchema.optional(),
    contextLinkId: stringSchema.array().optional(),
    _contextLinkId: elementSchema.array().optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    requester: referenceSchema.array().optional(),
    requesterLinkId: stringSchema.array().optional(),
    _requesterLinkId: elementSchema.array().optional(),
    performerType: codeableConceptSchema.array().optional(),
    performerRole: codeableConceptSchema.optional(),
    performer: referenceSchema.optional(),
    performerLinkId: stringSchema.array().optional(),
    _performerLinkId: elementSchema.array().optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    reason: stringSchema.array().optional(),
    _reason: elementSchema.array().optional(),
    reasonLinkId: stringSchema.array().optional(),
    _reasonLinkId: elementSchema.array().optional(),
    note: annotationSchema.array().optional(),
    securityLabelNumber: z.number().array().optional(),
  })

const contractTermSchema: ZodType<ContractTerm> = backboneElementSchema.extend({
  identifier: identifierSchema.optional(),
  issued: dateTimeSchema.optional(),
  _issued: elementSchema.optional(),
  applies: periodSchema.optional(),
  topicCodeableConcept: codeableConceptSchema.optional(),
  topicReference: referenceSchema.optional(),
  type: codeableConceptSchema.optional(),
  subType: codeableConceptSchema.optional(),
  text: stringSchema.optional(),
  _text: elementSchema.optional(),
  securityLabel: contractTermSecurityLabelSchema.array().optional(),
  offer: contractTermOfferSchema,
  asset: contractTermAssetSchema.array().optional(),
  action: contractTermActionSchema.array().optional(),
  get group() {
    return contractTermSchema.array().optional()
  },
})

const contractContentDefinitionSchema: ZodType<ContractContentDefinition> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    subType: codeableConceptSchema.optional(),
    publisher: referenceSchema.optional(),
    publicationDate: dateTimeSchema.optional(),
    _publicationDate: elementSchema.optional(),
    publicationStatus: contractPublicationStatusSchema,
    _publicationStatus: elementSchema.optional(),
    copyright: z.string().optional(),
    _copyright: elementSchema.optional(),
  })

const contractSignerSchema: ZodType<ContractSigner> =
  backboneElementSchema.extend({
    type: codingSchema,
    party: referenceSchema,
    signature: signatureSchema.array().min(1),
  })

const contractFriendlySchema: ZodType<ContractFriendly> =
  backboneElementSchema.extend({
    contentAttachment: attachmentSchema.optional(),
    contentReference: referenceSchema.optional(),
  })

const contractLegalSchema: ZodType<ContractLegal> =
  backboneElementSchema.extend({
    contentAttachment: attachmentSchema.optional(),
    contentReference: referenceSchema.optional(),
  })

const contractRuleSchema: ZodType<ContractRule> = backboneElementSchema.extend({
  contentAttachment: attachmentSchema.optional(),
  contentReference: referenceSchema.optional(),
})

/**
 * Zod schema for FHIR Contract resource (untyped version).
 */
export const untypedContractSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Contract').readonly(),
    identifier: identifierSchema.array().optional(),
    url: uriSchema.optional(),
    _url: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    status: contractStatusSchema.optional(),
    _status: elementSchema.optional(),
    legalState: codeableConceptSchema.optional(),
    instantiatesCanonical: referenceSchema.optional(),
    instantiatesUri: uriSchema.optional(),
    _instantiatesUri: elementSchema.optional(),
    contentDerivative: codeableConceptSchema.optional(),
    issued: dateTimeSchema.optional(),
    _issued: elementSchema.optional(),
    applies: periodSchema.optional(),
    expirationType: codeableConceptSchema.optional(),
    subject: referenceSchema.array().optional(),
    authority: referenceSchema.array().optional(),
    domain: referenceSchema.array().optional(),
    site: referenceSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    subtitle: stringSchema.optional(),
    _subtitle: elementSchema.optional(),
    alias: stringSchema.array().optional(),
    _alias: elementSchema.array().optional(),
    author: referenceSchema.optional(),
    scope: codeableConceptSchema.optional(),
    topicCodeableConcept: codeableConceptSchema.optional(),
    topicReference: referenceSchema.optional(),
    type: codeableConceptSchema.optional(),
    subType: codeableConceptSchema.array().optional(),
    contentDefinition: contractContentDefinitionSchema.optional(),
    term: contractTermSchema.array().optional(),
    supportingInfo: referenceSchema.array().optional(),
    relevantHistory: referenceSchema.array().optional(),
    signer: contractSignerSchema.array().optional(),
    friendly: contractFriendlySchema.array().optional(),
    legal: contractLegalSchema.array().optional(),
    rule: contractRuleSchema.array().optional(),
    legallyBindingAttachment: attachmentSchema.optional(),
    legallyBindingReference: referenceSchema.optional(),
  }),
) satisfies ZodType<Contract>

/**
 * Zod schema for FHIR Contract resource.
 */
export const contractSchema: ZodType<Contract> = untypedContractSchema

/**
 * Wrapper class for FHIR Contract resources.
 * Provides utility methods for working with legal contracts and agreements.
 */
export class FhirContract extends FhirDomainResource<Contract> {
  // Static Functions

  /**
   * Parses a Contract resource from unknown data.
   *
   * @param value - The data to parse and validate against the Contract schema
   * @returns A FhirContract instance containing the validated resource
   */
  public static parse(value: unknown): FhirContract {
    return new FhirContract(contractSchema.parse(value))
  }

  /**
   * Get the issued date as a Date object.
   * @returns The issued date, or undefined if not set
   */
  public get issuedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.issued)
  }

  /**
   * Get the applies period start date.
   * @returns The start date, or undefined if not set
   */
  public get appliesPeriodStart(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.applies?.start)
  }

  /**
   * Get the applies period end date.
   * @returns The end date, or undefined if not set
   */
  public get appliesPeriodEnd(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.applies?.end)
  }

  /**
   * Check if the contract applies to the current date.
   * @param asOfDate Optional date to check against (defaults to current date)
   * @returns True if the contract is currently active
   */
  public isCurrentlyActive(asOfDate?: Date): boolean {
    return FhirDomainResource.periodIsActive(this.value.applies, asOfDate)
  }

  /**
   * Get display text from the contract type.
   * @returns Type display text
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
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
