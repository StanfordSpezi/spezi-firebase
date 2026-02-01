//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type DeviceMetric } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirDeviceMetric,
  type untypedDeviceMetricSchema,
} from '../../src/index.js'

describe('DeviceMetric Resource', () => {
  it('should validate FHIR DeviceMetrics from deviceMetrics.json', () => {
    type DeviceMetricSchema = z.infer<typeof untypedDeviceMetricSchema>
    expectTypeOf<DeviceMetricSchema>().toExtend<DeviceMetric>()
    expectTypeOf<DeviceMetric>().toExtend<DeviceMetricSchema>()

    const data = fs.readFileSync('test/resources/deviceMetrics.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirDeviceMetric.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
