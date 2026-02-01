//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type AdverseEvent } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirAdverseEvent,
  type untypedAdverseEventSchema,
} from '../../src/index.js'

describe('AdverseEvent Resource', () => {
  it('should validate FHIR adverse event from adverseEvents.json', () => {
    type Schema = z.infer<typeof untypedAdverseEventSchema>
    expectTypeOf<Schema>().toExtend<AdverseEvent>()
    expectTypeOf<AdverseEvent>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/adverseEvents.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirAdverseEvent.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
