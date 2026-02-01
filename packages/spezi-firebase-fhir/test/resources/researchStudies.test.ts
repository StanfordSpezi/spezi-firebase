//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ResearchStudy } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirResearchStudy,
  type untypedResearchStudySchema,
} from '../../src/index.js'

describe('ResearchStudy Resource', () => {
  it('should validate FHIR research studies from researchStudies.json', () => {
    type Schema = z.infer<typeof untypedResearchStudySchema>
    expectTypeOf<Schema>().toExtend<ResearchStudy>()
    expectTypeOf<ResearchStudy>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/researchStudies.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirResearchStudy.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
