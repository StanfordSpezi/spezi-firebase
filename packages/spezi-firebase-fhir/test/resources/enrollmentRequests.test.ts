// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type EnrollmentRequest } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirEnrollmentRequest,
  type untypedEnrollmentRequestSchema,
} from '../../src/index.js'

describe('EnrollmentRequest Resource', () => {
  it('should validate FHIR EnrollmentRequests from enrollmentRequests.json', () => {
    type Schema = z.infer<typeof untypedEnrollmentRequestSchema>
    expectTypeOf<Schema>().toExtend<EnrollmentRequest>()
    expectTypeOf<EnrollmentRequest>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/enrollmentRequests.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirEnrollmentRequest.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
