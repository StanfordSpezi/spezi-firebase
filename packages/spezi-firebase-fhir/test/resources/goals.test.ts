//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirGoal } from '../../src/index.js'

describe('Goal Resource', () => {
  it('should validate FHIR Goals from goals.json', () => {
    const data = fs.readFileSync('test/resources/goals.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirGoal.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
