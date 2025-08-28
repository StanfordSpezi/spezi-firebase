//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirQuestionnaire } from '../../src/index.js'

describe('Questionnaire Resource', () => {
  it('should validate FHIR questionnaires from questionnaires.json', () => {
    const data = fs.readFileSync('test/resources/questionnaires.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const fhirResource = FhirQuestionnaire.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(fhirResource),
      )
    })
  })
})
