//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type DetectedIssue } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirDetectedIssue,
  type untypedDetectedIssueSchema,
} from '../../src/index.js'

describe('DetectedIssue Resource', () => {
  it('should validate FHIR detected issue from detectedIssues.json', () => {
    type Schema = z.infer<typeof untypedDetectedIssueSchema>
    expectTypeOf<Schema>().toExtend<DetectedIssue>()
    expectTypeOf<DetectedIssue>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/detectedIssues.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirDetectedIssue.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
