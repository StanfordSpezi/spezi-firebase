//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type FamilyMemberHistoryCondition,
  type FamilyMemberHistory,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { familyMemberHistoryStatusSchema } from '../valueSets/index.js'

const familyMemberHistoryConditionSchema: ZodType<FamilyMemberHistoryCondition> =
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    outcome: codeableConceptSchema.optional(),
    contributedToDeath: booleanSchema.optional(),
    _contributedToDeath: elementSchema.optional(),
    onsetAge: quantitySchema.optional(),
    onsetRange: rangeSchema.optional(),
    onsetPeriod: periodSchema.optional(),
    onsetString: stringSchema.optional(),
    _onsetString: elementSchema.optional(),
    note: annotationSchema.array().optional(),
  })

export const untypedFamilyMemberHistorySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('FamilyMemberHistory').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: uriSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    status: familyMemberHistoryStatusSchema,
    _status: elementSchema.optional(),
    dataAbsentReason: codeableConceptSchema.optional(),
    patient: referenceSchema,
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    relationship: codeableConceptSchema,
    sex: codeableConceptSchema.optional(),
    bornPeriod: periodSchema.optional(),
    bornDate: dateSchema.optional(),
    _bornDate: elementSchema.optional(),
    bornString: stringSchema.optional(),
    _bornString: elementSchema.optional(),
    ageAge: quantitySchema.optional(),
    ageRange: rangeSchema.optional(),
    ageString: stringSchema.optional(),
    _ageString: elementSchema.optional(),
    estimatedAge: booleanSchema.optional(),
    _estimatedAge: elementSchema.optional(),
    deceasedBoolean: booleanSchema.optional(),
    _deceasedBoolean: elementSchema.optional(),
    deceasedAge: quantitySchema.optional(),
    deceasedRange: rangeSchema.optional(),
    deceasedDate: dateSchema.optional(),
    _deceasedDate: elementSchema.optional(),
    deceasedString: stringSchema.optional(),
    _deceasedString: elementSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    condition: familyMemberHistoryConditionSchema.array().optional(),
  }),
) satisfies ZodType<FamilyMemberHistory>

export const familyMemberHistorySchema: ZodType<FamilyMemberHistory> =
  untypedFamilyMemberHistorySchema

export class FhirFamilyMemberHistory extends FhirDomainResource<FamilyMemberHistory> {
  // Static Functions

  public static parse(value: unknown): FhirFamilyMemberHistory {
    return new FhirFamilyMemberHistory(familyMemberHistorySchema.parse(value))
  }
}
