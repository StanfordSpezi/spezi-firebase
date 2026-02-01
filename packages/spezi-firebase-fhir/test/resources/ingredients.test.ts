//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Ingredient } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirIngredient,
  type untypedIngredientSchema,
} from '../../src/index.js'

describe('Ingredient Resource', () => {
  it('should validate FHIR ingredient from ingredients.json', () => {
    type Schema = z.infer<typeof untypedIngredientSchema>
    expectTypeOf<Schema>().toExtend<Ingredient>()
    expectTypeOf<Ingredient>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/ingredients.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirIngredient.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
