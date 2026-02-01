// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Account } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirAccount, type untypedAccountSchema } from '../../src/index.js'

describe('Account Resource', () => {
  it('should validate FHIR Accounts from accounts.json', () => {
    type Schema = z.infer<typeof untypedAccountSchema>
    expectTypeOf<Schema>().toExtend<Account>()
    expectTypeOf<Account>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/accounts.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirAccount.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
