//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Composition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirComposition,
  type untypedCompositionSchema,
} from '../../src/index.js'

describe('Composition Resource', () => {
  it('should validate FHIR Compositions from compositions.json', () => {
    type Schema = z.infer<typeof untypedCompositionSchema>
    expectTypeOf<Schema>().toExtend<Composition>()
    expectTypeOf<Composition>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/compositions.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirComposition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
