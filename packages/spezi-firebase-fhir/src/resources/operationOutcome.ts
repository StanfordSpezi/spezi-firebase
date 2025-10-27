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

export const untypedOperationOutcomeSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('OperationOutcome').readonly(),
    issue: backboneElementSchema
      .extend({
        severity: z.enum(['fatal', 'error', 'warning', 'information']),
        _severity: elementSchema.optional(),
        code: z.enum([
          'invalid',
          'structure',
          'required',
          'value',
          'invariant',
          'security',
          'login',
          'unknown',
          'expired',
          'forbidden',
          'suppressed',
          'processing',
          'not-supported',
          'duplicate',
          'multiple-matches',
          'not-found',
          'deleted',
          'too-long',
          'code-invalid',
          'extension',
          'too-costly',
          'business-rule',
          'conflict',
          'transient',
          'lock-error',
          'no-store',
          'exception',
          'timeout',
          'throttled',
          'informational',
        ]),
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
