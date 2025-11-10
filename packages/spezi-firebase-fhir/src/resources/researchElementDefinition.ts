//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ResearchElementDefinition,
  type ResearchElementDefinitionCharacteristic,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  canonicalSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dataRequirementSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  expressionSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  timingSchema,
  uriSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  groupMeasureSchema,
  publicationStatusSchema,
  researchElementDefinitionTypeSchema,
  variableTypeSchema,
} from '../valueSets/index.js'

const researchElementDefinitionCharacteristicSchema: ZodType<ResearchElementDefinitionCharacteristic> =
  backboneElementSchema.extend({
    definitionCodeableConcept: codeableConceptSchema.optional(),
    definitionCanonical: canonicalSchema.optional(),
    _definitionCanonical: elementSchema.optional(),
    definitionExpression: expressionSchema.optional(),
    definitionDataRequirement: dataRequirementSchema.optional(),
    usageContext: usageContextSchema.array().optional(),
    exclude: booleanSchema.optional(),
    _exclude: elementSchema.optional(),
    unitOfMeasure: codeableConceptSchema.optional(),
    studyEffectiveDescription: stringSchema.optional(),
    _studyEffectiveDescription: elementSchema.optional(),
    studyEffectiveDateTime: dateTimeSchema.optional(),
    _studyEffectiveDateTime: elementSchema.optional(),
    studyEffectivePeriod: periodSchema.optional(),
    studyEffectiveDuration: quantitySchema.optional(),
    studyEffectiveTiming: timingSchema.optional(),
    studyEffectiveTimeFromStart: quantitySchema.optional(),
    studyEffectiveGroupMeasure: groupMeasureSchema.optional(),
    _studyEffectiveGroupMeasure: elementSchema.optional(),
    participantEffectiveDescription: stringSchema.optional(),
    _participantEffectiveDescription: elementSchema.optional(),
    participantEffectiveDateTime: dateTimeSchema.optional(),
    _participantEffectiveDateTime: elementSchema.optional(),
    participantEffectivePeriod: periodSchema.optional(),
    participantEffectiveDuration: quantitySchema.optional(),
    participantEffectiveTiming: timingSchema.optional(),
    participantEffectiveTimeFromStart: quantitySchema.optional(),
    participantEffectiveGroupMeasure: groupMeasureSchema.optional(),
    _participantEffectiveGroupMeasure: elementSchema.optional(),
  })

export const untypedResearchElementDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ResearchElementDefinition').readonly(),
    url: uriSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    shortTitle: stringSchema.optional(),
    _shortTitle: elementSchema.optional(),
    subtitle: stringSchema.optional(),
    _subtitle: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    subjectCodeableConcept: codeableConceptSchema.optional(),
    subjectReference: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    comment: stringSchema.array().optional(),
    _comment: elementSchema.array().optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    usage: stringSchema.optional(),
    _usage: elementSchema.optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    topic: codeableConceptSchema.array().optional(),
    author: contactDetailSchema.array().optional(),
    editor: contactDetailSchema.array().optional(),
    reviewer: contactDetailSchema.array().optional(),
    endorser: contactDetailSchema.array().optional(),
    relatedArtifact: relatedArtifactSchema.array().optional(),
    library: canonicalSchema.array().optional(),
    _library: elementSchema.array().optional(),
    type: researchElementDefinitionTypeSchema,
    _type: elementSchema.optional(),
    variableType: variableTypeSchema.optional(),
    _variableType: elementSchema.optional(),
    characteristic: researchElementDefinitionCharacteristicSchema.array(),
  }),
) satisfies ZodType<ResearchElementDefinition>

export const researchElementDefinitionSchema: ZodType<ResearchElementDefinition> =
  untypedResearchElementDefinitionSchema

export class FhirResearchElementDefinition extends FhirDomainResource<ResearchElementDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirResearchElementDefinition {
    return new FhirResearchElementDefinition(
      researchElementDefinitionSchema.parse(value),
    )
  }
}
