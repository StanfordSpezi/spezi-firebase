//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type CarePlan } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirCarePlan, type untypedCarePlanSchema } from '../../src/index.js'

describe('CarePlan Resource', () => {
  it('should validate FHIR CarePlans from carePlans.json', () => {
    type Schema = z.infer<typeof untypedCarePlanSchema>
    expectTypeOf<Schema>().toExtend<CarePlan>()
    expectTypeOf<CarePlan>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/carePlans.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirCarePlan.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
