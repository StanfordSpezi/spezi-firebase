//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Observation } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirObservation,
  type untypedObservationSchema,
} from '../../src/index.js'

describe('Observation Resource', () => {
  it('should validate FHIR observation from observation.json', () => {
    type Schema = z.infer<typeof untypedObservationSchema>
    expectTypeOf<Schema>().toExtend<Observation>()
    expectTypeOf<Observation>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/observations.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirObservation.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
