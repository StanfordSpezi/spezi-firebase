//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type OperationOutcomeIssue, type OperationOutcome } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  stringSchema,
} from '../elements/index.js'
import { issueSeveritySchema, issueTypeSchema } from '../valueSets/index.js'

const operationOutcomeIssueSchema: ZodType<OperationOutcomeIssue> =
  backboneElementSchema.extend({
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

/**
 * Zod schema for FHIR OperationOutcome resource (untyped version).
 */
export const untypedOperationOutcomeSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('OperationOutcome').readonly(),
    issue: operationOutcomeIssueSchema.array(),
  }),
) satisfies ZodType<OperationOutcome>

/**
 * Zod schema for FHIR OperationOutcome resource.
 */
export const operationOutcomeSchema: ZodType<OperationOutcome> =
  untypedOperationOutcomeSchema

/**
 * Wrapper class for FHIR OperationOutcome resources.
 * Provides utility methods for working with operation outcomes and error information.
 */
export class FhirOperationOutcome extends FhirDomainResource<OperationOutcome> {
  // Static Functions

  /**
   * Parses an OperationOutcome resource from unknown data.
   *
   * @param value - The data to parse and validate against the OperationOutcome schema
   * @returns A FhirOperationOutcome instance containing the validated resource
   */
  public static parse(value: unknown): FhirOperationOutcome {
    return new FhirOperationOutcome(operationOutcomeSchema.parse(value))
  }
}
