//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type OperationOutcome } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  stringSchema,
} from '../elements/index.js'
import { issueSeveritySchema, issueTypeSchema } from '../valueSets/index.js'

export const untypedOperationOutcomeSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('OperationOutcome').readonly(),
    issue: backboneElementSchema
      .extend({
        severity: issueSeveritySchema,
        _severity: elementSchema.optional(),
        code: issueTypeSchema,
        _code: elementSchema.optional(),
        details: codeableConceptSchema.optional(),
        diagnostics: stringSchema.optional(),
        _diagnostics: elementSchema.optional(),
        location: stringSchema.array().optional(),
        _location: elementSchema.array().optional(),
        expression: stringSchema.array().optional(),
        _expression: elementSchema.array().optional(),
      })
      .array(),
  }),
) satisfies ZodType<OperationOutcome>

export const operationOutcomeSchema: ZodType<OperationOutcome> =
  untypedOperationOutcomeSchema

export class FhirOperationOutcome extends FhirDomainResource<OperationOutcome> {
  // Static Functions

  public static parse(value: unknown): FhirOperationOutcome {
    return new FhirOperationOutcome(operationOutcomeSchema.parse(value))
  }
}
