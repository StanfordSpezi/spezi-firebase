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
    it('should load and validate medicationClasses.json structure', () => {
      const data = fs.readFileSync(
        __dirname + '/medicationClasses.json',
        'utf-8',
      )
      const decodedJson = JSON.parse(data)

      expect(Array.isArray(decodedJson)).toBe(true)
      expect(decodedJson.length).toBeGreaterThan(0)

      decodedJson.forEach((medicationClass: any) => {
        expect(medicationClass.name).toBeDefined()
        expect(medicationClass.videoPath).toBeDefined()
      })
    })
  })

  describe('Medication Codes', () => {
    it('should load and validate medicationCodes.json structure', () => {
      const data = fs.readFileSync(__dirname + '/medicationCodes.json', 'utf-8')
      const decodedJson = JSON.parse(data)

      expect(Array.isArray(decodedJson)).toBe(true)
      expect(decodedJson.length).toBeGreaterThan(0)

      decodedJson.forEach((medicationCode: any) => {
        expect(medicationCode.key).toBeDefined()
        expect(Array.isArray(medicationCode.medications)).toBe(true)

        medicationCode.medications.forEach((medication: any) => {
          expect(medication.code).toBeDefined()
        })
      })
    })
  })

  describe('Video Sections', () => {
    it('should load and validate videoSections.json structure', () => {
      const data = fs.readFileSync(__dirname + '/videoSections.json', 'utf-8')
      const decodedJson = JSON.parse(data)

      expect(Array.isArray(decodedJson)).toBe(true)
      expect(decodedJson.length).toBeGreaterThan(0)

      decodedJson.forEach((videoSection: any) => {
        expect(videoSection.orderIndex).toBeDefined()
        expect(typeof videoSection.orderIndex).toBe('number')

        if (videoSection.videos) {
          expect(Array.isArray(videoSection.videos)).toBe(true)
        }
      })
    })
  })
})
