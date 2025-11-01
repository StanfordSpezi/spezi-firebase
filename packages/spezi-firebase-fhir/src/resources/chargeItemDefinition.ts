//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ChargeItemDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
  booleanSchema,
  dateSchema,
  uriSchema,
  canonicalSchema,
  moneySchema,
  decimalSchema,
  usageContextSchema,
  contactDetailSchema,
} from '../elements/index.js'
import {
  chargeItemDefinitionStatusSchema,
  priceComponentTypeSchema,
} from '../valueSets/index.js'

export const untypedChargeItemDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ChargeItemDefinition').readonly(),
    url: uriSchema,
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    derivedFromUri: uriSchema.array().optional(),
    _derivedFromUri: elementSchema.array().optional(),
    partOf: canonicalSchema.array().optional(),
    _partOf: elementSchema.array().optional(),
    replaces: canonicalSchema.array().optional(),
    _replaces: elementSchema.array().optional(),
    status: chargeItemDefinitionStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    copyright: stringSchema.optional(),
    _copyright: elementSchema.optional(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    code: codeableConceptSchema.optional(),
    instance: referenceSchema.array().optional(),
    applicability: backboneElementSchema
      .extend({
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        language: stringSchema.optional(),
        _language: elementSchema.optional(),
        expression: stringSchema.optional(),
        _expression: elementSchema.optional(),
      })
      .array()
      .optional(),
    propertyGroup: backboneElementSchema
      .extend({
        applicability: backboneElementSchema
          .extend({
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            language: stringSchema.optional(),
            _language: elementSchema.optional(),
            expression: stringSchema.optional(),
            _expression: elementSchema.optional(),
          })
          .array()
          .optional(),
        priceComponent: backboneElementSchema
          .extend({
            type: priceComponentTypeSchema,
            _type: elementSchema.optional(),
            code: codeableConceptSchema.optional(),
            factor: decimalSchema.optional(),
            amount: moneySchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<ChargeItemDefinition>

export const chargeItemDefinitionSchema: ZodType<ChargeItemDefinition> =
  untypedChargeItemDefinitionSchema

export class FhirChargeItemDefinition extends FhirDomainResource<ChargeItemDefinition> {
  public static parse(value: unknown): FhirChargeItemDefinition {
    return new FhirChargeItemDefinition(chargeItemDefinitionSchema.parse(value))
  }
}
