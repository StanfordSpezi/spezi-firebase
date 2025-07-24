//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { medicationSchema } from '../../src/resources/medication.js'

describe('Medication Resource', () => {
  it('should validate FHIR medications from drugs.json', () => {
    const data = fs.readFileSync(__dirname + '/drugs.json', 'utf-8')
    const decodedJson = JSON.parse(data)
    
    // drugs.json contains nested structure: {categoryId: {drugId: medicationResource}}
    Object.values(decodedJson).forEach((categoryData: any) => {
      Object.values(categoryData).forEach((medicationData: any) => {
        const fhirResource = medicationSchema.parse(medicationData)
        expect(JSON.stringify(medicationData)).toBe(JSON.stringify(fhirResource))
      })
    })
  })
})