//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type CompartmentDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirCompartmentDefinition,
  type untypedCompartmentDefinitionSchema,
} from '../../src/index.js'

describe('CompartmentDefinition Resource', () => {
  it('should validate FHIR compartment definition from compartmentDefinitions.json', () => {
    type Schema = z.infer<typeof untypedCompartmentDefinitionSchema>
    expectTypeOf<Schema>().toExtend<CompartmentDefinition>()
    expectTypeOf<CompartmentDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/compartmentDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirCompartmentDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
