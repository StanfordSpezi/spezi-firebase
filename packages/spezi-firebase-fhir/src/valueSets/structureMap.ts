//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR StructureMapModelMode value set.
 * How the referenced structure is used in the mapping.
 */
export const structureMapModelModeSchema = z.enum([
  'source',
  'queried',
  'target',
  'produced',
])

/**
 * TypeScript type for FHIR StructureMapModelMode value set.
 */
export type StructureMapModelMode = z.infer<typeof structureMapModelModeSchema>

/**
 * Zod schema for FHIR StructureMapGroupInputMode value set.
 * Mode for input in a structure map group.
 */
export const structureMapGroupInputModeSchema = z.enum(['source', 'target'])

/**
 * TypeScript type for FHIR StructureMapGroupInputMode value set.
 */
export type StructureMapGroupInputMode = z.infer<
  typeof structureMapGroupInputModeSchema
>

/**
 * Zod schema for FHIR StructureMapGroupTypeMode value set.
 * Type handling in structure map groups.
 */
export const structureMapGroupTypeModeSchema = z.enum([
  'none',
  'types',
  'type-and-types',
])

/**
 * TypeScript type for FHIR StructureMapGroupTypeMode value set.
 */
export type StructureMapGroupTypeMode = z.infer<
  typeof structureMapGroupTypeModeSchema
>

/**
 * Zod schema for FHIR StructureMapSourceListMode value set.
 * If the source list has multiple items, how to handle them in the mapping.
 */
export const structureMapSourceListModeSchema = z.enum([
  'first',
  'not_first',
  'last',
  'not_last',
  'only_one',
])

/**
 * TypeScript type for FHIR StructureMapSourceListMode value set.
 */
export type StructureMapSourceListMode = z.infer<
  typeof structureMapSourceListModeSchema
>

/**
 * Zod schema for FHIR StructureMapTargetContextType value set.
 * How to interpret the context for a target element.
 */
export const structureMapTargetContextTypeSchema = z.enum(['type', 'variable'])

/**
 * TypeScript type for FHIR StructureMapTargetContextType value set.
 */
export type StructureMapTargetContextType = z.infer<
  typeof structureMapTargetContextTypeSchema
>

/**
 * Zod schema for FHIR StructureMapTargetListMode value set.
 * If the target list has multiple items, how to handle them in the mapping.
 */
export const structureMapTargetListModeSchema = z.enum([
  'first',
  'share',
  'last',
  'collate',
])

/**
 * TypeScript type for FHIR StructureMapTargetListMode value set.
 */
export type StructureMapTargetListMode = z.infer<
  typeof structureMapTargetListModeSchema
>

/**
 * Zod schema for FHIR StructureMapTransform value set.
 * How data is transformed in a structure map.
 */
export const structureMapTransformSchema = z.enum([
  'create',
  'copy',
  'truncate',
  'escape',
  'cast',
  'append',
  'translate',
  'reference',
  'dateOp',
  'uuid',
  'pointer',
  'evaluate',
  'cc',
  'c',
  'qty',
  'id',
  'cp',
])

/**
 * TypeScript type for FHIR StructureMapTransform value set.
 */
export type StructureMapTransform = z.infer<typeof structureMapTransformSchema>
