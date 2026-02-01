//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type PractitionerRole } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirPractitionerRole,
  type untypedPractitionerRoleSchema,
} from '../../src/index.js'

describe('PractitionerRole Resource', () => {
  it('should validate FHIR practitionerRole from practitionerRoles.json', () => {
    type Schema = z.infer<typeof untypedPractitionerRoleSchema>
    expectTypeOf<Schema>().toExtend<PractitionerRole>()
    expectTypeOf<PractitionerRole>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/practitionerRoles.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirPractitionerRole.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
