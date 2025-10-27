//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirGuidanceResponse } from '../../src/index.js'

describe('GuidanceResponse Resource', () => {
  it('should validate FHIR guidance responses from guidanceResponses.json', () => {
    const data = fs.readFileSync(
      'test/resources/guidanceResponses.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const fhirResource = FhirGuidanceResponse.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(fhirResource),
      )
    })
  })
})
