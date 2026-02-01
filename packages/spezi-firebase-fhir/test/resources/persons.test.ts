//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Person } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirPerson, type untypedPersonSchema } from '../../src/index.js'

describe('Person Resource', () => {
  it('should validate FHIR person from persons.json', () => {
    type Schema = z.infer<typeof untypedPersonSchema>
    expectTypeOf<Schema>().toExtend<Person>()
    expectTypeOf<Person>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/persons.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirPerson.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
