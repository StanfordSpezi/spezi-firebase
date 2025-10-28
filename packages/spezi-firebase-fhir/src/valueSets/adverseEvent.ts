//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Overall nature of the adverse event, e.g. real or potential.
 * http://hl7.org/fhir/valueset-adverse-event-actuality.html
 */
export const adverseEventActualitySchema = z.enum(['actual', 'potential'])

export type AdverseEventActuality = z.infer<typeof adverseEventActualitySchema>
