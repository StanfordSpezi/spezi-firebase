//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Flag } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirFlag, type untypedFlagSchema } from '../../src/index.js'

describe('Flag Resource', () => {
  it('should validate FHIR Flags from flags.json', () => {
    type Schema = z.infer<typeof untypedFlagSchema>
    expectTypeOf<Schema>().toExtend<Flag>()
    expectTypeOf<Flag>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/flags.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirFlag.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
