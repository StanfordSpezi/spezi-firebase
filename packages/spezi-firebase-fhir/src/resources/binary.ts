//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Binary } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { referenceSchema } from '../elements/dataTypes/reference.js'
import {
  base64BinarySchema,
  codeSchema,
  elementSchema,
} from '../elements/index.js'
import { resourceSchema } from '../elements/resource.js'

/**
 * Zod schema for FHIR Binary resource (untyped version).
 */
export const untypedBinarySchema = z.lazy(() =>
  resourceSchema.extend({
    resourceType: z.literal('Binary').readonly(),
    contentType: codeSchema,
    _contentType: elementSchema.optional(),
    securityContext: referenceSchema.optional(),
    data: base64BinarySchema.optional(),
    _data: elementSchema.optional(),
  }),
) satisfies ZodType<Binary>

/**
 * Zod schema for FHIR Binary resource.
 */
export const binarySchema: ZodType<Binary> = untypedBinarySchema

/**
 * Wrapper class for FHIR Binary resources.
 * Provides utility methods for working with binary data.
 */
export class FhirBinary extends FhirDomainResource<Binary> {
  // Static Functions

  /**
   * Parses a Binary resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirBinary instance
   */
  public static parse(value: unknown): FhirBinary {
    return new FhirBinary(binarySchema.parse(value))
  }

  // Methods

  /**
   * Decodes the base64-encoded data into a Uint8Array.
   * Works in both browser and Node.js environments.
   *
   * @returns A Uint8Array containing the decoded binary data, or undefined if no data
   *
   * @example
   * ```typescript
   * const binary = FhirBinary.parse(binaryResource)
   * const data = binary.getDataAsUint8Array()
   * if (data) {
   *   console.log(`Binary data size: ${data.length} bytes`)
   * }
   * ```
   */
  public get dataAsUint8Array(): Uint8Array | undefined {
    return FhirDomainResource.decodeBase64Binary(this.value.data)
  }
}
