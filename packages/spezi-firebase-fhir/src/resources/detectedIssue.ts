//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type DetectedIssue } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  detectedIssueSeveritySchema,
  detectedIssueStatusSchema,
} from '../valueSets/index.js'

/**
 * Zod schema for FHIR DetectedIssue resource (untyped version).
 */
export const untypedDetectedIssueSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DetectedIssue').readonly(),
    identifier: identifierSchema.array().optional(),
    status: detectedIssueStatusSchema,
    _status: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    severity: detectedIssueSeveritySchema.optional(),
    _severity: elementSchema.optional(),
    patient: referenceSchema.optional(),
    identifiedDateTime: dateTimeSchema.optional(),
    _identifiedDateTime: elementSchema.optional(),
    identifiedPeriod: periodSchema.optional(),
    author: referenceSchema.optional(),
    implicated: referenceSchema.array().optional(),
    evidence: backboneElementSchema
      .extend({
        code: codeableConceptSchema.array().optional(),
        detail: referenceSchema.array().optional(),
      })
      .array()
      .optional(),
    detail: stringSchema.optional(),
    _detail: elementSchema.optional(),
    reference: stringSchema.optional(),
    _reference: elementSchema.optional(),
    mitigation: backboneElementSchema
      .extend({
        action: codeableConceptSchema,
        date: dateTimeSchema.optional(),
        _date: elementSchema.optional(),
        author: referenceSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<DetectedIssue>

/**
 * Zod schema for FHIR DetectedIssue resource.
 */
export const detectedIssueSchema: ZodType<DetectedIssue> =
  untypedDetectedIssueSchema

/**
 * Wrapper class for FHIR DetectedIssue resources.
 * Provides utility methods for working with detected clinical issues.
 */
export class FhirDetectedIssue extends FhirDomainResource<DetectedIssue> {
  /**
   * Parses a DetectedIssue resource from unknown data.
   *
   * @param value - The data to parse and validate against the DetectedIssue schema
   * @returns A FhirDetectedIssue instance containing the validated resource
   */
  public static parse(value: unknown): FhirDetectedIssue {
    return new FhirDetectedIssue(detectedIssueSchema.parse(value))
  }

  /**
   * Gets the date the issue was identified as a JavaScript Date object.
   *
   * @returns The identification date, if available
   */
  public get identifiedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.identifiedDateTime)
  }

  /**
   * Gets the code display for the detected issue.
   *
   * @returns The code display text, if available
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
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
   * @returns Array of identifier values matching any provided Coding
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
