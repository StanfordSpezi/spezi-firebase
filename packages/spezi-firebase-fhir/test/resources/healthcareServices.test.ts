//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type HealthcareService } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirHealthcareService,
  type untypedHealthcareServiceSchema,
} from '../../src/index.js'

describe('HealthcareService Resource', () => {
  it('should validate FHIR healthcareService from healthcareServices.json', () => {
    type Schema = z.infer<typeof untypedHealthcareServiceSchema>
    expectTypeOf<Schema>().toExtend<HealthcareService>()
    expectTypeOf<HealthcareService>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/healthcareServices.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirHealthcareService.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
