//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type RiskAssessment } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirRiskAssessment,
  type untypedRiskAssessmentSchema,
} from '../../src/index.js'

describe('RiskAssessment Resource', () => {
  it('should validate FHIR risk assessment from riskAssessments.json', () => {
    type Schema = z.infer<typeof untypedRiskAssessmentSchema>
    expectTypeOf<Schema>().toExtend<RiskAssessment>()
    expectTypeOf<RiskAssessment>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/riskAssessments.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirRiskAssessment.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
