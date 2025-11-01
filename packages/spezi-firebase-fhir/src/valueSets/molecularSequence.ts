//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Type if a sequence -- DNA, RNA, or amino acid sequence.
 * http://hl7.org/fhir/valueset-sequence-type.html
 */
export const molecularSequenceTypeSchema = z.enum(['aa', 'dna', 'rna'])

/**
 * Directionality of DNA ( +1/-1) relative to some reference.
 * http://hl7.org/fhir/valueset-orientation-type.html
 */
export const orientationTypeSchema = z.enum(['sense', 'antisense'])

/**
 * Strand of DNA sequence.
 * http://hl7.org/fhir/valueset-strand-type.html
 */
export const strandTypeSchema = z.enum(['watson', 'crick'])

/**
 * Type for quality report.
 * http://hl7.org/fhir/valueset-quality-type.html
 */
export const qualityTypeSchema = z.enum(['indel', 'snp', 'unknown'])

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

export type MolecularSequenceType = z.infer<typeof molecularSequenceTypeSchema>
export type OrientationType = z.infer<typeof orientationTypeSchema>
export type StrandType = z.infer<typeof strandTypeSchema>
export type QualityType = z.infer<typeof qualityTypeSchema>
export type RepositoryType = z.infer<typeof repositoryTypeSchema>
