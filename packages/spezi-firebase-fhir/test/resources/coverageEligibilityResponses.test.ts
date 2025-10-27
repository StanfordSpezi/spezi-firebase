//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirCoverageEligibilityResponse } from '../../src/index.js'

describe('CoverageEligibilityResponse Resource', () => {
  it('should validate FHIR coverageEligibilityResponse from coverageEligibilityResponses.json', () => {
    const data = fs.readFileSync('test/resources/coverageEligibilityResponses.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirCoverageEligibilityResponse.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
