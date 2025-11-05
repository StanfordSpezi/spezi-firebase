//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  PlanDefinitionActionCondition,
  PlanDefinitionActionDynamicValue,
  PlanDefinitionActionParticipant,
  PlanDefinitionActionRelatedAction,
  type PlanDefinition,
  type PlanDefinitionAction,
  type PlanDefinitionGoal,
  type PlanDefinitionGoalTarget,
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
  rangeSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  timingSchema,
  triggerDefinitionSchema,
  uriSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  planDefinitionActionCardinalityBehaviorSchema,
  planDefinitionActionConditionKindSchema,
  planDefinitionActionGroupingBehaviorSchema,
  planDefinitionActionParticipantTypeSchema,
  planDefinitionActionPrecheckBehaviorSchema,
  planDefinitionActionRelationshipTypeSchema,
  planDefinitionActionRequiredBehaviorSchema,
  planDefinitionActionSelectionBehaviorSchema,
  publicationStatusSchema,
  requestPrioritySchema,
} from '../valueSets/index.js'

const planDefinitionGoalTargetSchema: ZodType<PlanDefinitionGoalTarget> =
  backboneElementSchema.extend({
    measure: codeableConceptSchema.optional(),
    detailQuantity: quantitySchema.optional(),
    detailRange: rangeSchema.optional(),
    detailCodeableConcept: codeableConceptSchema.optional(),
    detailString: stringSchema.optional(),
    _detailString: elementSchema.optional(),
    detailBoolean: booleanSchema.optional(),
    _detailBoolean: elementSchema.optional(),
    detailInteger: z.number().optional(),
    detailRatio: elementSchema.optional(),
    due: quantitySchema.optional(),
  })

const planDefinitionGoalSchema: ZodType<PlanDefinitionGoal> =
  backboneElementSchema.extend({
    category: codeableConceptSchema.optional(),
    description: codeableConceptSchema,
    priority: codeableConceptSchema.optional(),
    start: codeableConceptSchema.optional(),
    addresses: codeableConceptSchema.array().optional(),
    documentation: relatedArtifactSchema.array().optional(),
    target: planDefinitionGoalTargetSchema.array().optional(),
  })

const planDefinitionActionConditionSchema: ZodType<PlanDefinitionActionCondition> =
  backboneElementSchema.extend({
    kind: planDefinitionActionConditionKindSchema,
    _kind: elementSchema.optional(),
    expression: expressionSchema.optional(),
  })

const planDefinitionActionRelatedActionSchema: ZodType<PlanDefinitionActionRelatedAction> =
  backboneElementSchema.extend({
    actionId: stringSchema,
    _actionId: elementSchema.optional(),
    relationship: planDefinitionActionRelationshipTypeSchema,
    _relationship: elementSchema.optional(),
    offsetDuration: quantitySchema.optional(),
    offsetRange: rangeSchema.optional(),
  })

const planDefinitionActionParticipantSchema: ZodType<PlanDefinitionActionParticipant> =
  backboneElementSchema.extend({
    type: planDefinitionActionParticipantTypeSchema,
    _type: elementSchema.optional(),
    role: codeableConceptSchema.optional(),
  })

const planDefinitionActionDynamicValueSchema: ZodType<PlanDefinitionActionDynamicValue> =
  backboneElementSchema.extend({
    path: stringSchema.optional(),
    _path: elementSchema.optional(),
    expression: expressionSchema.optional(),
  })

const planDefinitionActionSchema: ZodType<PlanDefinitionAction> =
  backboneElementSchema.extend({
    prefix: stringSchema.optional(),
    _prefix: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    textEquivalent: stringSchema.optional(),
    _textEquivalent: elementSchema.optional(),
    priority: requestPrioritySchema.optional(),
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
    condition: planDefinitionActionConditionSchema.array().optional(),
    input: dataRequirementSchema.array().optional(),
    output: dataRequirementSchema.array().optional(),
    relatedAction: planDefinitionActionRelatedActionSchema.array().optional(),
    timingDateTime: dateTimeSchema.optional(),
    _timingDateTime: elementSchema.optional(),
    timingAge: quantitySchema.optional(),
    timingPeriod: periodSchema.optional(),
    timingDuration: quantitySchema.optional(),
    timingRange: rangeSchema.optional(),
    timingTiming: timingSchema.optional(),
    participant: planDefinitionActionParticipantSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    groupingBehavior: planDefinitionActionGroupingBehaviorSchema.optional(),
    _groupingBehavior: elementSchema.optional(),
    selectionBehavior: planDefinitionActionSelectionBehaviorSchema.optional(),
    _selectionBehavior: elementSchema.optional(),
    requiredBehavior: planDefinitionActionRequiredBehaviorSchema.optional(),
    _requiredBehavior: elementSchema.optional(),
    precheckBehavior: planDefinitionActionPrecheckBehaviorSchema.optional(),
    _precheckBehavior: elementSchema.optional(),
    cardinalityBehavior:
      planDefinitionActionCardinalityBehaviorSchema.optional(),
    _cardinalityBehavior: elementSchema.optional(),
    definitionCanonical: canonicalSchema.optional(),
    _definitionCanonical: elementSchema.optional(),
    definitionUri: uriSchema.optional(),
    _definitionUri: elementSchema.optional(),
    transform: canonicalSchema.optional(),
    _transform: elementSchema.optional(),
    dynamicValue: planDefinitionActionDynamicValueSchema.array().optional(),
    get action() {
      return planDefinitionActionSchema.array().optional()
    },
  })

export const untypedPlanDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PlanDefinition').readonly(),
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
    type: codeableConceptSchema.optional(),
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
    goal: planDefinitionGoalSchema.array().optional(),
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
