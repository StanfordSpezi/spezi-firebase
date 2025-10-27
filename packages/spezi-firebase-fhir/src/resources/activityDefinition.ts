//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ActivityDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  ageSchema,
  booleanSchema,
  canonicalSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dataRequirementSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  dosageSchema,
  durationSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  timingSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'

const activityDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

const activityDefinitionKindSchema = z.enum([
  'Appointment',
  'AppointmentResponse',
  'CarePlan',
  'Claim',
  'CommunicationRequest',
  'Contract',
  'DeviceRequest',
  'EnrollmentRequest',
  'ImmunizationRecommendation',
  'MedicationRequest',
  'NutritionOrder',
  'ServiceRequest',
  'SupplyRequest',
  'Task',
  'VisionPrescription',
])

const activityDefinitionIntentSchema = z.enum([
  'proposal',
  'plan',
  'directive',
  'order',
  'original-order',
  'reflex-order',
  'filler-order',
  'instance-order',
  'option',
])

const activityDefinitionPrioritySchema = z.enum([
  'routine',
  'urgent',
  'asap',
  'stat',
])

const activityDefinitionParticipantTypeSchema = z.enum([
  'patient',
  'practitioner',
  'related-person',
  'device',
])

export const untypedActivityDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ActivityDefinition').readonly(),
    url: urlSchema.optional(),
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
    status: activityDefinitionStatusSchema,
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
    kind: activityDefinitionKindSchema.optional(),
    _kind: elementSchema.optional(),
    profile: canonicalSchema.optional(),
    _profile: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    intent: activityDefinitionIntentSchema.optional(),
    _intent: elementSchema.optional(),
    priority: activityDefinitionPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    doNotPerform: booleanSchema.optional(),
    _doNotPerform: elementSchema.optional(),
    timingTiming: timingSchema.optional(),
    timingDateTime: dateTimeSchema.optional(),
    _timingDateTime: elementSchema.optional(),
    timingAge: ageSchema.optional(),
    timingPeriod: periodSchema.optional(),
    timingRange: rangeSchema.optional(),
    timingDuration: durationSchema.optional(),
    location: referenceSchema.optional(),
    participant: elementSchema
      .extend({
        type: activityDefinitionParticipantTypeSchema.optional(),
        _type: elementSchema.optional(),
        role: codeableConceptSchema.optional(),
      })
      .array()
      .optional(),
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
    dynamicValue: elementSchema
      .extend({
        path: stringSchema,
        _path: elementSchema.optional(),
        expression: z
          .object({
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            name: stringSchema.optional(),
            _name: elementSchema.optional(),
            language: stringSchema,
            _language: elementSchema.optional(),
            expression: stringSchema.optional(),
            _expression: elementSchema.optional(),
            reference: urlSchema.optional(),
            _reference: elementSchema.optional(),
          })
          .passthrough(),
      })
      .array()
      .optional(),
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
