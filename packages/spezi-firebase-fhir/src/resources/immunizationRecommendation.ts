//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ImmunizationRecommendationRecommendation,
  type ImmunizationRecommendationRecommendationDateCriterion,
  type ImmunizationRecommendation,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  positiveIntSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const immunizationRecommendationRecommendationDateCriterionSchema: ZodType<ImmunizationRecommendationRecommendationDateCriterion> =
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    value: dateTimeSchema,
    _value: elementSchema.optional(),
  })

const immunizationRecommendationRecommendationSchema: ZodType<ImmunizationRecommendationRecommendation> =
  backboneElementSchema.extend({
    vaccineCode: codeableConceptSchema.array().optional(),
    targetDisease: codeableConceptSchema.optional(),
    contraindicatedVaccineCode: codeableConceptSchema.array().optional(),
    forecastStatus: codeableConceptSchema,
    forecastReason: codeableConceptSchema.array().optional(),
    dateCriterion: immunizationRecommendationRecommendationDateCriterionSchema
      .array()
      .optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    series: stringSchema.optional(),
    _series: elementSchema.optional(),
    doseNumberPositiveInt: positiveIntSchema.optional(),
    doseNumberString: stringSchema.optional(),
    _doseNumberString: elementSchema.optional(),
    seriesDosesPositiveInt: positiveIntSchema.optional(),
    seriesDosesString: stringSchema.optional(),
    _seriesDosesString: elementSchema.optional(),
    supportingImmunization: referenceSchema.array().optional(),
    supportingPatientInformation: referenceSchema.array().optional(),
  })

/**
 * Zod schema for FHIR ImmunizationRecommendation resource (untyped version).
 */
export const untypedImmunizationRecommendationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ImmunizationRecommendation').readonly(),
    identifier: identifierSchema.array().optional(),
    patient: referenceSchema,
    date: dateTimeSchema,
    _date: elementSchema.optional(),
    authority: referenceSchema.optional(),
    recommendation: immunizationRecommendationRecommendationSchema.array(),
  }),
) satisfies ZodType<ImmunizationRecommendation>

/**
 * Zod schema for FHIR ImmunizationRecommendation resource.
 */
export const immunizationRecommendationSchema: ZodType<ImmunizationRecommendation> =
  untypedImmunizationRecommendationSchema

/**
 * Wrapper class for FHIR ImmunizationRecommendation resources.
 * Provides utility methods for working with immunization recommendations and forecasts.
 */
export class FhirImmunizationRecommendation extends FhirDomainResource<ImmunizationRecommendation> {
  // Static Functions

  /**
   * Parses an ImmunizationRecommendation resource from unknown data.
   *
   * @param value - The data to parse and validate against the ImmunizationRecommendation schema
   * @returns A FhirImmunizationRecommendation instance containing the validated resource
   */
  public static parse(value: unknown): FhirImmunizationRecommendation {
    return new FhirImmunizationRecommendation(
      immunizationRecommendationSchema.parse(value),
    )
  }

  /**
   * Get the recommendation date as a Date object.
   * @returns The recommendation date
   */
  public get recommendationDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Get all vaccine code displays from recommendations.
   * @returns Array of vaccine code display texts
   */
  public get vaccineCodeDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(
      this.value.recommendation.flatMap((rec) =>
        rec.vaccineCode ? rec.vaccineCode : [],
      ),
    )
  }

  /**
   * Get all target disease displays from recommendations.
   * @returns Array of target disease display texts
   */
  public get targetDiseaseDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(
      this.value.recommendation.flatMap((rec) =>
        rec.targetDisease ? [rec.targetDisease] : [],
      ),
    )
  }

  /**
   * Get all forecast status displays from recommendations.
   * @returns Array of forecast status display texts
   */
  public get forecastStatusDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(
      this.value.recommendation.map((rec) => rec.forecastStatus),
    )
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
