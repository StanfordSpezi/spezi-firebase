//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type AppointmentResponse } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirAppointmentResponse,
  type untypedAppointmentResponseSchema,
} from '../../src/index.js'

describe('AppointmentResponse Resource', () => {
  it('should validate FHIR appointmentResponse from appointmentResponses.json', () => {
    type Schema = z.infer<typeof untypedAppointmentResponseSchema>
    expectTypeOf<Schema>().toExtend<AppointmentResponse>()
    expectTypeOf<AppointmentResponse>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/appointmentResponses.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirAppointmentResponse.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
