// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirExplanationOfBenefit } from '../../src/index.js'

describe('ExplanationOfBenefit Resource', () => {
  it('should validate FHIR ExplanationOfBenefits from explanationOfBenefits.json', () => {
    const data = fs.readFileSync(
      'test/resources/explanationOfBenefits.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirExplanationOfBenefit.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
