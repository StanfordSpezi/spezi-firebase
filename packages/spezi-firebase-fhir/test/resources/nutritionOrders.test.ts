//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type NutritionOrder } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirNutritionOrder,
  type untypedNutritionOrderSchema,
} from '../../src/index.js'

describe('NutritionOrder Resource', () => {
  it('should validate FHIR nutritionOrder from nutritionOrders.json', () => {
    type Schema = z.infer<typeof untypedNutritionOrderSchema>
    expectTypeOf<Schema>().toExtend<NutritionOrder>()
    expectTypeOf<NutritionOrder>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/nutritionOrders.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirNutritionOrder.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
