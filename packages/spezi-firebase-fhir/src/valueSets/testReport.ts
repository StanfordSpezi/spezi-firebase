//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

export const testReportActionResultSchema = z.enum([
  'pass',
  'skip',
  'fail',
  'warning',
  'error',
])

export const testReportParticipantTypeSchema = z.enum([
  'test-engine',
  'client',
  'server',
])

export const testReportResultSchema = z.enum(['pass', 'fail', 'pending'])

export const testReportStatusSchema = z.enum([
  'completed',
  'in-progress',
  'waiting',
  'stopped',
  'entered-in-error',
])
