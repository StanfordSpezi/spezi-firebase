//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type Provenance } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirProvenance,
  type untypedProvenanceSchema,
} from '../../src/index.js'

describe('Provenance Resource', () => {
  it('should validate FHIR Provenances from provenances.json', () => {
    type Schema = z.infer<typeof untypedProvenanceSchema>
    expectTypeOf<Schema>().toExtend<Provenance>()
    expectTypeOf<Provenance>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/provenances.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirProvenance.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
