//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type SearchParameter } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirSearchParameter,
  type untypedSearchParameterSchema,
} from '../../src/index.js'

describe('SearchParameter Resource', () => {
  it('should validate FHIR search parameter from searchParameters.json', () => {
    type Schema = z.infer<typeof untypedSearchParameterSchema>
    expectTypeOf<Schema>().toExtend<SearchParameter>()
    expectTypeOf<SearchParameter>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/searchParameters.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirSearchParameter.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
