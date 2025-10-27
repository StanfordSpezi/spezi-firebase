//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type PlanDefinition, type PlanDefinitionAction } from 'fhir/r4b.js'
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
  durationSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  rangeSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  timingSchema,
  triggerDefinitionSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'

const planDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

const planDefinitionTypeSchema = z.enum([
  'order-set',
  'clinical-protocol',
  'eca-rule',
  'workflow-definition',
])

const planDefinitionActionRequiredBehaviorSchema = z.enum([
  'must',
  'could',
  'must-unless-documented',
])

const planDefinitionActionPrecheckBehaviorSchema = z.enum([
  'yes',
  'no',
])

const planDefinitionActionCardinalityBehaviorSchema = z.enum([
  'single',
  'multiple',
])

const planDefinitionActionGroupingBehaviorSchema = z.enum([
  'visual-group',
  'logical-group',
  'sentence-group',
])

const planDefinitionActionSelectionBehaviorSchema = z.enum([
  'any',
  'all',
  'all-or-none',
  'exactly-one',
  'at-most-one',
  'one-or-more',
])

const planDefinitionActionRelationshipTypeSchema = z.enum([
  'before-start',
  'before',
  'before-end',
  'concurrent-with-start',
  'concurrent',
  'concurrent-with-end',
  'after-start',
  'after',
  'after-end',
])

const planDefinitionActionConditionKindSchema = z.enum([
  'applicability',
  'start',
  'stop',
])

const planDefinitionActionParticipantTypeSchema = z.enum([
  'patient',
  'practitioner',
  'related-person',
  'device',
])

const planDefinitionActionPrioritySchema = z.enum([
  'routine',
  'urgent',
  'asap',
  'stat',
])

const planDefinitionActionSchema: ZodType<PlanDefinitionAction> = z.lazy(() =>
  elementSchema.extend({
    prefix: stringSchema.optional(),
    _prefix: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    textEquivalent: stringSchema.optional(),
    _textEquivalent: elementSchema.optional(),
    priority: planDefinitionActionPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    code: codeableConceptSchema.array().optional(),
    reason: codeableConceptSchema.array().optional(),
    documentation: relatedArtifactSchema.array().optional(),
    goalId: stringSchema.array().optional(),
    _goalId: elementSchema.array().optional(),
    subjectCodeableConcept: codeableConceptSchema.optional(),
    subjectReference: referenceSchema.optional(),
    subjectCanonical: canonicalSchema.optional(),
    _subjectCanonical: elementSchema.optional(),
    trigger: triggerDefinitionSchema.array().optional(),
    condition: elementSchema
      .extend({
        kind: planDefinitionActionConditionKindSchema,
        _kind: elementSchema.optional(),
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
          .passthrough()
          .optional(),
      })
      .array()
      .optional(),
    input: dataRequirementSchema.array().optional(),
    output: dataRequirementSchema.array().optional(),
    relatedAction: elementSchema
      .extend({
        actionId: stringSchema,
        _actionId: elementSchema.optional(),
        relationship: planDefinitionActionRelationshipTypeSchema,
        _relationship: elementSchema.optional(),
        offsetDuration: durationSchema.optional(),
        offsetRange: rangeSchema.optional(),
      })
      .array()
      .optional(),
    timingDateTime: dateTimeSchema.optional(),
    _timingDateTime: elementSchema.optional(),
    timingAge: ageSchema.optional(),
    timingPeriod: periodSchema.optional(),
    timingDuration: durationSchema.optional(),
    timingRange: rangeSchema.optional(),
    timingTiming: timingSchema.optional(),
    participant: elementSchema
      .extend({
        type: planDefinitionActionParticipantTypeSchema.optional(),
        _type: elementSchema.optional(),
        role: codeableConceptSchema.optional(),
      })
      .array()
      .optional(),
    type: codeableConceptSchema.optional(),
    groupingBehavior: planDefinitionActionGroupingBehaviorSchema.optional(),
    _groupingBehavior: elementSchema.optional(),
    selectionBehavior: planDefinitionActionSelectionBehaviorSchema.optional(),
    _selectionBehavior: elementSchema.optional(),
    requiredBehavior: planDefinitionActionRequiredBehaviorSchema.optional(),
    _requiredBehavior: elementSchema.optional(),
    precheckBehavior: planDefinitionActionPrecheckBehaviorSchema.optional(),
    _precheckBehavior: elementSchema.optional(),
    cardinalityBehavior: planDefinitionActionCardinalityBehaviorSchema.optional(),
    _cardinalityBehavior: elementSchema.optional(),
    definitionCanonical: canonicalSchema.optional(),
    _definitionCanonical: elementSchema.optional(),
    definitionUri: urlSchema.optional(),
    _definitionUri: elementSchema.optional(),
    transform: canonicalSchema.optional(),
    _transform: elementSchema.optional(),
    dynamicValue: elementSchema
      .extend({
        path: stringSchema.optional(),
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
          .passthrough()
          .optional(),
      })
      .array()
      .optional(),
    get action() {
      return planDefinitionActionSchema.array().optional()
    },
  }),
)

export const untypedPlanDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PlanDefinition').readonly(),
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
    type: planDefinitionTypeSchema.optional(),
    status: planDefinitionStatusSchema,
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
    goal: elementSchema
      .extend({
        category: codeableConceptSchema.optional(),
        description: codeableConceptSchema,
        priority: codeableConceptSchema.optional(),
        start: codeableConceptSchema.optional(),
        addresses: codeableConceptSchema.array().optional(),
        documentation: relatedArtifactSchema.array().optional(),
        target: elementSchema
          .extend({
            measure: codeableConceptSchema.optional(),
            detailQuantity: z
              .object({
                value: z.number().optional(),
                comparator: z.enum(['<', '<=', '>=', '>']).optional(),
                unit: stringSchema.optional(),
                _unit: elementSchema.optional(),
                system: urlSchema.optional(),
                _system: elementSchema.optional(),
                code: stringSchema.optional(),
                _code: elementSchema.optional(),
              })
              .passthrough()
              .optional(),
            detailRange: rangeSchema.optional(),
            detailCodeableConcept: codeableConceptSchema.optional(),
            due: durationSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    action: planDefinitionActionSchema.array().optional(),
  }),
) satisfies ZodType<PlanDefinition>

export const planDefinitionSchema: ZodType<PlanDefinition> =
  untypedPlanDefinitionSchema

export class FhirPlanDefinition extends FhirDomainResource<PlanDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirPlanDefinition {
    return new FhirPlanDefinition(planDefinitionSchema.parse(value))
  }
}
