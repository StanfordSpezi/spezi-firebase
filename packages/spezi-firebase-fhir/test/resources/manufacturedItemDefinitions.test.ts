//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ManufacturedItemDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirManufacturedItemDefinition,
  type untypedManufacturedItemDefinitionSchema,
} from '../../src/index.js'

describe('ManufacturedItemDefinition Resource', () => {
  it('should validate FHIR manufacturedItemDefinition from manufacturedItemDefinitions.json', () => {
    type Schema = z.infer<typeof untypedManufacturedItemDefinitionSchema>
    expectTypeOf<Schema>().toExtend<ManufacturedItemDefinition>()
    expectTypeOf<ManufacturedItemDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/manufacturedItemDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource =
        FhirManufacturedItemDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
