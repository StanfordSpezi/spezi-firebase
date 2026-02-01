//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type TestReport } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirTestReport,
  type untypedTestReportSchema,
} from '../../src/index.js'

describe('TestReport Resource', () => {
  it('should validate FHIR test report from testReports.json', () => {
    type Schema = z.infer<typeof untypedTestReportSchema>
    expectTypeOf<Schema>().toExtend<TestReport>()
    expectTypeOf<TestReport>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/testReports.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirTestReport.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
