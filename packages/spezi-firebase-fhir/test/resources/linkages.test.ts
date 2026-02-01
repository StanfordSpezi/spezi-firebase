//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Linkage } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirLinkage, type untypedLinkageSchema } from '../../src/index.js'

describe('Linkage Resource', () => {
  it('should validate FHIR Linkages from linkages.json', () => {
    type Schema = z.infer<typeof untypedLinkageSchema>
    expectTypeOf<Schema>().toExtend<Linkage>()
    expectTypeOf<Linkage>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/linkages.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirLinkage.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
