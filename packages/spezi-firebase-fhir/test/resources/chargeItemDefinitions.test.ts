// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ChargeItemDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirChargeItemDefinition,
  type untypedChargeItemDefinitionSchema,
} from '../../src/index.js'

describe('ChargeItemDefinition Resource', () => {
  it('should validate FHIR ChargeItemDefinitions from chargeItemDefinitions.json', () => {
    type Schema = z.infer<typeof untypedChargeItemDefinitionSchema>
    expectTypeOf<Schema>().toExtend<ChargeItemDefinition>()
    expectTypeOf<ChargeItemDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/chargeItemDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirChargeItemDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
