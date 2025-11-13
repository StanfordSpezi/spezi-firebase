//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Condition,
  type Encounter,
  type MedicationRequest,
} from 'fhir/r4b.js'
import {
  FhirCondition,
  FhirEncounter,
  FhirMedicationRequest,
} from '../../src/index.js'

describe('FhirCondition', () => {
  describe('onsetDate', () => {
    it('should get onset date as Date object', () => {
      const condition: Condition = {
        resourceType: 'Condition',
        subject: { reference: 'Patient/123' },
        onsetDateTime: '2024-01-15T10:00:00.000Z',
      }
      const fhirCondition = new FhirCondition(condition)

      const onsetDate = fhirCondition.onsetDate
      expect(onsetDate).toBeInstanceOf(Date)
      expect(onsetDate?.toISOString()).toBe('2024-01-15T10:00:00.000Z')
    })
  })

  describe('abatementDate', () => {
    it('should get abatement date as Date object', () => {
      const condition: Condition = {
        resourceType: 'Condition',
        subject: { reference: 'Patient/123' },
        abatementDateTime: '2024-02-20T10:00:00Z',
      }
      const fhirCondition = new FhirCondition(condition)

      const abatementDate = fhirCondition.abatementDate
      expect(abatementDate).toBeInstanceOf(Date)
      expect(abatementDate?.toISOString()).toBe('2024-02-20T10:00:00.000Z')
    })
  })

  describe('isActive', () => {
    it('should return true when no abatement information', () => {
      const condition: Condition = {
        resourceType: 'Condition',
        subject: { reference: 'Patient/123' },
        onsetDateTime: '2024-01-15T10:00:00Z',
      }
      const fhirCondition = new FhirCondition(condition)

      expect(fhirCondition.isActive).toBe(true)
    })

    it('should return false when abatement date exists', () => {
      const condition: Condition = {
        resourceType: 'Condition',
        subject: { reference: 'Patient/123' },
        abatementDateTime: '2024-02-20T10:00:00Z',
      }
      const fhirCondition = new FhirCondition(condition)

      expect(fhirCondition.isActive).toBe(false)
    })
  })

  describe('isConfirmed', () => {
    it('should return true when verification status is confirmed', () => {
      const condition: Condition = {
        resourceType: 'Condition',
        subject: { reference: 'Patient/123' },
        verificationStatus: {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/condition-ver-status',
              code: 'confirmed',
            },
          ],
        },
      }
      const fhirCondition = new FhirCondition(condition)

      expect(fhirCondition.isConfirmed).toBe(true)
    })

    it('should return false when verification status is not confirmed', () => {
      const condition: Condition = {
        resourceType: 'Condition',
        subject: { reference: 'Patient/123' },
        verificationStatus: {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/condition-ver-status',
              code: 'provisional',
            },
          ],
        },
      }
      const fhirCondition = new FhirCondition(condition)

      expect(fhirCondition.isConfirmed).toBe(false)
    })
  })
})

describe('FhirEncounter', () => {
  describe('startDate and endDate', () => {
    it('should get start and end dates as Date objects', () => {
      const encounter: Encounter = {
        resourceType: 'Encounter',
        status: 'finished',
        class: {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          code: 'AMB',
        },
        period: {
          start: '2024-01-15T10:00:00Z',
          end: '2024-01-15T11:00:00Z',
        },
      }
      const fhirEncounter = new FhirEncounter(encounter)

      const startDate = fhirEncounter.startDate
      const endDate = fhirEncounter.endDate
      expect(startDate).toBeInstanceOf(Date)
      expect(endDate).toBeInstanceOf(Date)
      expect(startDate?.toISOString()).toBe('2024-01-15T10:00:00.000Z')
      expect(endDate?.toISOString()).toBe('2024-01-15T11:00:00.000Z')
    })
  })

  describe('isInProgress', () => {
    it('should return true when encounter has start but no end', () => {
      const encounter: Encounter = {
        resourceType: 'Encounter',
        status: 'in-progress',
        class: {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          code: 'AMB',
        },
        period: {
          start: '2024-01-15T10:00:00Z',
        },
      }
      const fhirEncounter = new FhirEncounter(encounter)

      expect(fhirEncounter.isInProgress).toBe(true)
    })

    it('should return false when encounter is finished', () => {
      const encounter: Encounter = {
        resourceType: 'Encounter',
        status: 'finished',
        class: {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          code: 'AMB',
        },
        period: {
          start: '2024-01-15T10:00:00Z',
          end: '2024-01-15T11:00:00Z',
        },
      }
      const fhirEncounter = new FhirEncounter(encounter)

      expect(fhirEncounter.isInProgress).toBe(false)
    })
  })

  describe('durationInMilliseconds', () => {
    it('should calculate duration correctly', () => {
      const encounter: Encounter = {
        resourceType: 'Encounter',
        status: 'finished',
        class: {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          code: 'AMB',
        },
        period: {
          start: '2024-01-15T10:00:00Z',
          end: '2024-01-15T11:30:00Z',
        },
      }
      const fhirEncounter = new FhirEncounter(encounter)

      const duration = fhirEncounter.duration
      expect(duration).toBe(90 * 60 * 1000) // 90 minutes in milliseconds
    })

    it('should return undefined when dates are incomplete', () => {
      const encounter: Encounter = {
        resourceType: 'Encounter',
        status: 'in-progress',
        class: {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          code: 'AMB',
        },
        period: {
          start: '2024-01-15T10:00:00Z',
        },
      }
      const fhirEncounter = new FhirEncounter(encounter)

      expect(fhirEncounter.duration).toBeUndefined()
    })
  })
})

describe('FhirMedicationRequest', () => {
  describe('authoredDate', () => {
    it('should get authored date as Date object', () => {
      const medicationRequest: MedicationRequest = {
        resourceType: 'MedicationRequest',
        status: 'active',
        intent: 'order',
        subject: { reference: 'Patient/123' },
        authoredOn: '2024-01-15T10:00:00Z',
      }
      const fhirMedRequest = new FhirMedicationRequest(medicationRequest)

      const authoredDate = fhirMedRequest.authoredDate
      expect(authoredDate).toBeInstanceOf(Date)
      expect(authoredDate?.toISOString()).toBe('2024-01-15T10:00:00.000Z')
    })
  })
})
