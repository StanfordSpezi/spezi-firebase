//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type NamingSystemUniqueId, type NamingSystem } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  periodSchema,
  stringSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  namingSystemKindSchema,
  namingSystemUniqueIdTypeSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const namingSystemUniqueIdSchema: ZodType<NamingSystemUniqueId> =
  backboneElementSchema.extend({
    type: namingSystemUniqueIdTypeSchema,
    _type: elementSchema.optional(),
    value: stringSchema,
    _value: elementSchema.optional(),
    preferred: booleanSchema.optional(),
    _preferred: elementSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
    period: periodSchema.optional(),
  })

/**
 * Zod schema for FHIR NamingSystem resource (untyped version).
 */
export const untypedNamingSystemSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('NamingSystem').readonly(),
    name: stringSchema,
    _name: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    kind: namingSystemKindSchema,
    _kind: elementSchema.optional(),
    date: dateTimeSchema,
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    responsible: stringSchema.optional(),
    _responsible: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    usage: stringSchema.optional(),
    _usage: elementSchema.optional(),
    uniqueId: namingSystemUniqueIdSchema.array(),
  }),
) satisfies ZodType<NamingSystem>

/**
 * Zod schema for FHIR NamingSystem resource.
 */
export const namingSystemSchema: ZodType<NamingSystem> =
  untypedNamingSystemSchema

/**
 * Wrapper class for FHIR NamingSystem resources.
 * Provides utility methods for working with naming systems and identifier registries.
 */
export class FhirNamingSystem extends FhirDomainResource<NamingSystem> {
  // Static Functions

  /**
   * Parses a NamingSystem resource from unknown data.
   *
   * @param value - The data to parse and validate against the NamingSystem schema
   * @returns A FhirNamingSystem instance containing the validated resource
   */
  public static parse(value: unknown): FhirNamingSystem {
    return new FhirNamingSystem(namingSystemSchema.parse(value))
  }
}
