//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  bundleSchema,
  FhirBundle,
  fhirResourceSchema,
} from '../../src/index.js'

describe('Bundle Resource', () => {
  it('should validate FHIR bundle from bundles.json', () => {
    const data = fs.readFileSync('test/resources/bundles.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResourceOwnSchemaBuild =
        bundleSchema(fhirResourceSchema).parse(jsonValue)
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResourceOwnSchemaBuild),
      )
      const parsedResource = FhirBundle.parseGeneric(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
