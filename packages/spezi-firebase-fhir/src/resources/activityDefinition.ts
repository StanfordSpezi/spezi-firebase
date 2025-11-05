//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ActivityDefinition,
  type ActivityDefinitionParticipant,
  type ActivityDefinitionDynamicValue,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  canonicalSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  dosageSchema,
  elementSchema,
  expressionSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  timingSchema,
  uriSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  actionParticipantTypeSchema,
  publicationStatusSchema,
  requestIntentSchema,
  requestPrioritySchema,
  requestResourceTypeSchema,
} from '../valueSets/index.js'

const activityDefinitionParticipantSchema: ZodType<ActivityDefinitionParticipant> =
  backboneElementSchema.extend({
    type: actionParticipantTypeSchema,
    _type: elementSchema.optional(),
    role: codeableConceptSchema.optional(),
  })

const activityDefinitionDynamicValueSchema: ZodType<ActivityDefinitionDynamicValue> =
  backboneElementSchema.extend({
    path: stringSchema,
    _path: elementSchema.optional(),
    expression: expressionSchema,
  })

export const untypedActivityDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ActivityDefinition').readonly(),
    url: uriSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    subtitle: stringSchema.optional(),
    _subtitle: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    subjectCodeableConcept: codeableConceptSchema.optional(),
    subjectReference: referenceSchema.optional(),
    subjectCanonical: canonicalSchema.optional(),
    _subjectCanonical: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
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
    kind: requestResourceTypeSchema.optional(),
    _kind: elementSchema.optional(),
    profile: canonicalSchema.optional(),
    _profile: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    intent: requestIntentSchema.optional(),
    _intent: elementSchema.optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    doNotPerform: booleanSchema.optional(),
    _doNotPerform: elementSchema.optional(),
    timingTiming: timingSchema.optional(),
    timingDateTime: dateTimeSchema.optional(),
    _timingDateTime: elementSchema.optional(),
    timingAge: quantitySchema.optional(),
    timingPeriod: periodSchema.optional(),
    timingRange: rangeSchema.optional(),
    timingDuration: quantitySchema.optional(),
    location: referenceSchema.optional(),
    participant: activityDefinitionParticipantSchema.array().optional(),
    productReference: referenceSchema.optional(),
    productCodeableConcept: codeableConceptSchema.optional(),
    quantity: quantitySchema.optional(),
    dosage: dosageSchema.array().optional(),
    bodySite: codeableConceptSchema.array().optional(),
    specimenRequirement: referenceSchema.array().optional(),
    observationRequirement: referenceSchema.array().optional(),
    observationResultRequirement: referenceSchema.array().optional(),
    transform: canonicalSchema.optional(),
    _transform: elementSchema.optional(),
    dynamicValue: activityDefinitionDynamicValueSchema.array().optional(),
  }),
) satisfies ZodType<ActivityDefinition>

export const activityDefinitionSchema: ZodType<ActivityDefinition> =
  untypedActivityDefinitionSchema

export class FhirActivityDefinition extends FhirDomainResource<ActivityDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirActivityDefinition {
    return new FhirActivityDefinition(activityDefinitionSchema.parse(value))
  }
}
