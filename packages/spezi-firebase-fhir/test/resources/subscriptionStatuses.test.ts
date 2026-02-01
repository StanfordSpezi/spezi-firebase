//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type SubscriptionStatus } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirSubscriptionStatus,
  type untypedSubscriptionStatusSchema,
} from '../../src/index.js'

describe('SubscriptionStatus Resource', () => {
  it('should validate FHIR subscription status from subscriptionStatuses.json', () => {
    type Schema = z.infer<typeof untypedSubscriptionStatusSchema>
    expectTypeOf<Schema>().toExtend<SubscriptionStatus>()
    expectTypeOf<SubscriptionStatus>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/subscriptionStatuses.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirSubscriptionStatus.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
