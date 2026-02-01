//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type StructureDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirStructureDefinition,
  type untypedStructureDefinitionSchema,
} from '../../src/index.js'

describe('StructureDefinition Resource', () => {
  it('should validate FHIR structure definition from structureDefinitions.json', () => {
    type Schema = z.infer<typeof untypedStructureDefinitionSchema>
    expectTypeOf<Schema>().toExtend<StructureDefinition>()
    expectTypeOf<StructureDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/structureDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirStructureDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
