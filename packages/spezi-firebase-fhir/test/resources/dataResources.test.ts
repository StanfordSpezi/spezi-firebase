//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'

describe('Data Resources', () => {
  describe('Medication Classes', () => {
    it('should be able to parse medication classes as generic JSON', () => {
      const fileData = fs.readFileSync(
        __dirname + '/medicationClasses.json',
        'utf-8',
      )
      const json = JSON.parse(fileData)

      expect(json).toBeDefined()
      expect(Array.isArray(json)).toBe(true)
      console.log(`Medication classes loaded: ${json.length} items`)
    })
  })

  describe('Medication Codes', () => {
    it('should be able to parse medication codes as generic JSON', () => {
      const fileData = fs.readFileSync(
        __dirname + '/medicationCodes.json',
        'utf-8',
      )
      const json = JSON.parse(fileData)

      expect(json).toBeDefined()
      expect(Array.isArray(json)).toBe(true)
      console.log(`Medication codes loaded: ${json.length} items`)
    })
  })

  describe('Drugs', () => {
    it('should be able to parse drugs as generic JSON', () => {
      const fileData = fs.readFileSync(__dirname + '/drugs.json', 'utf-8')
      const json = JSON.parse(fileData)

      expect(json).toBeDefined()
      expect(typeof json).toBe('object')
      expect(json).not.toBeNull()

      const drugIds = Object.keys(json)
      console.log(`Drugs loaded: ${drugIds.length} items`)
    })
  })

  describe('Video Sections', () => {
    it('should be able to parse video sections as generic JSON', () => {
      const fileData = fs.readFileSync(
        __dirname + '/videoSections.json',
        'utf-8',
      )
      const json = JSON.parse(fileData)

      expect(json).toBeDefined()
      expect(Array.isArray(json)).toBe(true)
      console.log(`Video sections loaded: ${json.length} items`)
    })
  })
})
