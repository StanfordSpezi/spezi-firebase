//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type MolecularSequence } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirMolecularSequence,
  type untypedMolecularSequenceSchema,
} from '../../src/index.js'

describe('MolecularSequence Resource', () => {
  it('should validate FHIR MolecularSequences from molecularSequences.json', () => {
    type Schema = z.infer<typeof untypedMolecularSequenceSchema>
    expectTypeOf<Schema>().toExtend<MolecularSequence>()
    expectTypeOf<MolecularSequence>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/molecularSequences.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirMolecularSequence.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
