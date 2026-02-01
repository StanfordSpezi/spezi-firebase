//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type MedicationStatement } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirMedicationStatement,
  type untypedMedicationStatementSchema,
} from '../../src/index.js'

describe('MedicationStatement Resource', () => {
  it('should validate FHIR medication statements from medicationStatements.json', () => {
    type Schema = z.infer<typeof untypedMedicationStatementSchema>
    expectTypeOf<Schema>().toExtend<MedicationStatement>()
    expectTypeOf<MedicationStatement>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/medicationStatements.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirMedicationStatement.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
