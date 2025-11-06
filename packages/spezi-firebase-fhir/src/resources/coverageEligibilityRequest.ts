//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CoverageEligibilityRequest } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  referenceSchema,
  dateTimeSchema,
  periodSchema,
  dateSchema,
  positiveIntSchema,
  moneySchema,
  stringSchema,
  quantitySchema,
  booleanSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  eligibilityRequestPurposeSchema,
} from '../valueSets/index.js'

export const untypedCoverageEligibilityRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CoverageEligibilityRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    priority: codeableConceptSchema.optional(),
    purpose: eligibilityRequestPurposeSchema.array(),
    _purpose: elementSchema.array().optional(),
    patient: referenceSchema,
    servicedDate: dateSchema.optional(),
    _servicedDate: elementSchema.optional(),
    servicedPeriod: periodSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    enterer: referenceSchema.optional(),
    provider: referenceSchema.optional(),
    insurer: referenceSchema,
    facility: referenceSchema.optional(),
    supportingInfo: backboneElementSchema
      .extend({
        sequence: positiveIntSchema,
        information: referenceSchema,
        appliesToAll: booleanSchema.optional(),
        _appliesToAll: elementSchema.optional(),
      })
      .array()
      .optional(),
    insurance: backboneElementSchema
      .extend({
        focal: z.boolean().optional(),
        _focal: elementSchema.optional(),
        coverage: referenceSchema,
        businessArrangement: stringSchema.optional(),
        _businessArrangement: elementSchema.optional(),
      })
      .array()
      .optional(),
    item: backboneElementSchema
      .extend({
        supportingInfoSequence: positiveIntSchema.array().optional(),
        category: codeableConceptSchema.optional(),
        productOrService: codeableConceptSchema.optional(),
        modifier: codeableConceptSchema.array().optional(),
        provider: referenceSchema.optional(),
        quantity: quantitySchema.optional(),
        unitPrice: moneySchema.optional(),
        facility: referenceSchema.optional(),
        diagnosis: backboneElementSchema
          .extend({
            diagnosisCodeableConcept: codeableConceptSchema.optional(),
            diagnosisReference: referenceSchema.optional(),
          })
          .array()
          .optional(),
        detail: referenceSchema.array().optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<CoverageEligibilityRequest>

export const coverageEligibilityRequestSchema: ZodType<CoverageEligibilityRequest> =
  untypedCoverageEligibilityRequestSchema

export class FhirCoverageEligibilityRequest extends FhirDomainResource<CoverageEligibilityRequest> {
  // Static Functions

  public static parse(value: unknown): FhirCoverageEligibilityRequest {
    return new FhirCoverageEligibilityRequest(
      coverageEligibilityRequestSchema.parse(value),
    )
  }
}
