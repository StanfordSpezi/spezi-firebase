//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type MessageHeader } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirMessageHeader,
  type untypedMessageHeaderSchema,
} from '../../src/index.js'

describe('MessageHeader Resource', () => {
  it('should validate FHIR messageHeader from messageHeaders.json', () => {
    type Schema = z.infer<typeof untypedMessageHeaderSchema>
    expectTypeOf<Schema>().toExtend<MessageHeader>()
    expectTypeOf<MessageHeader>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/messageHeaders.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirMessageHeader.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
