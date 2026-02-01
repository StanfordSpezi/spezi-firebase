//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ImplementationGuide } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirImplementationGuide,
  type untypedImplementationGuideSchema,
} from '../../src/index.js'

describe('ImplementationGuide Resource', () => {
  it('should validate FHIR implementation guide from implementationGuides.json', () => {
    type Schema = z.infer<typeof untypedImplementationGuideSchema>
    expectTypeOf<Schema>().toExtend<ImplementationGuide>()
    expectTypeOf<ImplementationGuide>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/implementationGuides.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirImplementationGuide.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
