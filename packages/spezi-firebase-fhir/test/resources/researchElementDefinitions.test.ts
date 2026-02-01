//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ResearchElementDefinition } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirResearchElementDefinition,
  type untypedResearchElementDefinitionSchema,
} from '../../src/index.js'

describe('ResearchElementDefinition Resource', () => {
  it('should validate FHIR research element definitions from researchElementDefinitions.json', () => {
    type Schema = z.infer<typeof untypedResearchElementDefinitionSchema>
    expectTypeOf<Schema>().toExtend<ResearchElementDefinition>()
    expectTypeOf<ResearchElementDefinition>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/researchElementDefinitions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource =
        FhirResearchElementDefinition.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
