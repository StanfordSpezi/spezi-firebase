//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type RequestGroup } from 'fhir/r4b.js'
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
  identifierSchema,
  periodSchema,
  rangeSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  timingSchema,
  uriSchema,
} from '../elements/index.js'

const requestGroupStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

const requestGroupIntentSchema = z.enum([
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

const requestGroupPrioritySchema = z.enum([
  'routine',
  'urgent',
  'asap',
  'stat',
])

const requestGroupActionSchema: z.ZodType<any> = z.lazy(() =>
  backboneElementSchema.extend({
    prefix: stringSchema.optional(),
    _prefix: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    textEquivalent: stringSchema.optional(),
    _textEquivalent: elementSchema.optional(),
    priority: requestGroupPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    code: codeableConceptSchema.array().optional(),
    documentation: relatedArtifactSchema.array().optional(),
    condition: backboneElementSchema
      .extend({
        kind: z.enum(['applicability', 'start', 'stop']),
        _kind: elementSchema.optional(),
        expression: z
          .object({
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            name: stringSchema.optional(),
            _name: elementSchema.optional(),
            language: z.literal('text/cql'),
            _language: elementSchema.optional(),
            expression: stringSchema.optional(),
            _expression: elementSchema.optional(),
            reference: uriSchema.optional(),
            _reference: elementSchema.optional(),
          })
          .passthrough()
          .optional(),
      })
      .array()
      .optional(),
    relatedAction: backboneElementSchema
      .extend({
        actionId: stringSchema,
        _actionId: elementSchema.optional(),
        relationship: z.enum([
          'before-start',
          'before',
          'before-end',
          'concurrent-with-start',
          'concurrent',
          'concurrent-with-end',
          'after-start',
          'after',
          'after-end',
        ]),
        _relationship: elementSchema.optional(),
        offsetDuration: z
          .object({
            value: z.number().optional(),
            comparator: z
              .enum(['<', '<=', '>=', '>'])
              .optional(),
            _comparator: elementSchema.optional(),
            unit: stringSchema.optional(),
            _unit: elementSchema.optional(),
            system: uriSchema.optional(),
            _system: elementSchema.optional(),
            code: stringSchema.optional(),
            _code: elementSchema.optional(),
          })
          .passthrough()
          .optional(),
        offsetRange: rangeSchema.optional(),
      })
      .array()
      .optional(),
    timingDateTime: dateTimeSchema.optional(),
    _timingDateTime: elementSchema.optional(),
    timingAge: z
      .object({
        value: z.number().optional(),
        comparator: z
          .enum(['<', '<=', '>=', '>'])
          .optional(),
        _comparator: elementSchema.optional(),
        unit: stringSchema.optional(),
        _unit: elementSchema.optional(),
        system: uriSchema.optional(),
        _system: elementSchema.optional(),
        code: stringSchema.optional(),
        _code: elementSchema.optional(),
      })
      .passthrough()
      .optional(),
    timingPeriod: periodSchema.optional(),
    timingDuration: z
      .object({
        value: z.number().optional(),
        comparator: z
          .enum(['<', '<=', '>=', '>'])
          .optional(),
        _comparator: elementSchema.optional(),
        unit: stringSchema.optional(),
        _unit: elementSchema.optional(),
        system: uriSchema.optional(),
        _system: elementSchema.optional(),
        code: stringSchema.optional(),
        _code: elementSchema.optional(),
      })
      .passthrough()
      .optional(),
    timingRange: rangeSchema.optional(),
    timingTiming: timingSchema.optional(),
    participant: referenceSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    groupingBehavior: z
      .enum(['visual-group', 'logical-group', 'sentence-group'])
      .optional(),
    _groupingBehavior: elementSchema.optional(),
    selectionBehavior: z
      .enum(['any', 'all', 'all-or-none', 'exactly-one', 'at-most-one', 'one-or-more'])
      .optional(),
    _selectionBehavior: elementSchema.optional(),
    requiredBehavior: z
      .enum(['must', 'could', 'must-unless-documented'])
      .optional(),
    _requiredBehavior: elementSchema.optional(),
    precheckBehavior: z.enum(['yes', 'no']).optional(),
    _precheckBehavior: elementSchema.optional(),
    cardinalityBehavior: z.enum(['single', 'multiple']).optional(),
    _cardinalityBehavior: elementSchema.optional(),
    resource: referenceSchema.optional(),
    action: z.array(requestGroupActionSchema).optional(),
  }),
)

export const untypedRequestGroupSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('RequestGroup').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    replaces: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    status: requestGroupStatusSchema,
    _status: elementSchema.optional(),
    intent: requestGroupIntentSchema,
    _intent: elementSchema.optional(),
    priority: requestGroupPrioritySchema.optional(),
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
