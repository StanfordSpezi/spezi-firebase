//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type ClinicalImpression,
  type ClinicalImpressionFinding,
  type ClinicalImpressionInvestigation,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
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
import { clinicalImpressionStatusSchema } from '../valueSets/index.js'

const clinicalImpressionFindingSchema: ZodType<ClinicalImpressionFinding> =
  backboneElementSchema.extend({
    itemCodeableConcept: codeableConceptSchema.optional(),
    itemReference: referenceSchema.optional(),
    basis: stringSchema.optional(),
    _basis: elementSchema.optional(),
  })

const clinicalImpressionInvestigationSchema: ZodType<ClinicalImpressionInvestigation> =
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    item: referenceSchema.array().optional(),
  })

/**
 * Zod schema for FHIR ClinicalImpression resource (untyped version).
 */
export const untypedClinicalImpressionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ClinicalImpression').readonly(),
    identifier: identifierSchema.array().optional(),
    status: clinicalImpressionStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    code: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    effectiveDateTime: dateTimeSchema.optional(),
    _effectiveDateTime: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    assessor: referenceSchema.optional(),
    previous: referenceSchema.optional(),
    problem: referenceSchema.array().optional(),
    investigation: clinicalImpressionInvestigationSchema.array().optional(),
    protocol: z.string().array().optional(),
    _protocol: elementSchema.array().optional(),
    summary: stringSchema.optional(),
    _summary: elementSchema.optional(),
    finding: clinicalImpressionFindingSchema.array().optional(),
    prognosisCodeableConcept: codeableConceptSchema.array().optional(),
    prognosisReference: referenceSchema.array().optional(),
    supportingInfo: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<ClinicalImpression>

/**
 * Zod schema for FHIR ClinicalImpression resource.
 */
export const clinicalImpressionSchema: ZodType<ClinicalImpression> =
  untypedClinicalImpressionSchema

/**
 * Wrapper class for FHIR ClinicalImpression resources.
 * Provides utility methods for working with clinical assessments and impressions.
 */
export class FhirClinicalImpression extends FhirDomainResource<ClinicalImpression> {
  /**
   * Parses a ClinicalImpression resource from unknown data.
   *
   * @param value - The data to parse and validate against the ClinicalImpression schema
   * @returns A FhirClinicalImpression instance containing the validated resource
   */
  public static parse(value: unknown): FhirClinicalImpression {
    return new FhirClinicalImpression(clinicalImpressionSchema.parse(value))
  }

  /**
   * Gets the date of the clinical impression as a JavaScript Date object.
   *
   * @returns The impression date, if available
   */
  public get date(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Gets the effective date/time as a JavaScript Date object.
   *
   * @returns The effective date, if available
   */
  public get effectiveDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.effectiveDateTime)
  }

  /**
   * Gets note texts from the impression.
   *
   * @returns Array of note text strings
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
