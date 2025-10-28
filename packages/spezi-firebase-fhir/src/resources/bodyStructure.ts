//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type BodyStructure } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  booleanSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

export const untypedBodyStructureSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('BodyStructure').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    morphology: codeableConceptSchema.optional(),
    location: codeableConceptSchema.optional(),
    locationQualifier: codeableConceptSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    image: attachmentSchema.array().optional(),
    patient: referenceSchema,
  }),
) satisfies ZodType<BodyStructure>

export const bodyStructureSchema: ZodType<BodyStructure> =
  untypedBodyStructureSchema

export class FhirBodyStructure extends FhirDomainResource<BodyStructure> {
  // Static Functions

  public static parse(value: unknown): FhirBodyStructure {
    return new FhirBodyStructure(bodyStructureSchema.parse(value))
  }
}
