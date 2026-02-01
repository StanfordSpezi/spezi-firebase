//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Group } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirGroup, type untypedGroupSchema } from '../../src/index.js'

describe('Group Resource', () => {
  it('should validate FHIR Groups from groups.json', () => {
    type Schema = z.infer<typeof untypedGroupSchema>
    expectTypeOf<Schema>().toExtend<Group>()
    expectTypeOf<Group>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/groups.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirGroup.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
