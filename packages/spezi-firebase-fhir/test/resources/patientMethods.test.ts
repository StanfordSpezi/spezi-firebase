//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Patient } from 'fhir/r4b.js'
import { FhirPatient } from '../../src/index.js'

describe('FhirPatient', () => {
  describe('birthDate', () => {
    it('should get birth date as Date object', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        birthDate: '1990-05-15',
      }
      const fhirPatient = new FhirPatient(patient)

      const birthDate = fhirPatient.birthDate
      expect(birthDate).toBeInstanceOf(Date)
      expect(birthDate?.getFullYear()).toBe(1990)
      expect(birthDate?.getMonth()).toBe(4) // 0-indexed
      expect(birthDate?.getDate()).toBe(15)
    })

    it('should return undefined when no birth date', () => {
      const patient: Patient = {
        resourceType: 'Patient',
      }
      const fhirPatient = new FhirPatient(patient)

      expect(fhirPatient.birthDate).toBeUndefined()
    })
  })

  describe('deceasedDate', () => {
    it('should get deceased date as Date object', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        deceasedDateTime: '2020-03-15T10:30:00Z',
      }
      const fhirPatient = new FhirPatient(patient)

      const deceasedDate = fhirPatient.deceasedDate
      expect(deceasedDate).toBeInstanceOf(Date)
      expect(deceasedDate?.toISOString()).toBe('2020-03-15T10:30:00.000Z')
    })
  })

  describe('isDeceased', () => {
    it('should return true when deceasedBoolean is true', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        deceasedBoolean: true,
      }
      const fhirPatient = new FhirPatient(patient)

      expect(fhirPatient.isDeceased).toBe(true)
    })

    it('should return true when deceasedDateTime is set', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        deceasedDateTime: '2020-03-15T10:30:00Z',
      }
      const fhirPatient = new FhirPatient(patient)

      expect(fhirPatient.isDeceased).toBe(true)
    })

    it('should return false when not deceased', () => {
      const patient: Patient = {
        resourceType: 'Patient',
      }
      const fhirPatient = new FhirPatient(patient)

      expect(fhirPatient.isDeceased).toBe(false)
    })
  })

  describe('identifiersBySystem', () => {
    it('should return identifiers matching system', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        identifier: [
          { system: 'http://hospital.org/mrn', value: 'MRN123' },
          { system: 'http://hospital.org/mrn', value: 'MRN456' },
          { system: 'http://other.org/id', value: 'OTHER789' },
        ],
      }
      const fhirPatient = new FhirPatient(patient)

      const mrns = fhirPatient.identifiersBySystem('http://hospital.org/mrn')
      expect(mrns).toEqual(['MRN123', 'MRN456'])
    })

    it('should return empty array when no matching identifiers', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        identifier: [{ system: 'http://other.org/id', value: 'OTHER789' }],
      }
      const fhirPatient = new FhirPatient(patient)

      const mrns = fhirPatient.identifiersBySystem('http://hospital.org/mrn')
      expect(mrns).toEqual([])
    })
  })

  describe('primaryPhone and primaryEmail', () => {
    it('should return primary phone', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        telecom: [
          { system: 'phone', value: '555-1234' },
          { system: 'email', value: 'patient@example.com' },
        ],
      }
      const fhirPatient = new FhirPatient(patient)

      expect(fhirPatient.phoneNumbers.at(0)).toBe('555-1234')
      expect(fhirPatient.emailAddresses.at(0)).toBe('patient@example.com')
    })

    it('should return undefined when no contact info', () => {
      const patient: Patient = {
        resourceType: 'Patient',
      }
      const fhirPatient = new FhirPatient(patient)

      expect(fhirPatient.phoneNumbers.at(0)).toBeUndefined()
      expect(fhirPatient.emailAddresses.at(0)).toBeUndefined()
    })
  })

  describe('calculateAge', () => {
    it('should calculate age correctly', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        birthDate: '1990-05-15',
      }
      const fhirPatient = new FhirPatient(patient)

      const asOfDate = new Date('2024-06-20')
      const age = fhirPatient.ageInYears(asOfDate)
      expect(age).toBe(34)
    })

    it('should handle age before birthday this year', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        birthDate: '1990-08-15',
      }
      const fhirPatient = new FhirPatient(patient)

      const asOfDate = new Date('2024-06-20')
      const age = fhirPatient.ageInYears(asOfDate)
      expect(age).toBe(33)
    })

    it('should return undefined when no birth date', () => {
      const patient: Patient = {
        resourceType: 'Patient',
      }
      const fhirPatient = new FhirPatient(patient)

      expect(fhirPatient.ageInYears()).toBeUndefined()
    })
  })
})
