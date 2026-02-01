//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type AdministrableProductDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirAdministrableProductDefinition,
  type untypedAdministrableProductDefinitionSchema,
} from '../../src/index.js'

describe('AdministrableProductDefinition Resource', () => {
  it('should validate FHIR administrableProductDefinition from administrableProductDefinitions.json', () => {
    type Schema = z.infer<typeof untypedAdministrableProductDefinitionSchema>
    expectTypeOf<Schema>().toExtend<AdministrableProductDefinition>()
    expectTypeOf<AdministrableProductDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/administrableProductDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource =
        FhirAdministrableProductDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
