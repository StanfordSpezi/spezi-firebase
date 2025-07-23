//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'

describe('Medication Resource', () => {
  it('should be able to load medication resources and validate structure', () => {
    const fileData = fs.readFileSync(__dirname + '/medications.json', 'utf-8')
    const json = JSON.parse(fileData)

    // The medications.json contains an object with medication IDs as keys
    expect(typeof json).toBe('object')
    expect(json).not.toBeNull()

    const medicationIds = Object.keys(json)
    expect(medicationIds.length).toBeGreaterThan(0)

    medicationIds.forEach((id: string) => {
      const medicationData = json[id]
      expect(medicationData).toBeDefined()
      expect(medicationData.resourceType).toBe('Medication')
      expect(medicationData.id).toBeTruthy()
      console.log(`Medication ${id}:`, medicationData.id || 'No ID')
    })

    console.log(`Total medications loaded: ${medicationIds.length}`)
  })
})
