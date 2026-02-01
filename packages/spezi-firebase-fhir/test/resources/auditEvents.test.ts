//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type AuditEvent } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirAuditEvent,
  type untypedAuditEventSchema,
} from '../../src/index.js'

describe('AuditEvent Resource', () => {
  it('should validate FHIR AuditEvents from auditEvents.json', () => {
    type Schema = z.infer<typeof untypedAuditEventSchema>
    expectTypeOf<Schema>().toExtend<AuditEvent>()
    expectTypeOf<AuditEvent>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/auditEvents.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirAuditEvent.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
