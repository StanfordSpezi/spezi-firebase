//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SubscriptionTopic } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  publicationStatusSchema,
  subscriptionTopicCanFilterByModifierSchema,
  subscriptionTopicResourceTriggerInteractionSchema,
  subscriptionTopicResourceTriggerQueryCriteriaResultSchema,
} from '../valueSets/index.js'

export const untypedSubscriptionTopicSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SubscriptionTopic').readonly(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    canFilterBy: backboneElementSchema
      .extend({
        description: markdownSchema.optional(),
        _description: elementSchema.optional(),
        filterDefinition: urlSchema.optional(),
        _filterDefinition: elementSchema.optional(),
        filterParameter: stringSchema,
        _filterParameter: elementSchema.optional(),
        modifier: subscriptionTopicCanFilterByModifierSchema.array().optional(),
        _modifier: elementSchema.array().optional(),
        resource: urlSchema.optional(),
        _resource: elementSchema.optional(),
      })
      .array()
      .optional(),
    contact: contactDetailSchema.array().optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    derivedFrom: urlSchema.array().optional(),
    _derivedFrom: elementSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    eventTrigger: backboneElementSchema
      .extend({
        description: markdownSchema.optional(),
        _description: elementSchema.optional(),
        event: codeableConceptSchema,
        resource: urlSchema,
        _resource: elementSchema.optional(),
      })
      .array()
      .optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    lastReviewDate: dateSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    notificationShape: backboneElementSchema
      .extend({
        include: stringSchema.array().optional(),
        _include: elementSchema.array().optional(),
        resource: urlSchema,
        _resource: elementSchema.optional(),
        revInclude: stringSchema.array().optional(),
        _revInclude: elementSchema.array().optional(),
      })
      .array()
      .optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    resourceTrigger: backboneElementSchema
      .extend({
        description: markdownSchema.optional(),
        _description: elementSchema.optional(),
        fhirPathCriteria: stringSchema.optional(),
        _fhirPathCriteria: elementSchema.optional(),
        queryCriteria: backboneElementSchema
          .extend({
            current: stringSchema.optional(),
            _current: elementSchema.optional(),
            previous: stringSchema.optional(),
            _previous: elementSchema.optional(),
            requireBoth: booleanSchema.optional(),
            _requireBoth: elementSchema.optional(),
            resultForCreate:
              subscriptionTopicResourceTriggerQueryCriteriaResultSchema.optional(),
            _resultForCreate: elementSchema.optional(),
            resultForDelete:
              subscriptionTopicResourceTriggerQueryCriteriaResultSchema.optional(),
            _resultForDelete: elementSchema.optional(),
          })
          .optional(),
        resource: urlSchema,
        _resource: elementSchema.optional(),
        supportedInteraction: subscriptionTopicResourceTriggerInteractionSchema
          .array()
          .optional(),
        _supportedInteraction: elementSchema.array().optional(),
      })
      .array()
      .optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    url: urlSchema,
    _url: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
  }),
) satisfies ZodType<SubscriptionTopic>

export const subscriptionTopicSchema: ZodType<SubscriptionTopic> =
  untypedSubscriptionTopicSchema

export class FhirSubscriptionTopic extends FhirDomainResource<SubscriptionTopic> {
  // Static Functions

  public static parse(value: unknown): FhirSubscriptionTopic {
    return new FhirSubscriptionTopic(subscriptionTopicSchema.parse(value))
  }
}
