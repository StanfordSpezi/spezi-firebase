//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type MeasureReport } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirMeasureReport,
  type untypedMeasureReportSchema,
} from '../../src/index.js'

describe('MeasureReport Resource', () => {
  it('should validate FHIR measure reports from measureReports.json', () => {
    type Schema = z.infer<typeof untypedMeasureReportSchema>
    expectTypeOf<Schema>().toExtend<MeasureReport>()
    expectTypeOf<MeasureReport>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/measureReports.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirMeasureReport.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
