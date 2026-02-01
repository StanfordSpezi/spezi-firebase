//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ImagingStudy } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirImagingStudy,
  type untypedImagingStudySchema,
} from '../../src/index.js'

describe('ImagingStudy Resource', () => {
  it('should validate FHIR imagingStudy from imagingStudies.json', () => {
    type Schema = z.infer<typeof untypedImagingStudySchema>
    expectTypeOf<Schema>().toExtend<ImagingStudy>()
    expectTypeOf<ImagingStudy>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/imagingStudies.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirImagingStudy.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
