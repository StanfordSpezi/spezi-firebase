// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type CoverageEligibilityRequest } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirCoverageEligibilityRequest,
  type untypedCoverageEligibilityRequestSchema,
} from '../../src/index.js'

describe('CoverageEligibilityRequest Resource', () => {
  it('should validate FHIR CoverageEligibilityRequests from coverageEligibilityRequests.json', () => {
    type Schema = z.infer<typeof untypedCoverageEligibilityRequestSchema>
    expectTypeOf<Schema>().toExtend<CoverageEligibilityRequest>()
    expectTypeOf<CoverageEligibilityRequest>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/coverageEligibilityRequests.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource =
        FhirCoverageEligibilityRequest.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
