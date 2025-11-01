//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CoverageEligibilityResponse } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  referenceSchema,
  stringSchema,
  dateTimeSchema,
  periodSchema,
  dateSchema,
  moneySchema,
  booleanSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  remittanceOutcomeSchema,
  eligibilityResponsePurposeSchema,
} from '../valueSets/index.js'

export const untypedCoverageEligibilityResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CoverageEligibilityResponse').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    purpose: eligibilityResponsePurposeSchema.array(),
    _purpose: elementSchema.array().optional(),
    patient: referenceSchema,
    servicedDate: dateSchema.optional(),
    _servicedDate: elementSchema.optional(),
    servicedPeriod: periodSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    requestor: referenceSchema.optional(),
    request: referenceSchema,
    outcome: remittanceOutcomeSchema,
    _outcome: elementSchema.optional(),
    disposition: stringSchema.optional(),
    _disposition: elementSchema.optional(),
    insurer: referenceSchema,
    insurance: backboneElementSchema
      .extend({
        coverage: referenceSchema,
        inforce: booleanSchema.optional(),
        _inforce: elementSchema.optional(),
        benefitPeriod: periodSchema.optional(),
        item: backboneElementSchema
          .extend({
            category: codeableConceptSchema.optional(),
            productOrService: codeableConceptSchema.optional(),
            modifier: codeableConceptSchema.array().optional(),
            provider: referenceSchema.optional(),
            excluded: booleanSchema.optional(),
            _excluded: elementSchema.optional(),
            name: stringSchema.optional(),
            _name: elementSchema.optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            network: codeableConceptSchema.optional(),
            unit: codeableConceptSchema.optional(),
            term: codeableConceptSchema.optional(),
            benefit: backboneElementSchema
              .extend({
                type: codeableConceptSchema,
                allowedUnsignedInt: z.number().optional(),
                allowedString: stringSchema.optional(),
                _allowedString: elementSchema.optional(),
                allowedMoney: moneySchema.optional(),
                usedUnsignedInt: z.number().optional(),
                usedString: stringSchema.optional(),
                _usedString: elementSchema.optional(),
                usedMoney: moneySchema.optional(),
              })
              .array()
              .optional(),
            authorizationRequired: booleanSchema.optional(),
            _authorizationRequired: elementSchema.optional(),
            authorizationSupporting: codeableConceptSchema.array().optional(),
            authorizationUrl: z.string().optional(),
            _authorizationUrl: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    preAuthRef: stringSchema.optional(),
    _preAuthRef: elementSchema.optional(),
    form: codeableConceptSchema.optional(),
    error: backboneElementSchema
      .extend({
        code: codeableConceptSchema,
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<CoverageEligibilityResponse>

export const coverageEligibilityResponseSchema: ZodType<CoverageEligibilityResponse> =
  untypedCoverageEligibilityResponseSchema

export class FhirCoverageEligibilityResponse extends FhirDomainResource<CoverageEligibilityResponse> {
  public static parse(value: unknown): FhirCoverageEligibilityResponse {
    return new FhirCoverageEligibilityResponse(
      coverageEligibilityResponseSchema.parse(value),
    )
  }
}
