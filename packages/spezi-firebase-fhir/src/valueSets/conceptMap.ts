//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The degree of equivalence between concepts.
 * http://hl7.org/fhir/valueset-concept-map-equivalence.html
 */
export const conceptMapEquivalenceSchema = z.enum([
  'relatedto',
  'equivalent',
  'equal',
  'wider',
  'subsumes',
  'narrower',
  'specializes',
  'inexact',
  'unmatched',
  'disjoint',
])

export type ConceptMapEquivalence = z.infer<typeof conceptMapEquivalenceSchema>

/**
 * Defines which action to take if there is no match in the group.
 * http://hl7.org/fhir/valueset-conceptmap-unmapped-mode.html
 */
export const conceptMapUnmappedModeSchema = z.enum([
  'provided',
  'fixed',
  'other-map',
])

export type ConceptMapUnmappedMode = z.infer<
  typeof conceptMapUnmappedModeSchema
>
