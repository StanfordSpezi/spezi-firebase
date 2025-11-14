//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Bundle, type Patient, type Observation } from 'fhir/r4b.js'
import { FhirBundle } from '../../src/index.js'

describe('FhirBundle - findResourcesWith', () => {
  it('should find resources matching a predicate', () => {
    const bundle: Bundle = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'Patient',
            id: '1',
            active: true,
            name: [{ family: 'Smith' }],
          } as Patient,
        },
        {
          resource: {
            resourceType: 'Patient',
            id: '2',
            active: false,
            name: [{ family: 'Jones' }],
          } as Patient,
        },
        {
          resource: {
            resourceType: 'Observation',
            id: '3',
            status: 'final',
            code: { text: 'Blood pressure' },
          } as Observation,
        },
      ],
    }

    const fhirBundle = FhirBundle.parseGeneric(bundle)

    // Find all active patients
    const activePatients = fhirBundle.findResources<Patient>(
      'Patient',
      (resource) => resource.active === true,
    )

    expect(activePatients).toHaveLength(1)
    expect(activePatients[0].id).toBe('1')
  })

  it('should return empty array when no resources match', () => {
    const bundle: Bundle = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'Patient',
            id: '1',
            active: false,
          } as Patient,
        },
      ],
    }

    const fhirBundle = FhirBundle.parseGeneric(bundle)

    const activePatients = fhirBundle.findResources<Patient>(
      'Patient',
      (resource) => resource.active === true,
    )

    expect(activePatients).toHaveLength(0)
  })

  it('should handle bundles with no entries', () => {
    const bundle: Bundle = {
      resourceType: 'Bundle',
      type: 'collection',
    }

    const fhirBundle = FhirBundle.parseGeneric(bundle)

    const results = fhirBundle.findResources('Patient')
    expect(results).toHaveLength(0)
  })

  it('should handle entries without resources', () => {
    const bundle: Bundle = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          fullUrl: 'http://example.com/Patient/1',
        },
        {
          resource: {
            resourceType: 'Patient',
            id: '2',
            active: true,
          } as Patient,
        },
      ],
    }

    const fhirBundle = FhirBundle.parseGeneric(bundle)

    const patients = fhirBundle.findResources('Patient')

    expect(patients).toHaveLength(1)
    expect(patients[0].id).toBe('2')
  })

  it('should work with complex predicates', () => {
    const bundle: Bundle = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'Observation',
            id: '1',
            status: 'final',
            code: {
              coding: [
                {
                  system: 'http://loinc.org',
                  code: '8867-4',
                },
              ],
            },
          } as Observation,
        },
        {
          resource: {
            resourceType: 'Observation',
            id: '2',
            status: 'preliminary',
            code: {
              coding: [
                {
                  system: 'http://loinc.org',
                  code: '85354-9',
                },
              ],
            },
          } as Observation,
        },
        {
          resource: {
            resourceType: 'Observation',
            id: '3',
            status: 'final',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '12345',
                },
              ],
            },
          } as Observation,
        },
      ],
    }

    const fhirBundle = FhirBundle.parseGeneric(bundle)

    // Find final observations with LOINC codes
    const loincObservations = fhirBundle.findResources<Observation>(
      'Observation',
      (resource) =>
        resource.status === 'final' &&
        (resource.code.coding?.some((c) => c.system === 'http://loinc.org') ??
          false),
    )

    expect(loincObservations).toHaveLength(1)
    expect(loincObservations[0].id).toBe('1')
  })
})
