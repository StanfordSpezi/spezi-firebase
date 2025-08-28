//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { medicationAdministrationSchema } from '../../src/index.js'

describe('MedicationAdministration Resource', () => {
  it('should validate FHIR medication administrations from medicationAdministrations.json', () => {
    const data = fs.readFileSync(
      'test/resources/medicationAdministrations.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = medicationAdministrationSchema.parse(jsonValue)
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
