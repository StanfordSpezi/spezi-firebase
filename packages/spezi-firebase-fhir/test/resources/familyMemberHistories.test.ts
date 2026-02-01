//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type FamilyMemberHistory } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirFamilyMemberHistory,
  type untypedFamilyMemberHistorySchema,
} from '../../src/index.js'

describe('FamilyMemberHistory Resource', () => {
  it('should validate FHIR FamilyMemberHistories from familyMemberHistories.json', () => {
    type Schema = z.infer<typeof untypedFamilyMemberHistorySchema>
    expectTypeOf<Schema>().toExtend<FamilyMemberHistory>()
    expectTypeOf<FamilyMemberHistory>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/familyMemberHistories.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirFamilyMemberHistory.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
