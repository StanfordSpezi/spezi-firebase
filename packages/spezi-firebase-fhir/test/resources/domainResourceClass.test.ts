//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Patient, type Reference } from 'fhir/r4b.js'
import { FhirPatient, FhirDomainResource } from '../../src/index.js'

describe('FhirDomainResource', () => {
  describe('isReferencedBy', () => {
    it('should return true for matching relative reference', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        id: '123',
        active: true,
      }
      const fhirPatient = new FhirPatient(patient)

      const reference: Reference = {
        reference: 'Patient/123',
      }

      expect(fhirPatient.isReferencedBy(reference)).toBe(true)
    })

    it('should return true for reference with just the id', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        id: '123',
        active: true,
      }
      const fhirPatient = new FhirPatient(patient)

      const reference: Reference = {
        reference: '123',
      }

      expect(fhirPatient.isReferencedBy(reference)).toBe(true)
    })

    it('should return true for absolute URL reference', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        id: '123',
        active: true,
      }
      const fhirPatient = new FhirPatient(patient)

      const reference: Reference = {
        reference: 'https://example.com/fhir/Patient/123',
      }

      expect(fhirPatient.isReferencedBy(reference)).toBe(true)
    })

    it('should return false for non-matching reference', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        id: '123',
        active: true,
      }
      const fhirPatient = new FhirPatient(patient)

      const reference: Reference = {
        reference: 'Patient/456',
      }

      expect(fhirPatient.isReferencedBy(reference)).toBe(false)
    })

    it('should return false for reference without reference string', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        id: '123',
        active: true,
      }
      const fhirPatient = new FhirPatient(patient)

      const reference: Reference = {
        display: 'John Doe',
      }

      expect(fhirPatient.isReferencedBy(reference)).toBe(false)
    })

    it('should return false for resource without id', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        active: true,
      }
      const fhirPatient = new FhirPatient(patient)

      const reference: Reference = {
        reference: 'Patient/123',
      }

      expect(fhirPatient.isReferencedBy(reference)).toBe(false)
    })

    it('should return false for wrong resource type', () => {
      const patient: Patient = {
        resourceType: 'Patient',
        id: '123',
        active: true,
      }
      const fhirPatient = new FhirPatient(patient)

      const reference: Reference = {
        reference: 'Observation/123',
      }

      expect(fhirPatient.isReferencedBy(reference)).toBe(false)
    })
  })

  describe('decodeBase64Binary', () => {
    it('should decode base64 string correctly', () => {
      const base64 = 'SGVsbG8sIFdvcmxkIQ==' // "Hello, World!"
      const decoded = FhirDomainResource.decodeBase64Binary(base64)

      expect(decoded).toBeInstanceOf(Uint8Array)
      expect(decoded?.length).toBe(13)

      const decoder = new TextDecoder()
      expect(decoder.decode(decoded)).toBe('Hello, World!')
    })

    it('should return undefined for undefined input', () => {
      const decoded = FhirDomainResource.decodeBase64Binary(undefined)
      expect(decoded).toBeUndefined()
    })

    it('should handle empty string', () => {
      const decoded = FhirDomainResource.decodeBase64Binary('')
      expect(decoded).toBeDefined()
      expect(decoded?.length).toBe(0)
    })

    it('should decode binary data correctly', () => {
      const bytes = new Uint8Array([0, 1, 2, 3, 255, 254, 253])
      const base64 = Buffer.from(bytes).toString('base64')
      const decoded = FhirDomainResource.decodeBase64Binary(base64)

      expect(decoded).toBeInstanceOf(Uint8Array)
      expect(Array.from(decoded ?? [])).toEqual([0, 1, 2, 3, 255, 254, 253])
    })
  })
})
