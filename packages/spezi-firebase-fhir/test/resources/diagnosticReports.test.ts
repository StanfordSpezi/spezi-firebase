// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type DiagnosticReport } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirDiagnosticReport,
  type untypedDiagnosticReportSchema,
} from '../../src/index.js'

describe('DiagnosticReport Resource', () => {
  it('should validate FHIR DiagnosticReports from diagnosticReports.json', () => {
    type Schema = z.infer<typeof untypedDiagnosticReportSchema>
    expectTypeOf<Schema>().toExtend<DiagnosticReport>()
    expectTypeOf<DiagnosticReport>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/diagnosticReports.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirDiagnosticReport.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
