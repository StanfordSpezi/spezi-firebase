//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Media } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirMedia, type untypedMediaSchema } from '../../src/index.js'

describe('Media Resource', () => {
  it('should validate FHIR Media from media.json', () => {
    type Schema = z.infer<typeof untypedMediaSchema>
    expectTypeOf<Schema>().toExtend<Media>()
    expectTypeOf<Media>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/media.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirMedia.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
