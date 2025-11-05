//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ClinicalImpression,
  type ClinicalImpressionFinding,
  type ClinicalImpressionInvestigation,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { clinicalImpressionStatusSchema } from '../valueSets/index.js'

const clinicalImpressionFindingSchema: ZodType<ClinicalImpressionFinding> =
  backboneElementSchema.extend({
    itemCodeableConcept: codeableConceptSchema.optional(),
    itemReference: referenceSchema.optional(),
    basis: stringSchema.optional(),
    _basis: elementSchema.optional(),
  })

const clinicalImpressionInvestigationSchema: ZodType<ClinicalImpressionInvestigation> =
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    item: referenceSchema.array().optional(),
  })

export const untypedClinicalImpressionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ClinicalImpression').readonly(),
    identifier: identifierSchema.array().optional(),
    status: clinicalImpressionStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    code: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    effectiveDateTime: dateTimeSchema.optional(),
    _effectiveDateTime: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    assessor: referenceSchema.optional(),
    previous: referenceSchema.optional(),
    problem: referenceSchema.array().optional(),
    investigation: clinicalImpressionInvestigationSchema.array().optional(),
    protocol: z.string().array().optional(),
    _protocol: elementSchema.array().optional(),
    summary: stringSchema.optional(),
    _summary: elementSchema.optional(),
    finding: clinicalImpressionFindingSchema.array().optional(),
    prognosisCodeableConcept: codeableConceptSchema.array().optional(),
    prognosisReference: referenceSchema.array().optional(),
    supportingInfo: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<ClinicalImpression>

export const clinicalImpressionSchema: ZodType<ClinicalImpression> =
  untypedClinicalImpressionSchema

export class FhirClinicalImpression extends FhirDomainResource<ClinicalImpression> {
  // Static Functions

  public static parse(value: unknown): FhirClinicalImpression {
    return new FhirClinicalImpression(clinicalImpressionSchema.parse(value))
  }
}
