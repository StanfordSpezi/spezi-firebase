//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type RelatedPerson } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirRelatedPerson,
  type untypedRelatedPersonSchema,
} from '../../src/index.js'

describe('RelatedPerson Resource', () => {
  it('should validate FHIR relatedPerson from relatedPersons.json', () => {
    type Schema = z.infer<typeof untypedRelatedPersonSchema>
    expectTypeOf<Schema>().toExtend<RelatedPerson>()
    expectTypeOf<RelatedPerson>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/relatedPersons.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirRelatedPerson.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
