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
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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
  z.lazy(() =>
    backboneElementSchema.extend({
      code: codeableConceptSchema,
      value: codeableConceptSchema,
    }),
  )

const measureReportGroupStratifierStratumPopulationSchema: ZodType<MeasureReportGroupStratifierStratumPopulation> =
  z.lazy(() =>
    backboneElementSchema.extend({
      code: codeableConceptSchema.optional(),
      count: intSchema.optional(),
      subjectResults: referenceSchema.optional(),
    }),
  )

const measureReportGroupStratifierStratumSchema: ZodType<MeasureReportGroupStratifierStratum> =
  z.lazy(() =>
    backboneElementSchema.extend({
      value: codeableConceptSchema.optional(),
      component: measureReportGroupStratifierStratumComponentSchema
        .array()
        .optional(),
      population: measureReportGroupStratifierStratumPopulationSchema
        .array()
        .optional(),
      measureScore: quantitySchema.optional(),
    }),
  )

const measureReportGroupStratifierSchema: ZodType<MeasureReportGroupStratifier> =
  z.lazy(() =>
    backboneElementSchema.extend({
      code: codeableConceptSchema.array().optional(),
      stratum: measureReportGroupStratifierStratumSchema.array().optional(),
    }),
  )

const measureReportGroupPopulationSchema: ZodType<MeasureReportGroupPopulation> =
  z.lazy(() =>
    backboneElementSchema.extend({
      code: codeableConceptSchema.optional(),
      count: intSchema.optional(),
      subjectResults: referenceSchema.optional(),
    }),
  )

const measureReportGroupSchema: ZodType<MeasureReportGroup> = z.lazy(() =>
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    population: measureReportGroupPopulationSchema.array().optional(),
    measureScore: quantitySchema.optional(),
    stratifier: measureReportGroupStratifierSchema.array().optional(),
  }),
)

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

export const measureReportSchema: ZodType<MeasureReport> =
  untypedMeasureReportSchema

export class FhirMeasureReport extends FhirDomainResource<MeasureReport> {
  // Static Functions

  public static parse(value: unknown): FhirMeasureReport {
    return new FhirMeasureReport(measureReportSchema.parse(value))
  }
}
