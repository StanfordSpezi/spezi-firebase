//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Evidence } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import { FhirEvidence, type untypedEvidenceSchema } from '../../src/index.js'

describe('Evidence Resource', () => {
  it('should validate FHIR evidences from evidences.json', () => {
    type Schema = z.infer<typeof untypedEvidenceSchema>
    expectTypeOf<Schema>().toExtend<Evidence>()
    expectTypeOf<Evidence>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/evidences.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirEvidence.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
