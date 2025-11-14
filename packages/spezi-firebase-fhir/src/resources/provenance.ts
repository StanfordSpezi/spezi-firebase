//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ProvenanceAgent,
  type ProvenanceEntity,
  type Provenance,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  instantSchema,
  periodSchema,
  referenceSchema,
  signatureSchema,
  uriSchema,
} from '../elements/index.js'
import { provenanceEntityRoleSchema } from '../valueSets/index.js'

const provenanceAgentSchema: ZodType<ProvenanceAgent> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    role: codeableConceptSchema.array().optional(),
    who: referenceSchema,
    onBehalfOf: referenceSchema.optional(),
  })

const provenanceEntitySchema: ZodType<ProvenanceEntity> =
  backboneElementSchema.extend({
    role: provenanceEntityRoleSchema,
    _role: elementSchema.optional(),
    what: referenceSchema,
    agent: provenanceAgentSchema.array().optional(),
  })

/**
 * Zod schema for FHIR Provenance resource (untyped version).
 */
export const untypedProvenanceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Provenance').readonly(),
    target: referenceSchema.array().min(1),
    occurredPeriod: periodSchema.optional(),
    occurredDateTime: dateTimeSchema.optional(),
    _occurredDateTime: elementSchema.optional(),
    recorded: instantSchema,
    _recorded: elementSchema.optional(),
    policy: uriSchema.array().optional(),
    _policy: elementSchema.array().optional(),
    location: referenceSchema.optional(),
    reason: codeableConceptSchema.array().optional(),
    activity: codeableConceptSchema.optional(),
    agent: provenanceAgentSchema.array().min(1),
    entity: provenanceEntitySchema.array().optional(),
    signature: signatureSchema.array().optional(),
  }),
) satisfies ZodType<Provenance>

/**
 * Zod schema for FHIR Provenance resource.
 */
export const provenanceSchema: ZodType<Provenance> = untypedProvenanceSchema

/**
 * Wrapper class for FHIR Provenance resources.
 * Provides utility methods for working with provenance and audit trail information.
 */
export class FhirProvenance extends FhirDomainResource<Provenance> {
  /**
   * Parses a Provenance resource from unknown data.
   *
   * @param value - The data to parse and validate against the Provenance schema
   * @returns A FhirProvenance instance containing the validated resource
   */
  public static parse(value: unknown): FhirProvenance {
    return new FhirProvenance(provenanceSchema.parse(value))
  }

  /**
   * Get the date/time the activity occurred.
   *
   * @returns The recorded date/time, or undefined if not set
   */
  public get recordedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.recorded)
  }

  /**
   * Get the date/time of the activity.
   *
   * @returns The occurred date/time, or undefined if not set
   */
  public get occurredDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.occurredDateTime)
  }
}
