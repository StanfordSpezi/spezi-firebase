//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type OperationOutcome } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirOperationOutcome,
  type untypedOperationOutcomeSchema,
} from '../../src/index.js'

describe('OperationOutcome Resource', () => {
  it('should validate FHIR operationOutcome from operationOutcomes.json', () => {
    type Schema = z.infer<typeof untypedOperationOutcomeSchema>
    expectTypeOf<Schema>().toExtend<OperationOutcome>()
    expectTypeOf<OperationOutcome>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/operationOutcomes.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirOperationOutcome.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
