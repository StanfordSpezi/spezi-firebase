//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { deviceSchema } from '../../src/index.js'

describe('Device Resource', () => {
  it('should validate FHIR Devices from devices.json', () => {
    const data = fs.readFileSync('test/resources/devices.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = deviceSchema.parse(jsonValue)
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
