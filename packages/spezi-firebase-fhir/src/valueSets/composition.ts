//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The mode of a composition.
 * http://hl7.org/fhir/valueset-composition-attestation-mode.html
 */
export const compositionAttestationModeSchema = z.enum([
  'personal',
  'professional',
  'legal',
  'official',
])

/**
 * The mode of a composition.
 * http://hl7.org/fhir/valueset-composition-attestation-mode.html
 */
export type CompositionAttestationMode = z.infer<
  typeof compositionAttestationModeSchema
>

/**
 * The way in which this related composition is related.
 * http://hl7.org/fhir/valueset-document-relationship-type.html
 */
export const compositionRelatestoCodeSchema = z.enum([
  'replaces',
  'transforms',
  'signs',
  'appends',
])

/**
 * The way in which this related composition is related.
 * http://hl7.org/fhir/valueset-document-relationship-type.html
 */
export type CompositionRelatesToCode = z.infer<
  typeof compositionRelatestoCodeSchema
>

/**
 * The workflow/clinical status of the composition.
 * http://hl7.org/fhir/valueset-composition-status.html
 */
export const compositionStatusSchema = z.enum([
  'preliminary',
  'final',
  'amended',
  'entered-in-error',
])

/**
 * The workflow/clinical status of the composition.
 * http://hl7.org/fhir/valueset-composition-status.html
 */
export type CompositionStatus = z.infer<typeof compositionStatusSchema>
