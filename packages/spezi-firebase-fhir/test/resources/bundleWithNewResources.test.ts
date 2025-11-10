//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { consentSchema, FhirBundle } from '../../src/index.js'

describe('Bundle with new resource types', () => {
  it('should validate a Bundle containing Consent resources', () => {
    const bundleData = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'Consent',
            id: 'consent-1',
            status: 'active',
            scope: {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/consentscope',
                  code: 'patient-privacy',
                },
              ],
            },
            category: [
              {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                    code: 'INFA',
                  },
                ],
              },
            ],
          },
        },
      ],
    }

    const consentBundle = FhirBundle.parse(bundleData, consentSchema)
    expect(consentBundle.value.entry?.[0]?.resource?.resourceType).toBe(
      'Consent',
    )

    const genericBundle = FhirBundle.parseGeneric(bundleData)
    expect(genericBundle.value.entry?.[0]?.resource?.resourceType).toBe(
      'Consent',
    )
  })

  it('should validate a Bundle containing Provenance resources', () => {
    const bundleData = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'Provenance',
            id: 'provenance-1',
            target: [{ reference: 'Patient/example' }],
            recorded: '2023-01-15T10:30:00Z',
            agent: [
              {
                who: { reference: 'Practitioner/example' },
              },
            ],
          },
        },
      ],
    }

    const bundle = FhirBundle.parseGeneric(bundleData)
    expect(bundle.value.entry?.[0]?.resource?.resourceType).toBe('Provenance')
  })

  it('should validate a Bundle containing AuditEvent resources', () => {
    const bundleData = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'AuditEvent',
            id: 'audit-1',
            type: {
              system: 'http://terminology.hl7.org/CodeSystem/audit-event-type',
              code: 'rest',
            },
            recorded: '2023-01-15T10:30:00Z',
            agent: [
              {
                who: { reference: 'Practitioner/example' },
                requestor: true,
              },
            ],
            source: {
              observer: { reference: 'Device/audit-system' },
            },
          },
        },
      ],
    }

    const bundle = FhirBundle.parseGeneric(bundleData)
    expect(bundle.value.entry?.[0]?.resource?.resourceType).toBe('AuditEvent')
  })

  it('should validate a Bundle containing Contract resources', () => {
    const bundleData = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'Contract',
            id: 'contract-1',
            status: 'executed',
            issued: '2023-01-15T10:30:00Z',
            type: {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/contract-type',
                  code: 'privacy',
                },
              ],
            },
            term: [
              {
                offer: {
                  text: 'Patient agrees to privacy terms',
                },
              },
            ],
          },
        },
      ],
    }

    const bundle = FhirBundle.parseGeneric(bundleData)
    expect(bundle.value.entry?.[0]?.resource?.resourceType).toBe('Contract')
  })

  it('should validate a Bundle containing VerificationResult resources', () => {
    const bundleData = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'VerificationResult',
            id: 'verification-1',
            status: 'validated',
            statusDate: '2023-01-15T10:30:00Z',
          },
        },
      ],
    }

    const bundle = FhirBundle.parseGeneric(bundleData)
    expect(bundle.value.entry?.[0]?.resource?.resourceType).toBe(
      'VerificationResult',
    )
  })

  it('should validate a Bundle containing multiple new resource types', () => {
    const bundleData = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'Consent',
            id: 'consent-1',
            status: 'active',
            scope: {
              coding: [{ system: 'http://example.org', code: 'privacy' }],
            },
            category: [
              {
                coding: [{ system: 'http://example.org', code: 'INFA' }],
              },
            ],
          },
        },
        {
          resource: {
            resourceType: 'Provenance',
            id: 'provenance-1',
            target: [{ reference: 'Consent/consent-1' }],
            recorded: '2023-01-15T10:30:00Z',
            agent: [{ who: { reference: 'Practitioner/example' } }],
          },
        },
        {
          resource: {
            resourceType: 'AuditEvent',
            id: 'audit-1',
            type: { system: 'http://example.org', code: 'rest' },
            recorded: '2023-01-15T10:30:00Z',
            agent: [
              { who: { reference: 'Practitioner/example' }, requestor: true },
            ],
            source: { observer: { reference: 'Device/system' } },
          },
        },
      ],
    }

    const bundle = FhirBundle.parseGeneric(bundleData)
    expect(bundle.value.entry?.length).toBe(3)
    expect(bundle.value.entry?.[0]?.resource?.resourceType).toBe('Consent')
    expect(bundle.value.entry?.[1]?.resource?.resourceType).toBe('Provenance')
    expect(bundle.value.entry?.[2]?.resource?.resourceType).toBe('AuditEvent')
  })
})
