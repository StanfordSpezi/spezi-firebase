//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'

describe('Organization Resource', () => {
  it('should be able to load organization data', () => {
    const fileData = fs.readFileSync(__dirname + '/organizations.json', 'utf-8')
    const json = JSON.parse(fileData)
    
    // The organizations.json contains an object with organization IDs as keys
    expect(typeof json).toBe('object')
    expect(json).not.toBeNull()
    
    const organizationIds = Object.keys(json)
    expect(organizationIds.length).toBeGreaterThan(0)
    
    organizationIds.forEach((id: string) => {
      const organizationData = json[id]
      expect(organizationData).toBeDefined()
      expect(organizationData.name).toBeTruthy()
      console.log(`Organization ${id}:`, organizationData.name || 'No name')
    })

    console.log(`Total organizations loaded: ${organizationIds.length}`)
  })
})