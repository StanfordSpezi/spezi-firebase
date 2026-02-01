//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type BodyStructure } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirBodyStructure,
  type untypedBodyStructureSchema,
} from '../../src/index.js'

describe('BodyStructure Resource', () => {
  it('should validate FHIR BodyStructures from bodyStructures.json', () => {
    type Schema = z.infer<typeof untypedBodyStructureSchema>
    expectTypeOf<Schema>().toExtend<BodyStructure>()
    expectTypeOf<BodyStructure>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/bodyStructures.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirBodyStructure.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
