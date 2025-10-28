//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Contract, type ContractTerm } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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

const contractTermSchema: ZodType<ContractTerm> = z.lazy(() =>
  backboneElementSchema.extend({
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
    securityLabel: backboneElementSchema
      .extend({
        number: z.number().array().optional(),
        classification: codingSchema,
        category: codingSchema.array().optional(),
        control: codingSchema.array().optional(),
      })
      .array()
      .optional(),
    offer: backboneElementSchema.extend({
      identifier: identifierSchema.array().optional(),
      party: backboneElementSchema
        .extend({
          reference: referenceSchema.array().min(1),
          role: codeableConceptSchema,
        })
        .array()
        .optional(),
      topic: referenceSchema.optional(),
      type: codeableConceptSchema.optional(),
      decision: codeableConceptSchema.optional(),
      decisionMode: codeableConceptSchema.array().optional(),
      answer: backboneElementSchema
        .extend({
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
        .array()
        .optional(),
      text: stringSchema.optional(),
      _text: elementSchema.optional(),
      linkId: stringSchema.array().optional(),
      _linkId: elementSchema.array().optional(),
      securityLabelNumber: z.number().array().optional(),
    }),
    asset: backboneElementSchema
      .extend({
        scope: codeableConceptSchema.optional(),
        type: codeableConceptSchema.array().optional(),
        typeReference: referenceSchema.array().optional(),
        subtype: codeableConceptSchema.array().optional(),
        relationship: codingSchema.optional(),
        context: backboneElementSchema
          .extend({
            reference: referenceSchema.optional(),
            code: codeableConceptSchema.array().optional(),
            text: stringSchema.optional(),
            _text: elementSchema.optional(),
          })
          .array()
          .optional(),
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
        valuedItem: backboneElementSchema
          .extend({
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
          .array()
          .optional(),
      })
      .array()
      .optional(),
    action: backboneElementSchema
      .extend({
        doNotPerform: z.boolean().optional(),
        _doNotPerform: elementSchema.optional(),
        type: codeableConceptSchema,
        subject: backboneElementSchema
          .extend({
            reference: referenceSchema.array().min(1),
            role: codeableConceptSchema.optional(),
          })
          .array()
          .optional(),
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
      .array()
      .optional(),
    get group() {
      return contractTermSchema.array().optional()
    },
  }),
)

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
    contentDefinition: backboneElementSchema
      .extend({
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
      .optional(),
    term: contractTermSchema.array().optional(),
    supportingInfo: referenceSchema.array().optional(),
    relevantHistory: referenceSchema.array().optional(),
    signer: backboneElementSchema
      .extend({
        type: codingSchema,
        party: referenceSchema,
        signature: signatureSchema.array().min(1),
      })
      .array()
      .optional(),
    friendly: backboneElementSchema
      .extend({
        contentAttachment: attachmentSchema.optional(),
        contentReference: referenceSchema.optional(),
      })
      .array()
      .optional(),
    legal: backboneElementSchema
      .extend({
        contentAttachment: attachmentSchema.optional(),
        contentReference: referenceSchema.optional(),
      })
      .array()
      .optional(),
    rule: backboneElementSchema
      .extend({
        contentAttachment: attachmentSchema.optional(),
        contentReference: referenceSchema.optional(),
      })
      .array()
      .optional(),
    legallyBindingAttachment: attachmentSchema.optional(),
    legallyBindingReference: referenceSchema.optional(),
  }),
) satisfies ZodType<Contract>

export const contractSchema: ZodType<Contract> = untypedContractSchema

export class FhirContract extends FhirDomainResource<Contract> {
  // Static Functions

  public static parse(value: unknown): FhirContract {
    return new FhirContract(contractSchema.parse(value))
  }
}
