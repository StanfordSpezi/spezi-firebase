//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirMedication } from '../../src/index.js'

describe('Medication Resource', () => {
  it('should validate FHIR medications from medications.json', () => {
    const data = fs.readFileSync('test/resources/medications.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    // drugs.json contains nested structure: {categoryId: {drugId: medicationResource}}
    Object.values(decodedJson).forEach((categoryData: any) => {
      Object.values(categoryData).forEach((medicationData: unknown) => {
        const fhirResource = FhirMedication.parse(medicationData).value
        expect(jsonStringifyDeterministically(medicationData)).toBe(
          jsonStringifyDeterministically(fhirResource),
        )
      })
    })
  })
})
