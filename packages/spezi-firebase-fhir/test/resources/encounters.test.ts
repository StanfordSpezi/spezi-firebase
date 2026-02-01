// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Encounter } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirEncounter, type untypedEncounterSchema } from '../../src/index.js'

describe('Encounter Resource', () => {
  it('should validate FHIR Encounters from encounters.json', () => {
    type Schema = z.infer<typeof untypedEncounterSchema>
    expectTypeOf<Schema>().toExtend<Encounter>()
    expectTypeOf<Encounter>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/encounters.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirEncounter.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
