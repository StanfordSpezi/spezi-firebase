//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ConceptMap } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirConceptMap,
  type untypedConceptMapSchema,
} from '../../src/index.js'

describe('ConceptMap Resource', () => {
  it('should validate FHIR ConceptMaps from conceptMaps.json', () => {
    type Schema = z.infer<typeof untypedConceptMapSchema>
    expectTypeOf<Schema>().toExtend<ConceptMap>()
    expectTypeOf<ConceptMap>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/conceptMaps.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirConceptMap.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
