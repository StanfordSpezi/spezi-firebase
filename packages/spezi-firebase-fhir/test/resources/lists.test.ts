//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type List } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirList, type untypedListSchema } from '../../src/index.js'

describe('List Resource', () => {
  it('should validate FHIR Lists from lists.json', () => {
    type Schema = z.infer<typeof untypedListSchema>
    expectTypeOf<Schema>().toExtend<List>()
    expectTypeOf<List>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/lists.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirList.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
