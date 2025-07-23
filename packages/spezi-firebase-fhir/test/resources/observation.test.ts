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
  it('should be able to parse a valid observation resource', () => {
    const fileData = fs.readFileSync(__dirname + '/observation.json', 'utf-8')
    const json = JSON.parse(fileData)
    const observation = observationSchema.parse(json)
    console.log(JSON.stringify(observation, undefined, 2))
    expect(observation).toBeDefined()
    expect(observation.resourceType).toBe('Observation')
  })
})