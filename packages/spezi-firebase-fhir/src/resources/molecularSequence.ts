//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MolecularSequence } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  molecularSequenceTypeSchema,
  orientationTypeSchema,
  strandTypeSchema,
  qualityTypeSchema,
  repositoryTypeSchema,
} from '../valueSets/index.js'

const molecularSequenceReferenceSeqSchema = z.lazy(() =>
  backboneElementSchema.extend({
    chromosome: codeableConceptSchema.optional(),
    genomeBuild: stringSchema.optional(),
    _genomeBuild: elementSchema.optional(),
    orientation: orientationTypeSchema.optional(),
    _orientation: elementSchema.optional(),
    referenceSeqId: codeableConceptSchema.optional(),
    referenceSeqPointer: referenceSchema.optional(),
    referenceSeqString: stringSchema.optional(),
    _referenceSeqString: elementSchema.optional(),
    strand: strandTypeSchema.optional(),
    _strand: elementSchema.optional(),
    windowStart: intSchema.optional(),
    windowEnd: intSchema.optional(),
  }),
)

const molecularSequenceVariantSchema = z.lazy(() =>
  backboneElementSchema.extend({
    start: intSchema.optional(),
    end: intSchema.optional(),
    observedAllele: stringSchema.optional(),
    _observedAllele: elementSchema.optional(),
    referenceAllele: stringSchema.optional(),
    _referenceAllele: elementSchema.optional(),
    cigar: stringSchema.optional(),
    _cigar: elementSchema.optional(),
    variantPointer: referenceSchema.optional(),
  }),
)

const molecularSequenceQualityRocSchema = z.lazy(() =>
  backboneElementSchema.extend({
    score: intSchema.array().optional(),
    numTP: intSchema.array().optional(),
    numFP: intSchema.array().optional(),
    numFN: intSchema.array().optional(),
    precision: intSchema.array().optional(),
    sensitivity: intSchema.array().optional(),
    fMeasure: intSchema.array().optional(),
  }),
)

const molecularSequenceQualitySchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: qualityTypeSchema,
    _type: elementSchema.optional(),
    standardSequence: codeableConceptSchema.optional(),
    start: intSchema.optional(),
    end: intSchema.optional(),
    score: quantitySchema.optional(),
    method: codeableConceptSchema.optional(),
    truthTP: intSchema.optional(),
    queryTP: intSchema.optional(),
    truthFN: intSchema.optional(),
    queryFP: intSchema.optional(),
    gtFP: intSchema.optional(),
    precision: intSchema.optional(),
    recall: intSchema.optional(),
    fScore: intSchema.optional(),
    roc: molecularSequenceQualityRocSchema.optional(),
  }),
)

const molecularSequenceRepositorySchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: repositoryTypeSchema,
    _type: elementSchema.optional(),
    url: stringSchema.optional(),
    _url: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    datasetId: stringSchema.optional(),
    _datasetId: elementSchema.optional(),
    variantsetId: stringSchema.optional(),
    _variantsetId: elementSchema.optional(),
    readsetId: stringSchema.optional(),
    _readsetId: elementSchema.optional(),
  }),
)

const molecularSequenceStructureVariantInnerSchema = z.lazy(() =>
  backboneElementSchema.extend({
    start: intSchema.optional(),
    end: intSchema.optional(),
  }),
)

const molecularSequenceStructureVariantOuterSchema = z.lazy(() =>
  backboneElementSchema.extend({
    start: intSchema.optional(),
    end: intSchema.optional(),
  }),
)

const molecularSequenceStructureVariantSchema = z.lazy(() =>
  backboneElementSchema.extend({
    variantType: codeableConceptSchema.optional(),
    exact: z.boolean().optional(),
    _exact: elementSchema.optional(),
    length: intSchema.optional(),
    outer: molecularSequenceStructureVariantOuterSchema.optional(),
    inner: molecularSequenceStructureVariantInnerSchema.optional(),
  }),
)

export const untypedMolecularSequenceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MolecularSequence').readonly(),
    identifier: identifierSchema.array().optional(),
    type: molecularSequenceTypeSchema.optional(),
    _type: elementSchema.optional(),
    coordinateSystem: intSchema,
    patient: referenceSchema.optional(),
    specimen: referenceSchema.optional(),
    device: referenceSchema.optional(),
    performer: referenceSchema.optional(),
    quantity: quantitySchema.optional(),
    referenceSeq: molecularSequenceReferenceSeqSchema.optional(),
    variant: molecularSequenceVariantSchema.array().optional(),
    observedSeq: stringSchema.optional(),
    _observedSeq: elementSchema.optional(),
    quality: molecularSequenceQualitySchema.array().optional(),
    readCoverage: intSchema.optional(),
    repository: molecularSequenceRepositorySchema.array().optional(),
    pointer: referenceSchema.array().optional(),
    structureVariant: molecularSequenceStructureVariantSchema
      .array()
      .optional(),
  }),
) satisfies ZodType<MolecularSequence>

export const molecularSequenceSchema: ZodType<MolecularSequence> =
  untypedMolecularSequenceSchema

export class FhirMolecularSequence extends FhirDomainResource<MolecularSequence> {
  // Static Functions

  public static parse(value: unknown): FhirMolecularSequence {
    return new FhirMolecularSequence(molecularSequenceSchema.parse(value))
  }
}
