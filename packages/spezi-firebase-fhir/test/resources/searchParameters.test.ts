//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirSearchParameter } from '../../src/index.js'

describe('SearchParameter Resource', () => {
  it('should validate FHIR search parameters from searchParameters.json', () => {
    const data = fs.readFileSync(
      'test/resources/searchParameters.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const fhirResource = FhirSearchParameter.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(fhirResource),
      )
    })
  })
})
