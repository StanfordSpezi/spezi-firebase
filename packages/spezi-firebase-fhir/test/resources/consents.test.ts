//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Consent } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirConsent, type untypedConsentSchema } from '../../src/index.js'

describe('Consent Resource', () => {
  it('should validate FHIR Consents from consents.json', () => {
    type Schema = z.infer<typeof untypedConsentSchema>
    expectTypeOf<Schema>().toExtend<Consent>()
    expectTypeOf<Consent>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/consents.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirConsent.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
