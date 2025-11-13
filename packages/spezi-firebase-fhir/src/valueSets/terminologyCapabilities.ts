//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { capabilityStatementKindSchema } from './capabilityStatement.js'

/**
 * The type of search supported.
 * http://hl7.org/fhir/valueset-code-search-support.html
 */
export const codeSearchSupportSchema = z.enum(['explicit', 'all'])

/**
 * The type of search supported.
 * http://hl7.org/fhir/valueset-code-search-support.html
 */
export type CodeSearchSupport = z.infer<typeof codeSearchSupportSchema>

// Re-export from capabilityStatement.ts for backwards compatibility
export { capabilityStatementKindSchema }
