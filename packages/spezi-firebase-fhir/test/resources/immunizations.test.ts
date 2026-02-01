//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Immunization } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirImmunization,
  type untypedImmunizationSchema,
} from '../../src/index.js'

describe('Immunization Resource', () => {
  it('should validate FHIR immunizations from immunizations.json', () => {
    type Schema = z.infer<typeof untypedImmunizationSchema>
    expectTypeOf<Schema>().toExtend<Immunization>()
    expectTypeOf<Immunization>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/immunizations.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirImmunization.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
