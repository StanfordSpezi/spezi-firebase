//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Provenance } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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
    agent: backboneElementSchema
      .extend({
        type: codeableConceptSchema.optional(),
        role: codeableConceptSchema.array().optional(),
        who: referenceSchema,
        onBehalfOf: referenceSchema.optional(),
      })
      .array()
      .min(1),
    entity: backboneElementSchema
      .extend({
        role: provenanceEntityRoleSchema,
        _role: elementSchema.optional(),
        what: referenceSchema,
        agent: z
          .array(
            z.lazy(() =>
              backboneElementSchema.extend({
                type: codeableConceptSchema.optional(),
                role: codeableConceptSchema.array().optional(),
                who: referenceSchema,
                onBehalfOf: referenceSchema.optional(),
              }),
            ),
          )
          .optional(),
      })
      .array()
      .optional(),
    signature: signatureSchema.array().optional(),
  }),
) satisfies ZodType<Provenance>

export const provenanceSchema: ZodType<Provenance> = untypedProvenanceSchema

export class FhirProvenance extends FhirDomainResource<Provenance> {
  // Static Functions

  public static parse(value: unknown): FhirProvenance {
    return new FhirProvenance(provenanceSchema.parse(value))
  }
}
