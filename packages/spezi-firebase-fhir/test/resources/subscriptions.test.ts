//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Subscription } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirSubscription,
  type untypedSubscriptionSchema,
} from '../../src/index.js'

describe('Subscription Resource', () => {
  it('should validate FHIR subscription from subscriptions.json', () => {
    type Schema = z.infer<typeof untypedSubscriptionSchema>
    expectTypeOf<Schema>().toExtend<Subscription>()
    expectTypeOf<Subscription>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/subscriptions.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirSubscription.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
