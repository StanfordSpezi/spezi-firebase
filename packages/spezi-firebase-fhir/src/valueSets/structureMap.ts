//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

export const structureMapModelModeSchema = z.enum([
  'source',
  'queried',
  'target',
  'produced',
])

export const structureMapGroupInputModeSchema = z.enum(['source', 'target'])

export const structureMapGroupTypeModeSchema = z.enum([
  'none',
  'types',
  'type-and-types',
])

export const structureMapSourceListModeSchema = z.enum([
  'first',
  'not_first',
  'last',
  'not_last',
  'only_one',
])

export const structureMapTargetContextTypeSchema = z.enum(['type', 'variable'])

export const structureMapTargetListModeSchema = z.enum([
  'first',
  'share',
  'last',
  'collate',
])

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
