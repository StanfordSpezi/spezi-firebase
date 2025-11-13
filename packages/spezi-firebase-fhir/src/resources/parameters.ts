//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Parameters, type ParametersParameter } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { fhirResourceSchema } from './fhirResource.js'
import { anyValueSchema } from '../elements/anyValueSchema.js'
import {
  domainResourceSchema,
  elementSchema,
  stringSchema,
} from '../elements/index.js'

const parametersParameterSchema: ZodType<ParametersParameter> =
  anyValueSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    get resource() {
      return fhirResourceSchema.optional()
    },
    get part() {
      return parametersParameterSchema.array().optional()
    },
  })

/**
 * Zod schema for FHIR Parameters resource (untyped version).
 */
export const untypedParametersSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Parameters').readonly(),
    parameter: parametersParameterSchema.array().optional(),
  }),
) satisfies ZodType<Parameters>

/**
 * Zod schema for FHIR Parameters resource.
 */
export const parametersSchema: ZodType<Parameters> = untypedParametersSchema

/**
 * Wrapper class for FHIR Parameters resources.
 * Useful for handling operation inputs/outputs that are represented as Parameters.
 */
export class FhirParameters extends FhirDomainResource<Parameters> {
  // Static Functions

  /**
   * Parses a Parameters resource from unknown data.
   *
   * @param value - The data to parse and validate against the Parameters schema
   * @returns A FhirParameters instance containing the validated resource
   */
  public static parse(value: unknown): FhirParameters {
    return new FhirParameters(parametersSchema.parse(value))
  }
}
