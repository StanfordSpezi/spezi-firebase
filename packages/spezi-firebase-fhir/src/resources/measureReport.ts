//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type MeasureReport,
  type MeasureReportGroup,
  type MeasureReportGroupPopulation,
  type MeasureReportGroupStratifier,
  type MeasureReportGroupStratifierStratum,
  type MeasureReportGroupStratifierStratumPopulation,
  type MeasureReportGroupStratifierStratumComponent,
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
  intSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  measureReportStatusSchema,
  measureReportTypeSchema,
} from '../valueSets/index.js'

const measureReportGroupStratifierStratumComponentSchema: ZodType<MeasureReportGroupStratifierStratumComponent> =
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    value: codeableConceptSchema,
  })

const measureReportGroupStratifierStratumPopulationSchema: ZodType<MeasureReportGroupStratifierStratumPopulation> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    count: intSchema.optional(),
    subjectResults: referenceSchema.optional(),
  })

const measureReportGroupStratifierStratumSchema: ZodType<MeasureReportGroupStratifierStratum> =
  backboneElementSchema.extend({
    value: codeableConceptSchema.optional(),
    component: measureReportGroupStratifierStratumComponentSchema
      .array()
      .optional(),
    population: measureReportGroupStratifierStratumPopulationSchema
      .array()
      .optional(),
    measureScore: quantitySchema.optional(),
  })

const measureReportGroupStratifierSchema: ZodType<MeasureReportGroupStratifier> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.array().optional(),
    stratum: measureReportGroupStratifierStratumSchema.array().optional(),
  })

const measureReportGroupPopulationSchema: ZodType<MeasureReportGroupPopulation> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    count: intSchema.optional(),
    subjectResults: referenceSchema.optional(),
  })

const measureReportGroupSchema: ZodType<MeasureReportGroup> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    population: measureReportGroupPopulationSchema.array().optional(),
    measureScore: quantitySchema.optional(),
    stratifier: measureReportGroupStratifierSchema.array().optional(),
  })

/**
 * Zod schema for FHIR MeasureReport resource (untyped version).
 */
export const untypedMeasureReportSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MeasureReport').readonly(),
    identifier: identifierSchema.array().optional(),
    status: measureReportStatusSchema,
    _status: elementSchema.optional(),
    type: measureReportTypeSchema,
    _type: elementSchema.optional(),
    measure: stringSchema,
    _measure: elementSchema.optional(),
    subject: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    reporter: referenceSchema.optional(),
    period: periodSchema,
    improvementNotation: codeableConceptSchema.optional(),
    group: measureReportGroupSchema.array().optional(),
    evaluatedResource: referenceSchema.array().optional(),
  }),
) satisfies ZodType<MeasureReport>

/**
 * Zod schema for FHIR MeasureReport resource.
 */
export const measureReportSchema: ZodType<MeasureReport> =
  untypedMeasureReportSchema

/**
 * Wrapper class for FHIR MeasureReport resources.
 * Provides utility methods for working with quality measure reports and results.
 */
export class FhirMeasureReport extends FhirDomainResource<MeasureReport> {
  /**
   * Parses a MeasureReport resource from unknown data.
   *
   * @param value - The data to parse and validate against the MeasureReport schema
   * @returns A FhirMeasureReport instance containing the validated resource
   */
  public static parse(value: unknown): FhirMeasureReport {
    return new FhirMeasureReport(measureReportSchema.parse(value))
  }

  /**
   * Get the date the report was generated.
   *
   * @returns The date the report was generated, or undefined if not set
   */
  public get date(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Get the period start of the report.
   *
   * @returns The period start date, or undefined if not set
   */
  public get periodStart(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.period.start)
  }

  /**
   * Get the period end of the report.
   *
   * @returns The period end date, or undefined if not set
   */
  public get periodEnd(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.period.end)
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
