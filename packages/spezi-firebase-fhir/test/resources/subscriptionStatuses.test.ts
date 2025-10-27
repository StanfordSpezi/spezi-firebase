//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirSubscriptionStatus } from '../../src/index.js'

describe('SubscriptionStatus Resource', () => {
  it('should validate FHIR subscription statuses from subscriptionStatuses.json', () => {
    const data = fs.readFileSync(
      'test/resources/subscriptionStatuses.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const fhirResource = FhirSubscriptionStatus.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(fhirResource),
      )
    })
  })
})
