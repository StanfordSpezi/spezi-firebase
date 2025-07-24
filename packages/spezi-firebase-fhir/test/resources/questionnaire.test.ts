//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { questionnaireSchema } from '../../src/resources/questionnaire.js'

describe('Questionnaire Resource', () => {
  it('should validate FHIR questionnaires from questionnaires.json', () => {
    const data = fs.readFileSync(__dirname + '/questionnaires.json', 'utf-8')
    const decodedJson = JSON.parse(data)

    // questionnaires.json contains object with questionnaire IDs as keys
    Object.values(decodedJson).forEach((questionnaireData: any) => {
      const fhirResource = questionnaireSchema.parse(questionnaireData)
      expect(JSON.stringify(questionnaireData)).toBe(
        JSON.stringify(fhirResource),
      )
    })
  })
})
