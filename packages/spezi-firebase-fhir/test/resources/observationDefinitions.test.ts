//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ObservationDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirObservationDefinition,
  type untypedObservationDefinitionSchema,
} from '../../src/index.js'

describe('ObservationDefinition Resource', () => {
  it('should validate FHIR ObservationDefinitions from observationDefinitions.json', () => {
    type Schema = z.infer<typeof untypedObservationDefinitionSchema>
    expectTypeOf<Schema>().toExtend<ObservationDefinition>()
    expectTypeOf<ObservationDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/observationDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirObservationDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
