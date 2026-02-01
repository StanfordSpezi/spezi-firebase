//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Measure } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirMeasure, type untypedMeasureSchema } from '../../src/index.js'

describe('Measure Resource', () => {
  it('should validate FHIR measures from measures.json', () => {
    type Schema = z.infer<typeof untypedMeasureSchema>
    expectTypeOf<Schema>().toExtend<Measure>()
    expectTypeOf<Measure>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/measures.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirMeasure.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
