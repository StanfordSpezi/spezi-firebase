//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ActivityDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirActivityDefinition,
  type untypedActivityDefinitionSchema,
} from '../../src/index.js'

describe('ActivityDefinition Resource', () => {
  it('should validate FHIR activity definitions from activityDefinitions.json', () => {
    type Schema = z.infer<typeof untypedActivityDefinitionSchema>
    expectTypeOf<Schema>().toExtend<ActivityDefinition>()
    expectTypeOf<ActivityDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/activityDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirActivityDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
