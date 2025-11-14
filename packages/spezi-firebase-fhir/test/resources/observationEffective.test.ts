//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Observation } from 'fhir/r4b.js'
import { FhirObservation } from '../../src/index.js'

describe('FhirObservation', () => {
  describe('effectiveDate', () => {
    it('should return Date from effectiveDateTime', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectiveDateTime: '2024-03-15T10:30:00Z',
      }

      const fhirObs = new FhirObservation(observation)
      const effectiveDate = fhirObs.effectiveDate

      expect(effectiveDate).toBeInstanceOf(Date)
      expect(effectiveDate?.toISOString()).toBe('2024-03-15T10:30:00.000Z')
    })

    it('should return Date from effectiveInstant', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectiveInstant: '2024-03-15T10:30:00.123Z',
      }

      const fhirObs = new FhirObservation(observation)
      const effectiveDate = fhirObs.effectiveDate

      expect(effectiveDate).toBeInstanceOf(Date)
      expect(effectiveDate?.toISOString()).toBe('2024-03-15T10:30:00.123Z')
    })

    it('should return undefined when no effective date', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
      }

      const fhirObs = new FhirObservation(observation)
      expect(fhirObs.effectiveDate).toBeUndefined()
    })
  })

  describe('effectivePeriodStart', () => {
    it('should return start date from effectivePeriod', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectivePeriod: {
          start: '2024-03-15T10:00:00Z',
        },
      }

      const fhirObs = new FhirObservation(observation)
      const startDate = fhirObs.effectivePeriodStart

      expect(startDate).toBeInstanceOf(Date)
      expect(startDate?.toISOString()).toBe('2024-03-15T10:00:00.000Z')
    })

    it('should return undefined when no period', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
      }

      const fhirObs = new FhirObservation(observation)
      expect(fhirObs.effectivePeriodStart).toBeUndefined()
    })
  })

  describe('effectivePeriodEnd', () => {
    it('should return end date from effectivePeriod', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectivePeriod: {
          end: '2024-03-15T11:00:00Z',
        },
      }

      const fhirObs = new FhirObservation(observation)
      const endDate = fhirObs.effectivePeriodEnd

      expect(endDate).toBeInstanceOf(Date)
      expect(endDate?.toISOString()).toBe('2024-03-15T11:00:00.000Z')
    })

    it('should return undefined when no period', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
      }

      const fhirObs = new FhirObservation(observation)
      expect(fhirObs.effectivePeriodEnd).toBeUndefined()
    })
  })

  describe('effectiveOverlaps', () => {
    it('should return true when effectiveDateTime is in range', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectiveDateTime: '2024-06-15T10:00:00Z',
      }

      const fhirObs = new FhirObservation(observation)
      const rangeStart = new Date('2024-01-01T00:00:00Z')
      const rangeEnd = new Date('2024-12-31T23:59:59Z')

      expect(fhirObs.effectiveOverlaps(rangeStart, rangeEnd)).toBe(true)
    })

    it('should return false when effectiveDateTime is outside range', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectiveDateTime: '2023-06-15T10:00:00Z',
      }

      const fhirObs = new FhirObservation(observation)
      const rangeStart = new Date('2024-01-01T00:00:00Z')
      const rangeEnd = new Date('2024-12-31T23:59:59Z')

      expect(fhirObs.effectiveOverlaps(rangeStart, rangeEnd)).toBe(false)
    })

    it('should return true when effectivePeriod overlaps range', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectivePeriod: {
          start: '2024-05-01T00:00:00Z',
          end: '2024-07-31T23:59:59Z',
        },
      }

      const fhirObs = new FhirObservation(observation)
      const rangeStart = new Date('2024-06-01T00:00:00Z')
      const rangeEnd = new Date('2024-06-30T23:59:59Z')

      expect(fhirObs.effectiveOverlaps(rangeStart, rangeEnd)).toBe(true)
    })

    it('should return true when effectivePeriod partially overlaps range', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectivePeriod: {
          start: '2024-05-01T00:00:00Z',
          end: '2024-06-15T00:00:00Z',
        },
      }

      const fhirObs = new FhirObservation(observation)
      const rangeStart = new Date('2024-06-01T00:00:00Z')
      const rangeEnd = new Date('2024-06-30T23:59:59Z')

      expect(fhirObs.effectiveOverlaps(rangeStart, rangeEnd)).toBe(true)
    })

    it('should return false when effectivePeriod does not overlap range', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectivePeriod: {
          start: '2024-01-01T00:00:00Z',
          end: '2024-02-28T23:59:59Z',
        },
      }

      const fhirObs = new FhirObservation(observation)
      const rangeStart = new Date('2024-06-01T00:00:00Z')
      const rangeEnd = new Date('2024-06-30T23:59:59Z')

      expect(fhirObs.effectiveOverlaps(rangeStart, rangeEnd)).toBe(false)
    })

    it('should handle effectivePeriod with only start date', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectivePeriod: {
          start: '2024-05-01T00:00:00Z',
        },
      }

      const fhirObs = new FhirObservation(observation)
      const rangeStart = new Date('2024-06-01T00:00:00Z')
      const rangeEnd = new Date('2024-06-30T23:59:59Z')

      // Period without end extends infinitely, so it should overlap
      expect(fhirObs.effectiveOverlaps(rangeStart, rangeEnd)).toBe(true)
    })

    it('should handle effectivePeriod with only end date', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
        effectivePeriod: {
          end: '2024-07-31T23:59:59Z',
        },
      }

      const fhirObs = new FhirObservation(observation)
      const rangeStart = new Date('2024-06-01T00:00:00Z')
      const rangeEnd = new Date('2024-06-30T23:59:59Z')

      // Period without start extends infinitely into past, so it should overlap
      expect(fhirObs.effectiveOverlaps(rangeStart, rangeEnd)).toBe(true)
    })

    it('should return false when no effective date information', () => {
      const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: { text: 'Test' },
      }

      const fhirObs = new FhirObservation(observation)
      const rangeStart = new Date('2024-06-01T00:00:00Z')
      const rangeEnd = new Date('2024-06-30T23:59:59Z')

      expect(fhirObs.effectiveOverlaps(rangeStart, rangeEnd)).toBe(false)
    })
  })
})
