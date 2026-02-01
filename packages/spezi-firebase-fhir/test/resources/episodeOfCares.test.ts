//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { expectTypeOf } from 'expect-type'
import { type EpisodeOfCare } from 'fhir/r4b.js'
import { type z } from 'zod'
import { jsonStringifyDeterministically } from './testHelpers.js'
import {
  FhirEpisodeOfCare,
  type untypedEpisodeOfCareSchema,
} from '../../src/index.js'

describe('EpisodeOfCare Resource', () => {
  it('should validate FHIR episodeOfCare from episodeOfCares.json', () => {
    type Schema = z.infer<typeof untypedEpisodeOfCareSchema>
    expectTypeOf<Schema>().toExtend<EpisodeOfCare>()
    expectTypeOf<EpisodeOfCare>().toExtend<Schema>()

    const data = fs.readFileSync('test/resources/episodeOfCares.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    Object.values(decodedJson).forEach((jsonValue: unknown) => {
      const parsedResource = FhirEpisodeOfCare.parse(jsonValue).value
      expect(jsonStringifyDeterministically(jsonValue)).toBe(
        jsonStringifyDeterministically(parsedResource),
      )
    })
  })
})
