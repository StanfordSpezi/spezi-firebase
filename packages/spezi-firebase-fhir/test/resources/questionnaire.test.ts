//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'

describe('Questionnaire Resource', () => {
  it('should be able to load questionnaire resources and validate structure', () => {
    const fileData = fs.readFileSync(__dirname + '/questionnaires.json', 'utf-8')
    const json = JSON.parse(fileData)
    
    // The questionnaires.json contains an object with questionnaire IDs as keys
    expect(typeof json).toBe('object')
    expect(json).not.toBeNull()
    
    const questionnaireIds = Object.keys(json)
    expect(questionnaireIds.length).toBeGreaterThan(0)
    
    questionnaireIds.forEach((id: string) => {
      const questionnaireData = json[id]
      expect(questionnaireData).toBeDefined()
      expect(questionnaireData.resourceType).toBe('Questionnaire')
      expect(questionnaireData.id).toBeTruthy()
      console.log(`Questionnaire ${id}:`, questionnaireData.title || questionnaireData.name || 'No title')
    })
    
    console.log(`Total questionnaires loaded: ${questionnaireIds.length}`)
    console.log('Note: Full schema validation may require cleaning null values.')
  })
})