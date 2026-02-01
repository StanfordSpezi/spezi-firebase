//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Communication } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirCommunication,
  type untypedCommunicationSchema,
} from '../../src/index.js'

describe('Communication Resource', () => {
  it('should validate FHIR Communications from communications.json', () => {
    type Schema = z.infer<typeof untypedCommunicationSchema>
    expectTypeOf<Schema>().toExtend<Communication>()
    expectTypeOf<Communication>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/communications.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirCommunication.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
