//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the document reference.
 * http://hl7.org/fhir/valueset-document-reference-status.html
 */
export const documentReferenceStatusSchema = z.enum([
  'current',
  'superseded',
  'entered-in-error',
])

/**
 * The status of the document reference.
 * http://hl7.org/fhir/valueset-document-reference-status.html
 */
export type DocumentReferenceStatus = z.infer<
  typeof documentReferenceStatusSchema
>

/**
 * The status of the underlying document.
 * http://hl7.org/fhir/valueset-composition-status.html
 */
export const documentReferenceDocStatusSchema = z.enum([
  'preliminary',
  'final',
  'amended',
  'entered-in-error',
])

/**
 * The status of the underlying document.
 * http://hl7.org/fhir/valueset-composition-status.html
 */
export type DocumentReferenceDocStatus = z.infer<
  typeof documentReferenceDocStatusSchema
>

/**
 * The type of relationship between documents.
 * http://hl7.org/fhir/valueset-document-relationship-type.html
 */
export const documentReferenceRelatesToCodeSchema = z.enum([
  'replaces',
  'transforms',
  'signs',
  'appends',
])

/**
 * The type of relationship between documents.
 * http://hl7.org/fhir/valueset-document-relationship-type.html
 */
export type DocumentReferenceRelatesToCode = z.infer<
  typeof documentReferenceRelatesToCodeSchema
>
