//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type MedicationAdministration } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirMedicationAdministration,
  type untypedMedicationAdministrationSchema,
} from '../../src/index.js'

describe('MedicationAdministration Resource', () => {
  it('should validate FHIR medication administrations from medicationAdministrations.json', () => {
    type Schema = z.infer<typeof untypedMedicationAdministrationSchema>
    expectTypeOf<Schema>().toExtend<MedicationAdministration>()
    expectTypeOf<MedicationAdministration>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/medicationAdministrations.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirMedicationAdministration.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
