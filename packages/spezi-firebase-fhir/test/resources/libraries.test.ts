//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Library } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirLibrary, type untypedLibrarySchema } from '../../src/index.js'

describe('Library Resource', () => {
  it('should validate FHIR library from libraries.json', () => {
    type Schema = z.infer<typeof untypedLibrarySchema>
    expectTypeOf<Schema>().toExtend<Library>()
    expectTypeOf<Library>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/libraries.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirLibrary.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
