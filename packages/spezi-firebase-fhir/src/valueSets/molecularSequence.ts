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

export type MolecularSequenceType = z.infer<typeof molecularSequenceTypeSchema>
