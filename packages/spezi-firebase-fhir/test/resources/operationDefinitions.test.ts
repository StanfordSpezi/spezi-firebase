//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type OperationDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirOperationDefinition,
  type untypedOperationDefinitionSchema,
} from '../../src/index.js'

describe('OperationDefinition Resource', () => {
  it('should validate FHIR operation definition from operationDefinitions.json', () => {
    type Schema = z.infer<typeof untypedOperationDefinitionSchema>
    expectTypeOf<Schema>().toExtend<OperationDefinition>()
    expectTypeOf<OperationDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/operationDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirOperationDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
