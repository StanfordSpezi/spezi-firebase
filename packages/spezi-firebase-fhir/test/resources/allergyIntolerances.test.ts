//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type AllergyIntolerance } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirAllergyIntolerance,
  type untypedAllergyIntoleranceSchema,
} from '../../src/index.js'

describe('AllergyIntolerance Resource', () => {
  it('should validate FHIR allergyIntolerance from allergyIntolerances.json', () => {
    type Schema = z.infer<typeof untypedAllergyIntoleranceSchema>
    expectTypeOf<Schema>().toExtend<AllergyIntolerance>()
    expectTypeOf<AllergyIntolerance>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/allergyIntolerances.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirAllergyIntolerance.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
