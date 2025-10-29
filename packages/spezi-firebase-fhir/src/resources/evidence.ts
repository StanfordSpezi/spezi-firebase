//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Evidence,
  type EvidenceVariableDefinition,
  type EvidenceStatistic,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  uriSchema,
  usageContextSchema,
  unsignedIntSchema,
} from '../elements/index.js'
import {
  evidenceVariableHandlingSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const evidenceVariableDefinitionSchema: ZodType<EvidenceVariableDefinition> =
  z.lazy(() =>
    backboneElementSchema.extend({
      description: markdownSchema.optional(),
      _description: elementSchema.optional(),
      note: annotationSchema.array().optional(),
      variableRole: codeableConceptSchema,
      observed: referenceSchema.optional(),
      intended: referenceSchema.optional(),
      directnessMatch: codeableConceptSchema.optional(),
    }),
  )

const evidenceStatisticAttributeEstimateSchema = z.lazy(() =>
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    quantity: quantitySchema.optional(),
    level: decimalSchema.optional(),
    _level: elementSchema.optional(),
    range: rangeSchema.optional(),
    get attributeEstimate() {
      return evidenceStatisticAttributeEstimateSchema.array().optional()
    },
  }),
)

const evidenceStatisticSchema: ZodType<EvidenceStatistic> = z.lazy(() =>
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    statisticType: codeableConceptSchema.optional(),
    category: codeableConceptSchema.optional(),
    quantity: quantitySchema.optional(),
    numberOfEvents: unsignedIntSchema.optional(),
    _numberOfEvents: elementSchema.optional(),
    numberAffected: unsignedIntSchema.optional(),
    _numberAffected: elementSchema.optional(),
    sampleSize: backboneElementSchema
      .extend({
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        note: annotationSchema.array().optional(),
        numberOfStudies: unsignedIntSchema.optional(),
        _numberOfStudies: elementSchema.optional(),
        numberOfParticipants: unsignedIntSchema.optional(),
        _numberOfParticipants: elementSchema.optional(),
        knownDataCount: unsignedIntSchema.optional(),
        _knownDataCount: elementSchema.optional(),
      })
      .optional(),
    attributeEstimate: evidenceStatisticAttributeEstimateSchema
      .array()
      .optional(),
    modelCharacteristic: backboneElementSchema
      .extend({
        code: codeableConceptSchema,
        value: quantitySchema.optional(),
        variable: backboneElementSchema
          .extend({
            variableDefinition: referenceSchema,
            handling: evidenceVariableHandlingSchema.optional(),
            _handling: elementSchema.optional(),
            valueCategory: codeableConceptSchema.array().optional(),
            valueQuantity: quantitySchema.array().optional(),
            valueRange: rangeSchema.array().optional(),
          })
          .array()
          .optional(),
        attributeEstimate: backboneElementSchema
          .extend({
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            note: annotationSchema.array().optional(),
            type: codeableConceptSchema.optional(),
            quantity: quantitySchema.optional(),
            level: decimalSchema.optional(),
            _level: elementSchema.optional(),
            range: rangeSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
)

const evidenceCertaintySchema = z.lazy(() =>
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    rating: codeableConceptSchema.optional(),
    rater: stringSchema.optional(),
    _rater: elementSchema.optional(),
    get subcomponent() {
      return evidenceCertaintySchema.array().optional()
    },
  }),
)

export const untypedEvidenceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Evidence').readonly(),
    url: uriSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    citeAsReference: referenceSchema.optional(),
    citeAsMarkdown: markdownSchema.optional(),
    _citeAsMarkdown: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    author: contactDetailSchema.array().optional(),
    editor: contactDetailSchema.array().optional(),
    reviewer: contactDetailSchema.array().optional(),
    endorser: contactDetailSchema.array().optional(),
    relatedArtifact: relatedArtifactSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    assertion: markdownSchema.optional(),
    _assertion: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    variableDefinition: evidenceVariableDefinitionSchema.array(),
    synthesisType: codeableConceptSchema.optional(),
    studyType: codeableConceptSchema.optional(),
    statistic: evidenceStatisticSchema.array().optional(),
    certainty: evidenceCertaintySchema.array().optional(),
  }),
) satisfies ZodType<Evidence>

export const evidenceSchema: ZodType<Evidence> = untypedEvidenceSchema

export class FhirEvidence extends FhirDomainResource<Evidence> {
  // Static Functions

  public static parse(value: unknown): FhirEvidence {
    return new FhirEvidence(evidenceSchema.parse(value))
  }
}
