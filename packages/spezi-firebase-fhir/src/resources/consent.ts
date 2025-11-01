//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Consent } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'
import {
  consentDataMeaningSchema,
  consentStatusSchema,
  consentProvisionTypeSchema,
} from '../valueSets/index.js'

export const untypedConsentSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Consent').readonly(),
    identifier: identifierSchema.array().optional(),
    status: consentStatusSchema,
    _status: elementSchema.optional(),
    scope: codeableConceptSchema,
    category: codeableConceptSchema.array().min(1),
    patient: referenceSchema.optional(),
    dateTime: dateTimeSchema.optional(),
    _dateTime: elementSchema.optional(),
    performer: referenceSchema.array().optional(),
    organization: referenceSchema.array().optional(),
    sourceAttachment: attachmentSchema.optional(),
    sourceReference: referenceSchema.optional(),
    policy: backboneElementSchema
      .extend({
        authority: z.string().optional(),
        _authority: elementSchema.optional(),
        uri: z.string().optional(),
        _uri: elementSchema.optional(),
      })
      .array()
      .optional(),
    policyRule: codeableConceptSchema.optional(),
    verification: backboneElementSchema
      .extend({
        verified: booleanSchema,
        _verified: elementSchema.optional(),
        verificationDate: dateTimeSchema.optional(),
        _verificationDate: elementSchema.optional(),
        verifiedWith: referenceSchema.optional(),
      })
      .array()
      .optional(),
    provision: z
      .lazy(() =>
        backboneElementSchema.extend({
          type: consentProvisionTypeSchema.optional(),
          _type: elementSchema.optional(),
          period: periodSchema.optional(),
          actor: backboneElementSchema
            .extend({
              role: codeableConceptSchema,
              reference: referenceSchema,
            })
            .array()
            .optional(),
          action: codeableConceptSchema.array().optional(),
          securityLabel: codingSchema.array().optional(),
          purpose: codingSchema.array().optional(),
          class: codingSchema.array().optional(),
          code: codeableConceptSchema.array().optional(),
          dataPeriod: periodSchema.optional(),
          data: backboneElementSchema
            .extend({
              meaning: consentDataMeaningSchema,
              _meaning: elementSchema.optional(),
              reference: referenceSchema,
            })
            .array()
            .optional(),
          provision: z.array(z.lazy(() => backboneElementSchema)).optional(),
        }),
      )
      .optional(),
  }),
) satisfies ZodType<Consent>

export const consentSchema: ZodType<Consent> = untypedConsentSchema

export class FhirConsent extends FhirDomainResource<Consent> {
  // Static Functions

  public static parse(value: unknown): FhirConsent {
    return new FhirConsent(consentSchema.parse(value))
  }
}
