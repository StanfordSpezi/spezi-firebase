//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type DocumentManifest } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirDocumentManifest,
  type untypedDocumentManifestSchema,
} from '../../src/index.js'

describe('DocumentManifest Resource', () => {
  it('should validate FHIR document manifest from documentManifests.json', () => {
    type Schema = z.infer<typeof untypedDocumentManifestSchema>
    expectTypeOf<Schema>().toExtend<DocumentManifest>()
    expectTypeOf<DocumentManifest>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/documentManifests.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirDocumentManifest.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
