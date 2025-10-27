//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of a location.
 * http://hl7.org/fhir/valueset-location-status.html
 */
export const locationStatusSchema = z.enum(['active', 'suspended', 'inactive'])

export type LocationStatus = z.infer<typeof locationStatusSchema>

/**
 * Indicates whether a resource instance represents a specific location or a class of locations.
 * http://hl7.org/fhir/valueset-location-mode.html
 */
export const locationModeSchema = z.enum(['instance', 'kind'])

export type LocationMode = z.infer<typeof locationModeSchema>
