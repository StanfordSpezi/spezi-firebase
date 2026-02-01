//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type GuidanceResponse } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirGuidanceResponse,
  type untypedGuidanceResponseSchema,
} from '../../src/index.js'

describe('GuidanceResponse Resource', () => {
  it('should validate FHIR guidance responses from guidanceResponses.json', () => {
    type Schema = z.infer<typeof untypedGuidanceResponseSchema>
    expectTypeOf<Schema>().toExtend<GuidanceResponse>()
    expectTypeOf<GuidanceResponse>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/guidanceResponses.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirGuidanceResponse.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
