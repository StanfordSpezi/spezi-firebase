// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ServiceRequest } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirServiceRequest,
  type untypedServiceRequestSchema,
} from '../../src/index.js'

describe('ServiceRequest Resource', () => {
  it('should validate FHIR ServiceRequest from serviceRequests.json', () => {
    type Schema = z.infer<typeof untypedServiceRequestSchema>
    expectTypeOf<Schema>().toExtend<ServiceRequest>()
    expectTypeOf<ServiceRequest>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/serviceRequests.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirServiceRequest.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
