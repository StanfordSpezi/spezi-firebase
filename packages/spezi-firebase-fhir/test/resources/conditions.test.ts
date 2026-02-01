//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Condition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirCondition, type untypedConditionSchema } from '../../src/index.js'

describe('Condition Resource', () => {
  it('should validate FHIR Conditions from conditions.json', () => {
    type Schema = z.infer<typeof untypedConditionSchema>
    expectTypeOf<Schema>().toExtend<Condition>()
    expectTypeOf<Condition>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/conditions.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirCondition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
