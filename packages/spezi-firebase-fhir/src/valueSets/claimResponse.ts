//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR NoteType value set.
 * The type of note.
 */
export const noteTypeSchema = z.enum(['display', 'print', 'printoper'])
