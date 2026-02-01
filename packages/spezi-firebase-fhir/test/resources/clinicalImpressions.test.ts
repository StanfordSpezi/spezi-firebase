//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type ClinicalImpression } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirClinicalImpression,
  type untypedClinicalImpressionSchema,
} from '../../src/index.js'

describe('ClinicalImpression Resource', () => {
  it('should validate FHIR ClinicalImpressions from clinicalImpressions.json', () => {
    type Schema = z.infer<typeof untypedClinicalImpressionSchema>
    expectTypeOf<Schema>().toExtend<ClinicalImpression>()
    expectTypeOf<ClinicalImpression>().toExtend<Schema>()

    const data = fs.readFileSync(
      'test/resources/clinicalImpressions.json',
      'utf-8',
    )
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirClinicalImpression.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
