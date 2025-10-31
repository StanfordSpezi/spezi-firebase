//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

export const bindingStrengthSchema = z.enum([
  'required',
  'extensible',
  'preferred',
  'example',
])

export const operationDefinitionKindSchema = z.enum(['operation', 'query'])

export const operationDefinitionParameterUseSchema = z.enum(['in', 'out'])
