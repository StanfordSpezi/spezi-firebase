//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type MessageDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirMessageDefinition,
  type untypedMessageDefinitionSchema,
} from '../../src/index.js'

describe('MessageDefinition Resource', () => {
  it('should validate FHIR message definition from messageDefinitions.json', () => {
    type Schema = z.infer<typeof untypedMessageDefinitionSchema>
    expectTypeOf<Schema>().toExtend<MessageDefinition>()
    expectTypeOf<MessageDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/messageDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirMessageDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
