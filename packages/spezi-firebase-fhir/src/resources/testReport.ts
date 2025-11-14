//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type TestReportParticipant,
  type TestReportSetup,
  type TestReportSetupAction,
  type TestReportSetupActionAssert,
  type TestReportSetupActionOperation,
  type TestReportTeardown,
  type TestReportTeardownAction,
  type TestReportTest,
  type TestReportTestAction,
  type TestReport,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

const testReportSetupActionOperationSchema: ZodType<TestReportSetupActionOperation> =
  backboneElementSchema.extend({
    detail: urlSchema.optional(),
    _detail: elementSchema.optional(),
    message: stringSchema.optional(),
    _message: elementSchema.optional(),
    result: testReportActionResultSchema,
    _result: elementSchema.optional(),
  })

const testReportSetupActionAssertSchema: ZodType<TestReportSetupActionAssert> =
  backboneElementSchema.extend({
    detail: urlSchema.optional(),
    _detail: elementSchema.optional(),
    message: stringSchema.optional(),
    _message: elementSchema.optional(),
    result: testReportActionResultSchema,
    _result: elementSchema.optional(),
  })

const testReportParticipantSchema: ZodType<TestReportParticipant> =
  backboneElementSchema.extend({
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
    type: testReportParticipantTypeSchema,
    _type: elementSchema.optional(),
    uri: urlSchema,
    _uri: elementSchema.optional(),
  })

const testReportSetupActionSchema: ZodType<TestReportSetupAction> =
  backboneElementSchema.extend({
    assert: testReportSetupActionAssertSchema.optional(),
    operation: testReportSetupActionOperationSchema.optional(),
  })

const testReportSetupSchema: ZodType<TestReportSetup> =
  backboneElementSchema.extend({
    action: testReportSetupActionSchema.array(),
  })

const testReportTeardownActionSchema: ZodType<TestReportTeardownAction> =
  backboneElementSchema.extend({
    operation: testReportSetupActionOperationSchema,
  })

const testReportTeardownSchema: ZodType<TestReportTeardown> =
  backboneElementSchema.extend({
    action: testReportTeardownActionSchema.array(),
  })

const testReportTestActionSchema: ZodType<TestReportTestAction> =
  backboneElementSchema.extend({
    assert: testReportSetupActionAssertSchema.optional(),
    operation: testReportSetupActionOperationSchema.optional(),
  })

const testReportTestSchema: ZodType<TestReportTest> =
  backboneElementSchema.extend({
    action: testReportTestActionSchema.array(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR TestReport resource (untyped version).
 */
export const untypedTestReportSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('TestReport').readonly(),
    identifier: identifierSchema.optional(),
    issued: instantSchema.optional(),
    _issued: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    participant: testReportParticipantSchema.array().optional(),
    result: testReportResultSchema,
    _result: elementSchema.optional(),
    score: decimalSchema.optional(),
    setup: testReportSetupSchema.optional(),
    status: testReportStatusSchema,
    _status: elementSchema.optional(),
    teardown: testReportTeardownSchema.optional(),
    test: testReportTestSchema.array().optional(),
    tester: stringSchema.optional(),
    _tester: elementSchema.optional(),
    testScript: referenceSchema,
  }),
) satisfies ZodType<TestReport>

/**
 * Zod schema for FHIR TestReport resource.
 */
export const testReportSchema: ZodType<TestReport> = untypedTestReportSchema

/**
 * Wrapper class for FHIR TestReport resources.
 * Provides utility methods for working with test reports that describe the results of executing a TestScript.
 */
export class FhirTestReport extends FhirDomainResource<TestReport> {
  // Static Functions

  /**
   * Parses a TestReport resource from unknown data.
   *
   * @param value - The data to parse and validate against the TestReport schema
   * @returns A FhirTestReport instance containing the validated resource
   */
  public static parse(value: unknown): FhirTestReport {
    return new FhirTestReport(testReportSchema.parse(value))
  }
}
