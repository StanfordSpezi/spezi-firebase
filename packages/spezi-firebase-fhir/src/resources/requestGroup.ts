//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type RequestGroup,
  type RequestGroupAction,
  type RequestGroupActionCondition,
  type RequestGroupActionRelatedAction,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  canonicalSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  expressionSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  timingSchema,
} from '../elements/index.js'
import {
  requestGroupActionCardinalityBehaviorSchema,
  requestGroupActionConditionKindSchema,
  requestGroupActionGroupingBehaviorSchema,
  requestGroupActionPrecheckBehaviorSchema,
  requestGroupActionRelationshipTypeSchema,
  requestGroupActionRequiredBehaviorSchema,
  requestGroupActionSelectionBehaviorSchema,
  requestGroupIntentSchema,
  requestGroupStatusSchema,
  requestPrioritySchema,
} from '../valueSets/index.js'

const requestGroupActionConditionSchema: ZodType<RequestGroupActionCondition> =
  backboneElementSchema.extend({
    kind: requestGroupActionConditionKindSchema,
    _kind: elementSchema.optional(),
    expression: expressionSchema.optional(),
  })

const requestGroupActionRelatedActionSchema: ZodType<RequestGroupActionRelatedAction> =
  backboneElementSchema.extend({
    actionId: z.string(),
    _actionId: elementSchema.optional(),
    relationship: requestGroupActionRelationshipTypeSchema,
    _relationship: elementSchema.optional(),
    offsetDuration: quantitySchema.optional(),
    offsetRange: rangeSchema.optional(),
  })

const requestGroupActionSchema: ZodType<RequestGroupAction> =
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
    documentation: relatedArtifactSchema.array().optional(),
    condition: requestGroupActionConditionSchema.array().optional(),
    relatedAction: requestGroupActionRelatedActionSchema.array().optional(),
    timingDateTime: dateTimeSchema.optional(),
    _timingDateTime: elementSchema.optional(),
    timingAge: quantitySchema.optional(),
    timingPeriod: periodSchema.optional(),
    timingDuration: quantitySchema.optional(),
    timingRange: rangeSchema.optional(),
    timingTiming: timingSchema.optional(),
    participant: referenceSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    groupingBehavior: requestGroupActionGroupingBehaviorSchema.optional(),
    _groupingBehavior: elementSchema.optional(),
    selectionBehavior: requestGroupActionSelectionBehaviorSchema.optional(),
    _selectionBehavior: elementSchema.optional(),
    requiredBehavior: requestGroupActionRequiredBehaviorSchema.optional(),
    _requiredBehavior: elementSchema.optional(),
    precheckBehavior: requestGroupActionPrecheckBehaviorSchema.optional(),
    _precheckBehavior: elementSchema.optional(),
    cardinalityBehavior: requestGroupActionCardinalityBehaviorSchema.optional(),
    _cardinalityBehavior: elementSchema.optional(),
    resource: referenceSchema.optional(),
    get action() {
      return requestGroupActionSchema.array().optional()
    },
  })

export const untypedRequestGroupSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('RequestGroup').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: z.string().array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    replaces: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    status: requestGroupStatusSchema,
    _status: elementSchema.optional(),
    intent: requestGroupIntentSchema,
    _intent: elementSchema.optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    author: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    action: requestGroupActionSchema.array().optional(),
  }),
) satisfies ZodType<RequestGroup>

export const requestGroupSchema: ZodType<RequestGroup> =
  untypedRequestGroupSchema

export class FhirRequestGroup extends FhirDomainResource<RequestGroup> {
  // Static Functions

  public static parse(value: unknown): FhirRequestGroup {
    return new FhirRequestGroup(requestGroupSchema.parse(value))
  }
}
