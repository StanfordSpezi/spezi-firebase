//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type NutritionProduct } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirNutritionProduct,
  type untypedNutritionProductSchema,
} from '../../src/index.js'

describe('NutritionProduct Resource', () => {
  it('should validate FHIR nutritionProduct from nutritionProducts.json', () => {
    type Schema = z.infer<typeof untypedNutritionProductSchema>
    expectTypeOf<Schema>().toExtend<NutritionProduct>()
    expectTypeOf<NutritionProduct>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/nutritionProducts.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirNutritionProduct.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
