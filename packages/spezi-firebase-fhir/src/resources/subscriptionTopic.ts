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
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
  canonicalSchema,
  codeSchema,
  idSchema,
  uriSchema,
} from '../elements/index.js'

const subscriptionTopicStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export const untypedSubscriptionTopicSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SubscriptionTopic').readonly(),
    url: urlSchema,
    _url: elementSchema.optional(),
    identifier: z.any().array().optional(), // Identifier
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    derivedFrom: canonicalSchema.array().optional(),
    _derivedFrom: elementSchema.array().optional(),
    status: subscriptionTopicStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
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
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    approvalDate: dateTimeSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateTimeSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    effectivePeriod: z.any().optional(), // Period
    resourceTrigger: backboneElementSchema
      .extend({
        description: markdownSchema.optional(),
        _description: elementSchema.optional(),
        resource: uriSchema,
        _resource: elementSchema.optional(),
        supportedInteraction: z.enum(['create', 'update', 'delete']).array().optional(),
        _supportedInteraction: elementSchema.array().optional(),
        queryCriteria: backboneElementSchema
          .extend({
            previous: stringSchema.optional(),
            _previous: elementSchema.optional(),
            resultForCreate: z.enum(['test-passes', 'test-fails']).optional(),
            _resultForCreate: elementSchema.optional(),
            current: stringSchema.optional(),
            _current: elementSchema.optional(),
            resultForDelete: z.enum(['test-passes', 'test-fails']).optional(),
            _resultForDelete: elementSchema.optional(),
            requireBoth: booleanSchema.optional(),
            _requireBoth: elementSchema.optional(),
          })
          .optional(),
        fhirPathCriteria: stringSchema.optional(),
        _fhirPathCriteria: elementSchema.optional(),
      })
      .array()
      .optional(),
    eventTrigger: backboneElementSchema
      .extend({
        description: markdownSchema.optional(),
        _description: elementSchema.optional(),
        event: codeableConceptSchema,
        resource: uriSchema,
        _resource: elementSchema.optional(),
      })
      .array()
      .optional(),
    canFilterBy: backboneElementSchema
      .extend({
        description: markdownSchema.optional(),
        _description: elementSchema.optional(),
        resource: uriSchema.optional(),
        _resource: elementSchema.optional(),
        filterParameter: stringSchema,
        _filterParameter: elementSchema.optional(),
        modifier: codeSchema.array().optional(),
        _modifier: elementSchema.array().optional(),
      })
      .array()
      .optional(),
    notificationShape: backboneElementSchema
      .extend({
        resource: uriSchema,
        _resource: elementSchema.optional(),
        include: stringSchema.array().optional(),
        _include: elementSchema.array().optional(),
        revInclude: stringSchema.array().optional(),
        _revInclude: elementSchema.array().optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<SubscriptionTopic>

export const subscriptionTopicSchema: ZodType<SubscriptionTopic> =
  untypedSubscriptionTopicSchema

export class FhirSubscriptionTopic extends FhirDomainResource<SubscriptionTopic> {
  public static parse(value: unknown): FhirSubscriptionTopic {
    return new FhirSubscriptionTopic(subscriptionTopicSchema.parse(value))
  }
}
