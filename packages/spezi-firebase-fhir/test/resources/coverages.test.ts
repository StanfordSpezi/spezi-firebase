// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Coverage } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirCoverage, type untypedCoverageSchema } from '../../src/index.js'

describe('Coverage Resource', () => {
  it('should validate FHIR Coverages from coverages.json', () => {
    type Schema = z.infer<typeof untypedCoverageSchema>
    expectTypeOf<Schema>().toExtend<Coverage>()
    expectTypeOf<Coverage>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/coverages.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirCoverage.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
