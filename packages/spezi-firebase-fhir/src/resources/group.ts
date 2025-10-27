//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Group } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
  unsignedIntSchema,
} from '../elements/index.js'
import { groupTypeSchema } from '../valueSets/index.js'

export const untypedGroupSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Group').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    type: groupTypeSchema,
    _type: elementSchema.optional(),
    actual: booleanSchema,
    _actual: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    quantity: unsignedIntSchema.optional(),
    _quantity: elementSchema.optional(),
    managingEntity: referenceSchema.optional(),
    characteristic: backboneElementSchema
      .extend({
        code: codeableConceptSchema,
        valueCodeableConcept: codeableConceptSchema.optional(),
        valueBoolean: booleanSchema.optional(),
        _valueBoolean: elementSchema.optional(),
        valueQuantity: quantitySchema.optional(),
        valueRange: rangeSchema.optional(),
        valueReference: referenceSchema.optional(),
        exclude: booleanSchema,
        _exclude: elementSchema.optional(),
        period: periodSchema.optional(),
      })
      .array()
      .optional(),
    member: backboneElementSchema
      .extend({
        entity: referenceSchema,
        period: periodSchema.optional(),
        inactive: booleanSchema.optional(),
        _inactive: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Group>

export const groupSchema: ZodType<Group> = untypedGroupSchema

export class FhirGroup extends FhirDomainResource<Group> {
  // Static Functions

  public static parse(value: unknown): FhirGroup {
    return new FhirGroup(groupSchema.parse(value))
  }
}
