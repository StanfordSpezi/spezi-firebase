// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Claim } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirClaim, type untypedClaimSchema } from '../../src/index.js'

describe('Claim Resource', () => {
  it('should validate FHIR Claims from claims.json', () => {
    type Schema = z.infer<typeof untypedClaimSchema>
    expectTypeOf<Schema>().toExtend<Claim>()
    expectTypeOf<Claim>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/claims.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirClaim.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
