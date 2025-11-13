//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type SubscriptionTopicCanFilterBy,
  type SubscriptionTopicEventTrigger,
  type SubscriptionTopicNotificationShape,
  type SubscriptionTopicResourceTrigger,
  type SubscriptionTopicResourceTriggerQueryCriteria,
  type SubscriptionTopic,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

const subscriptionTopicCanFilterBySchema: ZodType<SubscriptionTopicCanFilterBy> =
  backboneElementSchema.extend({
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

const subscriptionTopicEventTriggerSchema: ZodType<SubscriptionTopicEventTrigger> =
  backboneElementSchema.extend({
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    event: codeableConceptSchema,
    resource: urlSchema,
    _resource: elementSchema.optional(),
  })

const subscriptionTopicNotificationShapeSchema: ZodType<SubscriptionTopicNotificationShape> =
  backboneElementSchema.extend({
    include: stringSchema.array().optional(),
    _include: elementSchema.array().optional(),
    resource: urlSchema,
    _resource: elementSchema.optional(),
    revInclude: stringSchema.array().optional(),
    _revInclude: elementSchema.array().optional(),
  })

const subscriptionTopicResourceTriggerQueryCriteriaSchema: ZodType<SubscriptionTopicResourceTriggerQueryCriteria> =
  backboneElementSchema.extend({
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

const subscriptionTopicResourceTriggerSchema: ZodType<SubscriptionTopicResourceTrigger> =
  backboneElementSchema.extend({
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    fhirPathCriteria: stringSchema.optional(),
    _fhirPathCriteria: elementSchema.optional(),
    queryCriteria:
      subscriptionTopicResourceTriggerQueryCriteriaSchema.optional(),
    resource: urlSchema,
    _resource: elementSchema.optional(),
    supportedInteraction: subscriptionTopicResourceTriggerInteractionSchema
      .array()
      .optional(),
    _supportedInteraction: elementSchema.array().optional(),
  })

/**
 * Zod schema for FHIR SubscriptionTopic resource (untyped version).
 */
export const untypedSubscriptionTopicSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SubscriptionTopic').readonly(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    canFilterBy: subscriptionTopicCanFilterBySchema.array().optional(),
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
    eventTrigger: subscriptionTopicEventTriggerSchema.array().optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    lastReviewDate: dateSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    notificationShape: subscriptionTopicNotificationShapeSchema
      .array()
      .optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    resourceTrigger: subscriptionTopicResourceTriggerSchema.array().optional(),
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

/**
 * Zod schema for FHIR SubscriptionTopic resource.
 */
export const subscriptionTopicSchema: ZodType<SubscriptionTopic> =
  untypedSubscriptionTopicSchema

/**
 * Wrapper class for FHIR SubscriptionTopic resources.
 * Provides utility methods for working with subscription topics that define events for pub/sub notification patterns.
 */
export class FhirSubscriptionTopic extends FhirDomainResource<SubscriptionTopic> {
  // Static Functions

  /**
   * Parses a SubscriptionTopic resource from unknown data.
   *
   * @param value - The data to parse and validate against the SubscriptionTopic schema
   * @returns A FhirSubscriptionTopic instance containing the validated resource
   */
  public static parse(value: unknown): FhirSubscriptionTopic {
    return new FhirSubscriptionTopic(subscriptionTopicSchema.parse(value))
  }

  /**
   * Retrieves all identifier values matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns Array of identifier values from matching systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves the first identifier value matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves all identifier values matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns Array of identifier values from matching types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Retrieves the first identifier value matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
