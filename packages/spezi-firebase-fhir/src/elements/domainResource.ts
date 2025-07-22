//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DomainResource } from 'fhir/r4b.js'
import { type ZodType } from 'zod/v4'
import { narrativeSchema } from './dataTypes/narrative.js'
import { extensionSchema } from './extension.js'
import { resourceSchema } from './resource.js'
import { fhirResourceSchema } from '../resources/fhirResource.js'

export const domainResourceSchema = resourceSchema.extend({
  text: narrativeSchema.optional(),
  get contained() {
    return fhirResourceSchema.array().optional()
  },
  extension: extensionSchema.array().optional(),
  modifierExtension: extensionSchema.array().optional(),
}) satisfies ZodType<DomainResource>
