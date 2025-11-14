//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type RequestGroup,
  type RequestGroupAction,
  type RequestGroupActionCondition,
  type RequestGroupActionRelatedAction,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

/**
 * Zod schema for FHIR RequestGroup resource (untyped version).
 */
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

/**
 * Zod schema for FHIR RequestGroup resource.
 */
export const requestGroupSchema: ZodType<RequestGroup> =
  untypedRequestGroupSchema

/**
 * Wrapper class for FHIR RequestGroup resources.
 * Provides utility methods for working with request groups and coordinated care activities.
 */
export class FhirRequestGroup extends FhirDomainResource<RequestGroup> {
  /**
   * Parses a RequestGroup resource from unknown data.
   *
   * @param value - The data to parse and validate against the RequestGroup schema
   * @returns A FhirRequestGroup instance containing the validated resource
   */
  public static parse(value: unknown): FhirRequestGroup {
    return new FhirRequestGroup(requestGroupSchema.parse(value))
  }

  /**
   * Get the authored date.
   *
   * @returns The authored date, or undefined if not set
   */
  public get authoredDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.authoredOn)
  }

  /**
   * Get the code display for the request group.
   *
   * @returns The code display text, or undefined if not set
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Get note texts from the request group.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided type
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
