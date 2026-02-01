//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type DeviceDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirDeviceDefinition,
  type untypedDeviceDefinitionSchema,
} from '../../src/index.js'

describe('DeviceDefinition Resource', () => {
  it('should validate FHIR DeviceDefinitions from deviceDefinitions.json', () => {
    type Schema = z.infer<typeof untypedDeviceDefinitionSchema>
    expectTypeOf<Schema>().toExtend<DeviceDefinition>()
    expectTypeOf<DeviceDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/deviceDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirDeviceDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
