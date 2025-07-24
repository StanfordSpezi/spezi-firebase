//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { observationSchema } from '../../src/resources/observation.js'

describe('Observation Resource', () => {
  it('should validate FHIR observation from observation.json', () => {
    const data = fs.readFileSync(__dirname + '/observation.json', 'utf-8')
    const decodedJson = JSON.parse(data)
    const fhirResource = observationSchema.parse(decodedJson)
    expect(JSON.stringify(decodedJson)).toBe(JSON.stringify(fhirResource))
  })
})
