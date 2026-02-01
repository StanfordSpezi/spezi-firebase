//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ResearchSubject } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirResearchSubject,
  type untypedResearchSubjectSchema,
} from '../../src/index.js'

describe('ResearchSubject Resource', () => {
  it('should validate FHIR research subjects from researchSubjects.json', () => {
    type Schema = z.infer<typeof untypedResearchSubjectSchema>
    expectTypeOf<Schema>().toExtend<ResearchSubject>()
    expectTypeOf<ResearchSubject>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/researchSubjects.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirResearchSubject.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
