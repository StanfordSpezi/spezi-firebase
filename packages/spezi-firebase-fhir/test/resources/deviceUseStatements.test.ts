//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type DeviceUseStatement } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirDeviceUseStatement,
  type untypedDeviceUseStatementSchema,
} from '../../src/index.js'

describe('DeviceUseStatement Resource', () => {
  it('should validate FHIR DeviceUseStatements from deviceUseStatements.json', () => {
    type Schema = z.infer<typeof untypedDeviceUseStatementSchema>
    expectTypeOf<Schema>().toExtend<DeviceUseStatement>()
    expectTypeOf<DeviceUseStatement>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/deviceUseStatements.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirDeviceUseStatement.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
