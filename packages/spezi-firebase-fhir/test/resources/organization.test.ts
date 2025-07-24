//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { organizationSchema } from '../../src/resources/organization.js'

describe('Organization Resource', () => {
  it('should validate FHIR organizations from organizations.json', () => {
    const data = fs.readFileSync(__dirname + '/organizations.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    // organizations.json contains object with organization IDs as keys
    Object.values(decodedJson).forEach((organizationData: any) => {
      const fhirResource = organizationSchema.parse(organizationData)
      expect(JSON.stringify(organizationData)).toBe(
        JSON.stringify(fhirResource),
      )
    })
  })
})
