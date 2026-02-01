//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type NamingSystem } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirNamingSystem,
  type untypedNamingSystemSchema,
} from '../../src/index.js'

describe('NamingSystem Resource', () => {
  it('should validate FHIR NamingSystems from namingSystems.json', () => {
    type Schema = z.infer<typeof untypedNamingSystemSchema>
    expectTypeOf<Schema>().toExtend<NamingSystem>()
    expectTypeOf<NamingSystem>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/namingSystems.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirNamingSystem.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
