//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MeasureReport } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  canonicalSchema,
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

const measureReportStatusSchema = z.enum([
  'complete',
  'pending',
  'error',
])

const measureReportTypeSchema = z.enum([
  'individual',
  'subject-list',
  'summary',
  'data-collection',
])

export const untypedMeasureReportSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MeasureReport').readonly(),
    identifier: identifierSchema.array().optional(),
    status: measureReportStatusSchema,
    _status: elementSchema.optional(),
    type: measureReportTypeSchema,
    _type: elementSchema.optional(),
    measure: canonicalSchema,
    _measure: elementSchema.optional(),
    subject: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    reporter: referenceSchema.optional(),
    period: periodSchema,
    improvementNotation: codeableConceptSchema.optional(),
    group: elementSchema
      .extend({
        code: codeableConceptSchema.optional(),
        population: elementSchema
          .extend({
            code: codeableConceptSchema.optional(),
            count: intSchema.optional(),
            subjectResults: referenceSchema.optional(),
          })
          .array()
          .optional(),
        measureScore: quantitySchema.optional(),
        stratifier: elementSchema
          .extend({
            code: codeableConceptSchema.array().optional(),
            stratum: elementSchema
              .extend({
                value: codeableConceptSchema.optional(),
                component: elementSchema
                  .extend({
                    code: codeableConceptSchema,
                    value: codeableConceptSchema,
                  })
                  .array()
                  .optional(),
                population: elementSchema
                  .extend({
                    code: codeableConceptSchema.optional(),
                    count: intSchema.optional(),
                    subjectResults: referenceSchema.optional(),
                  })
                  .array()
                  .optional(),
                measureScore: quantitySchema.optional(),
              })
              .array()
              .optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
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
