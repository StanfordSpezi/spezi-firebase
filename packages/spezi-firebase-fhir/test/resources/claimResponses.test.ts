// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ClaimResponse } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirClaimResponse,
  type untypedClaimResponseSchema,
} from '../../src/index.js'

describe('ClaimResponse Resource', () => {
  it('should validate FHIR ClaimResponses from claimResponses.json', () => {
    type Schema = z.infer<typeof untypedClaimResponseSchema>
    expectTypeOf<Schema>().toExtend<ClaimResponse>()
    expectTypeOf<ClaimResponse>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/claimResponses.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirClaimResponse.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
