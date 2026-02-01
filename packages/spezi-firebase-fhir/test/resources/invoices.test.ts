// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Invoice } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirInvoice, type untypedInvoiceSchema } from '../../src/index.js'

describe('Invoice Resource', () => {
  it('should validate FHIR Invoices from invoices.json', () => {
    type Schema = z.infer<typeof untypedInvoiceSchema>
    expectTypeOf<Schema>().toExtend<Invoice>()
    expectTypeOf<Invoice>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/invoices.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirInvoice.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
