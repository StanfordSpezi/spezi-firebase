//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ImmunizationEvaluation } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirImmunizationEvaluation,
  type untypedImmunizationEvaluationSchema,
} from '../../src/index.js'

describe('ImmunizationEvaluation Resource', () => {
  it('should validate FHIR immunization evaluations from immunizationEvaluations.json', () => {
    type Schema = z.infer<typeof untypedImmunizationEvaluationSchema>
    expectTypeOf<Schema>().toExtend<ImmunizationEvaluation>()
    expectTypeOf<ImmunizationEvaluation>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/immunizationEvaluations.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirImmunizationEvaluation.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
