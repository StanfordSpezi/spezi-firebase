//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ResearchDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirResearchDefinition,
  type untypedResearchDefinitionSchema,
} from '../../src/index.js'

describe('ResearchDefinition Resource', () => {
  it('should validate FHIR research definitions from researchDefinitions.json', () => {
    type Schema = z.infer<typeof untypedResearchDefinitionSchema>
    expectTypeOf<Schema>().toExtend<ResearchDefinition>()
    expectTypeOf<ResearchDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/researchDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirResearchDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
