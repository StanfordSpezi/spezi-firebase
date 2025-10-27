//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type TestReport } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'

const testReportStatusSchema = z.enum([
  'completed',
  'in-progress',
  'waiting',
  'stopped',
  'entered-in-error',
])

const testReportResultSchema = z.enum(['pass', 'fail', 'pending'])

const testReportActionResultSchema = z.enum([
  'pass',
  'skip',
  'fail',
  'warning',
  'error',
])

export const untypedTestReportSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('TestReport').readonly(),
    identifier: z.any().optional(), // Identifier
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    status: testReportStatusSchema,
    _status: elementSchema.optional(),
    testScript: z.any(), // Reference to TestScript
    result: testReportResultSchema,
    _result: elementSchema.optional(),
    score: decimalSchema.optional(),
    tester: stringSchema.optional(),
    _tester: elementSchema.optional(),
    issued: dateTimeSchema.optional(),
    _issued: elementSchema.optional(),
    participant: backboneElementSchema
      .extend({
        type: z.enum(['test-engine', 'client', 'server']),
        _type: elementSchema.optional(),
        uri: uriSchema,
        _uri: elementSchema.optional(),
        display: stringSchema.optional(),
        _display: elementSchema.optional(),
      })
      .array()
      .optional(),
    setup: backboneElementSchema
      .extend({
        action: backboneElementSchema
          .extend({
            operation: backboneElementSchema
              .extend({
                result: testReportActionResultSchema,
                _result: elementSchema.optional(),
                message: stringSchema.optional(),
                _message: elementSchema.optional(),
                detail: uriSchema.optional(),
                _detail: elementSchema.optional(),
              })
              .optional(),
            assert: backboneElementSchema
              .extend({
                result: testReportActionResultSchema,
                _result: elementSchema.optional(),
                message: stringSchema.optional(),
                _message: elementSchema.optional(),
                detail: stringSchema.optional(),
                _detail: elementSchema.optional(),
              })
              .optional(),
          })
          .array(),
      })
      .optional(),
    test: backboneElementSchema
      .extend({
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        action: backboneElementSchema
          .extend({
            operation: backboneElementSchema
              .extend({
                result: testReportActionResultSchema,
                _result: elementSchema.optional(),
                message: stringSchema.optional(),
                _message: elementSchema.optional(),
                detail: uriSchema.optional(),
                _detail: elementSchema.optional(),
              })
              .optional(),
            assert: backboneElementSchema
              .extend({
                result: testReportActionResultSchema,
                _result: elementSchema.optional(),
                message: stringSchema.optional(),
                _message: elementSchema.optional(),
                detail: stringSchema.optional(),
                _detail: elementSchema.optional(),
              })
              .optional(),
          })
          .array(),
      })
      .array()
      .optional(),
    teardown: backboneElementSchema
      .extend({
        action: backboneElementSchema
          .extend({
            operation: backboneElementSchema.extend({
              result: testReportActionResultSchema,
              _result: elementSchema.optional(),
              message: stringSchema.optional(),
              _message: elementSchema.optional(),
              detail: uriSchema.optional(),
              _detail: elementSchema.optional(),
            }),
          })
          .array(),
      })
      .optional(),
  }),
) satisfies ZodType<TestReport>

export const testReportSchema: ZodType<TestReport> =
  untypedTestReportSchema

export class FhirTestReport extends FhirDomainResource<TestReport> {
  public static parse(value: unknown): FhirTestReport {
    return new FhirTestReport(testReportSchema.parse(value))
  }
}
