//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Medication } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirMedication,
  type untypedMedicationSchema,
} from '../../src/index.js'

describe('Medication Resource', () => {
  it('should validate FHIR medications from medications.json', () => {
    type Schema = z.infer<typeof untypedMedicationSchema>
    expectTypeOf<Schema>().toExtend<Medication>()
    expectTypeOf<Medication>().toExtend<Schema>()

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
