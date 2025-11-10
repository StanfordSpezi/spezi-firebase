//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ConsentPolicy,
  type ConsentProvision,
  type ConsentProvisionActor,
  type ConsentProvisionData,
  type ConsentVerification,
  type Consent,
} from 'fhir/r4b.js'
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
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import {
  consentDataMeaningSchema,
  consentStatusSchema,
  consentProvisionTypeSchema,
} from '../valueSets/index.js'

const consentPolicySchema: ZodType<ConsentPolicy> =
  backboneElementSchema.extend({
    authority: stringSchema.optional(),
    _authority: elementSchema.optional(),
    uri: uriSchema.optional(),
    _uri: elementSchema.optional(),
  })

const consentVerificationSchema: ZodType<ConsentVerification> =
  backboneElementSchema.extend({
    verified: booleanSchema,
    _verified: elementSchema.optional(),
    verificationDate: dateTimeSchema.optional(),
    _verificationDate: elementSchema.optional(),
    verifiedWith: referenceSchema.optional(),
  })

const consentProvisionActorSchema: ZodType<ConsentProvisionActor> =
  backboneElementSchema.extend({
    role: codeableConceptSchema,
    reference: referenceSchema,
  })

const consentProvisionDataSchema: ZodType<ConsentProvisionData> =
  backboneElementSchema.extend({
    meaning: consentDataMeaningSchema,
    _meaning: elementSchema.optional(),
    reference: referenceSchema,
  })

const consentProvisionSchema: ZodType<ConsentProvision> =
  backboneElementSchema.extend({
    type: consentProvisionTypeSchema.optional(),
    _type: elementSchema.optional(),
    period: periodSchema.optional(),
    actor: consentProvisionActorSchema.array().optional(),
    action: codeableConceptSchema.array().optional(),
    securityLabel: codingSchema.array().optional(),
    purpose: codingSchema.array().optional(),
    class: codingSchema.array().optional(),
    code: codeableConceptSchema.array().optional(),
    dataPeriod: periodSchema.optional(),
    data: consentProvisionDataSchema.array().optional(),
    get provision() {
      return consentProvisionSchema.array().optional()
    },
  })

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
    policy: consentPolicySchema.array().optional(),
    policyRule: codeableConceptSchema.optional(),
    verification: consentVerificationSchema.array().optional(),
    provision: consentProvisionSchema.optional(),
  }),
) satisfies ZodType<Consent>

export const consentSchema: ZodType<Consent> = untypedConsentSchema

export class FhirConsent extends FhirDomainResource<Consent> {
  // Static Functions

  public static parse(value: unknown): FhirConsent {
    return new FhirConsent(consentSchema.parse(value))
  }
}
