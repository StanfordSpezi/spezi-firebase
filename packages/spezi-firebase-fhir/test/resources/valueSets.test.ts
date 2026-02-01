//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ValueSet } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirValueSet, type untypedValueSetSchema } from '../../src/index.js'

describe('ValueSet Resource', () => {
  it('should validate FHIR ValueSets from valueSets.json', () => {
    type Schema = z.infer<typeof untypedValueSetSchema>
    expectTypeOf<Schema>().toExtend<ValueSet>()
    expectTypeOf<ValueSet>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/valueSets.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirValueSet.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
