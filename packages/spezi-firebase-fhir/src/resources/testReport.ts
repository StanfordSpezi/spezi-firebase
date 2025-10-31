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
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  referenceSchema,
  stringSchema,
  urlSchema,
} from '../elements/index.js'
import {
  testReportActionResultSchema,
  testReportParticipantTypeSchema,
  testReportResultSchema,
  testReportStatusSchema,
} from '../valueSets/index.js'

const testReportSetupActionOperationSchema = backboneElementSchema.extend({
  detail: urlSchema.optional(),
  _detail: elementSchema.optional(),
  message: stringSchema.optional(),
  _message: elementSchema.optional(),
  result: testReportActionResultSchema,
  _result: elementSchema.optional(),
})

const testReportSetupActionAssertSchema = backboneElementSchema.extend({
  detail: urlSchema.optional(),
  _detail: elementSchema.optional(),
  message: stringSchema.optional(),
  _message: elementSchema.optional(),
  result: testReportActionResultSchema,
  _result: elementSchema.optional(),
})

export const untypedTestReportSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('TestReport').readonly(),
    identifier: identifierSchema.optional(),
    issued: instantSchema.optional(),
    _issued: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    participant: backboneElementSchema
      .extend({
        display: stringSchema.optional(),
        _display: elementSchema.optional(),
        type: testReportParticipantTypeSchema,
        _type: elementSchema.optional(),
        uri: urlSchema,
        _uri: elementSchema.optional(),
      })
      .array()
      .optional(),
    result: testReportResultSchema,
    _result: elementSchema.optional(),
    score: decimalSchema.optional(),
    setup: backboneElementSchema
      .extend({
        action: backboneElementSchema
          .extend({
            assert: testReportSetupActionAssertSchema.optional(),
            operation: testReportSetupActionOperationSchema.optional(),
          })
          .array(),
      })
      .optional(),
    status: testReportStatusSchema,
    _status: elementSchema.optional(),
    teardown: backboneElementSchema
      .extend({
        action: backboneElementSchema
          .extend({
            operation: testReportSetupActionOperationSchema,
          })
          .array(),
      })
      .optional(),
    test: backboneElementSchema
      .extend({
        action: backboneElementSchema
          .extend({
            assert: testReportSetupActionAssertSchema.optional(),
            operation: testReportSetupActionOperationSchema.optional(),
          })
          .array(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
      })
      .array()
      .optional(),
    tester: stringSchema.optional(),
    _tester: elementSchema.optional(),
    testScript: referenceSchema,
  }),
) satisfies ZodType<TestReport>

export const testReportSchema: ZodType<TestReport> = untypedTestReportSchema

export class FhirTestReport extends FhirDomainResource<TestReport> {
  // Static Functions

  public static parse(value: unknown): FhirTestReport {
    return new FhirTestReport(testReportSchema.parse(value))
  }
}
