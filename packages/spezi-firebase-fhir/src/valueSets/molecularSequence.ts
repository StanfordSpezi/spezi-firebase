//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Type of a sequence -- DNA, RNA, or amino acid sequence.
 * http://hl7.org/fhir/valueset-sequence-type.html
 */
export const molecularSequenceTypeSchema = z.enum(['aa', 'dna', 'rna'])

/**
 * Type if a sequence -- DNA, RNA, or amino acid sequence.
 * http://hl7.org/fhir/valueset-sequence-type.html
 */
export type MolecularSequenceType = z.infer<typeof molecularSequenceTypeSchema>

/**
 * Directionality of DNA ( +1/-1) relative to some reference.
 * http://hl7.org/fhir/valueset-orientation-type.html
 */
export const orientationTypeSchema = z.enum(['sense', 'antisense'])

/**
 * Directionality of DNA ( +1/-1) relative to some reference.
 * http://hl7.org/fhir/valueset-orientation-type.html
 */
export type OrientationType = z.infer<typeof orientationTypeSchema>

/**
 * Strand of DNA sequence.
 * http://hl7.org/fhir/valueset-strand-type.html
 */
export const strandTypeSchema = z.enum(['watson', 'crick'])

/**
 * Strand of DNA sequence.
 * http://hl7.org/fhir/valueset-strand-type.html
 */
export type StrandType = z.infer<typeof strandTypeSchema>

/**
 * Type for quality report.
 * http://hl7.org/fhir/valueset-quality-type.html
 */
export const qualityTypeSchema = z.enum(['indel', 'snp', 'unknown'])

/**
 * Type for quality report.
 * http://hl7.org/fhir/valueset-quality-type.html
 */
export type QualityType = z.infer<typeof qualityTypeSchema>

/**
 * Type for access of external URI.
 * http://hl7.org/fhir/valueset-repository-type.html
 */
export const repositoryTypeSchema = z.enum([
  'directlink',
  'openapi',
  'login',
  'oauth',
])

/**
 * Type for access of external URI.
 * http://hl7.org/fhir/valueset-repository-type.html
 */
export type RepositoryType = z.infer<typeof repositoryTypeSchema>
