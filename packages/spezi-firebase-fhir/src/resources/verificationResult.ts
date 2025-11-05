//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type VerificationResultAttestation,
  type VerificationResultPrimarySource,
  type VerificationResultValidator,
  type VerificationResult,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  referenceSchema,
  signatureSchema,
  stringSchema,
  timingSchema,
} from '../elements/index.js'
import { verificationResultStatusSchema } from '../valueSets/index.js'

const verificationResultPrimarySourceSchema: ZodType<VerificationResultPrimarySource> =
  backboneElementSchema.extend({
    who: referenceSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    communicationMethod: codeableConceptSchema.array().optional(),
    validationStatus: codeableConceptSchema.optional(),
    validationDate: dateTimeSchema.optional(),
    _validationDate: elementSchema.optional(),
    canPushUpdates: codeableConceptSchema.optional(),
    pushTypeAvailable: codeableConceptSchema.array().optional(),
  })

const verificationResultAttestationSchema: ZodType<VerificationResultAttestation> =
  backboneElementSchema.extend({
    who: referenceSchema.optional(),
    onBehalfOf: referenceSchema.optional(),
    communicationMethod: codeableConceptSchema.optional(),
    date: dateSchema.optional(),
    _date: elementSchema.optional(),
    sourceIdentityCertificate: stringSchema.optional(),
    _sourceIdentityCertificate: elementSchema.optional(),
    proxyIdentityCertificate: stringSchema.optional(),
    _proxyIdentityCertificate: elementSchema.optional(),
    proxySignature: signatureSchema.optional(),
    sourceSignature: signatureSchema.optional(),
  })

const verificationResultValidatorSchema: ZodType<VerificationResultValidator> =
  backboneElementSchema.extend({
    organization: referenceSchema,
    identityCertificate: stringSchema.optional(),
    _identityCertificate: elementSchema.optional(),
    attestationSignature: signatureSchema.optional(),
  })

export const untypedVerificationResultSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('VerificationResult').readonly(),
    target: referenceSchema.array().optional(),
    targetLocation: stringSchema.array().optional(),
    _targetLocation: elementSchema.array().optional(),
    need: codeableConceptSchema.optional(),
    status: verificationResultStatusSchema,
    _status: elementSchema.optional(),
    statusDate: dateTimeSchema.optional(),
    _statusDate: elementSchema.optional(),
    validationType: codeableConceptSchema.optional(),
    validationProcess: codeableConceptSchema.array().optional(),
    frequency: timingSchema.optional(),
    lastPerformed: dateTimeSchema.optional(),
    _lastPerformed: elementSchema.optional(),
    nextScheduled: dateSchema.optional(),
    _nextScheduled: elementSchema.optional(),
    failureAction: codeableConceptSchema.optional(),
    primarySource: verificationResultPrimarySourceSchema.array().optional(),
    attestation: verificationResultAttestationSchema.optional(),
    validator: verificationResultValidatorSchema.array().optional(),
  }),
) satisfies ZodType<VerificationResult>

export const verificationResultSchema: ZodType<VerificationResult> =
  untypedVerificationResultSchema

export class FhirVerificationResult extends FhirDomainResource<VerificationResult> {
  // Static Functions

  public static parse(value: unknown): FhirVerificationResult {
    return new FhirVerificationResult(verificationResultSchema.parse(value))
  }
}
