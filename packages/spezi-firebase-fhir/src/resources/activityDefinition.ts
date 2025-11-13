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
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

/**
 * Zod schema for FHIR ActivityDefinition resource (untyped version).
 */
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

/**
 * Zod schema for FHIR ActivityDefinition resource.
 */
export const activityDefinitionSchema: ZodType<ActivityDefinition> =
  untypedActivityDefinitionSchema

/**
 * Wrapper class for FHIR ActivityDefinition resources.
 * Provides utility methods for working with activity definitions and their effective periods.
 */
export class FhirActivityDefinition extends FhirDomainResource<ActivityDefinition> {
  // Static Functions

  /**
   * Parses an ActivityDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the ActivityDefinition schema
   * @returns A FhirActivityDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirActivityDefinition {
    return new FhirActivityDefinition(activityDefinitionSchema.parse(value))
  }

  /**
   * Get the publication date as a Date object.
   * @returns The publication date, or undefined if not set
   */
  public get publicationDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Get the approval date as a Date object.
   * @returns The approval date, or undefined if not set
   */
  public get approvalDate(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.approvalDate)
  }

  /**
   * Get the last review date as a Date object.
   * @returns The last review date, or undefined if not set
   */
  public get lastReviewDate(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.lastReviewDate)
  }

  /**
   * Get effective period start date.
   * @returns The start date, or undefined if not set
   */
  public get effectivePeriodStart(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.effectivePeriod?.start)
  }

  /**
   * Get effective period end date.
   * @returns The end date, or undefined if not set
   */
  public get effectivePeriodEnd(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.effectivePeriod?.end)
  }

  /**
   * Check if the activity definition is currently effective.
   * @param asOfDate Optional date to check against (defaults to current date)
   * @returns True if currently within effective period
   */
  public isCurrentlyEffective(asOfDate?: Date): boolean {
    return FhirDomainResource.periodIsActive(
      this.value.effectivePeriod,
      asOfDate,
    )
  }

  /**
   * Get code display text.
   * @returns Code display text
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }

  /**
   * Get topic displays from all topics.
   * @returns Array of topic display texts
   */
  public get topicDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.topic)
  }

  /**
   * Get jurisdiction displays.
   * @returns Array of jurisdiction display texts
   */
  public get jurisdictionDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.jurisdiction)
  }
}
