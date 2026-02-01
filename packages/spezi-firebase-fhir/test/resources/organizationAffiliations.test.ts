//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type OrganizationAffiliation } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirOrganizationAffiliation,
  type untypedOrganizationAffiliationSchema,
} from '../../src/index.js'

describe('OrganizationAffiliation Resource', () => {
  it('should validate FHIR OrganizationAffiliations from organizationAffiliations.json', () => {
    type Schema = z.infer<typeof untypedOrganizationAffiliationSchema>
    expectTypeOf<Schema>().toExtend<OrganizationAffiliation>()
    expectTypeOf<OrganizationAffiliation>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/organizationAffiliations.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirOrganizationAffiliation.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
