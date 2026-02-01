//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Slot } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirSlot, type untypedSlotSchema } from '../../src/index.js'

describe('Slot Resource', () => {
  it('should validate FHIR slot from slots.json', () => {
    type Schema = z.infer<typeof untypedSlotSchema>
    expectTypeOf<Schema>().toExtend<Slot>()
    expectTypeOf<Slot>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/slots.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirSlot.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
