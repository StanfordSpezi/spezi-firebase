//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type MolecularSequenceQuality,
  type MolecularSequenceQualityRoc,
  type MolecularSequenceReferenceSeq,
  type MolecularSequenceRepository,
  type MolecularSequenceStructureVariant,
  type MolecularSequenceStructureVariantInner,
  type MolecularSequenceStructureVariantOuter,
  type MolecularSequenceVariant,
  type MolecularSequence,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
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

const molecularSequenceReferenceSeqSchema: ZodType<MolecularSequenceReferenceSeq> =
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
  })

const molecularSequenceVariantSchema: ZodType<MolecularSequenceVariant> =
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
  })

const molecularSequenceQualityRocSchema: ZodType<MolecularSequenceQualityRoc> =
  backboneElementSchema.extend({
    score: intSchema.array().optional(),
    numTP: intSchema.array().optional(),
    numFP: intSchema.array().optional(),
    numFN: intSchema.array().optional(),
    precision: intSchema.array().optional(),
    sensitivity: intSchema.array().optional(),
    fMeasure: intSchema.array().optional(),
  })

const molecularSequenceQualitySchema: ZodType<MolecularSequenceQuality> =
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
  })

const molecularSequenceRepositorySchema: ZodType<MolecularSequenceRepository> =
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
  })

const molecularSequenceStructureVariantInnerSchema: ZodType<MolecularSequenceStructureVariantInner> =
  backboneElementSchema.extend({
    start: intSchema.optional(),
    end: intSchema.optional(),
  })

const molecularSequenceStructureVariantOuterSchema: ZodType<MolecularSequenceStructureVariantOuter> =
  backboneElementSchema.extend({
    start: intSchema.optional(),
    end: intSchema.optional(),
  })

const molecularSequenceStructureVariantSchema: ZodType<MolecularSequenceStructureVariant> =
  backboneElementSchema.extend({
    variantType: codeableConceptSchema.optional(),
    exact: booleanSchema.optional(),
    _exact: elementSchema.optional(),
    length: intSchema.optional(),
    outer: molecularSequenceStructureVariantOuterSchema.optional(),
    inner: molecularSequenceStructureVariantInnerSchema.optional(),
  })

/**
 * Zod schema for FHIR MolecularSequence resource (untyped version).
 */
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

/**
 * Zod schema for FHIR MolecularSequence resource.
 */
export const molecularSequenceSchema: ZodType<MolecularSequence> =
  untypedMolecularSequenceSchema

/**
 * Wrapper class for FHIR MolecularSequence resources.
 * Provides utility methods for working with molecular sequences and genomic data.
 */
export class FhirMolecularSequence extends FhirDomainResource<MolecularSequence> {
  // Static Functions

  /**
   * Parses a MolecularSequence resource from unknown data.
   *
   * @param value - The data to parse and validate against the MolecularSequence schema
   * @returns A FhirMolecularSequence instance containing the validated resource
   */
  public static parse(value: unknown): FhirMolecularSequence {
    return new FhirMolecularSequence(molecularSequenceSchema.parse(value))
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
