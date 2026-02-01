//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type EvidenceReport } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirEvidenceReport,
  type untypedEvidenceReportSchema,
} from '../../src/index.js'

describe('EvidenceReport Resource', () => {
  it('should validate FHIR evidence reports from evidenceReports.json', () => {
    type Schema = z.infer<typeof untypedEvidenceReportSchema>
    expectTypeOf<Schema>().toExtend<EvidenceReport>()
    expectTypeOf<EvidenceReport>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/evidenceReports.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirEvidenceReport.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
