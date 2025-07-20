//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { narrativeSchema } from './dataTypes/narrative.js'
import { extensionSchema } from './extension.js'
import { resourceSchema } from './resource.js'
import { allergyIntoleranceSchema } from '../resources/allergyIntolerance.js'
import { appointmentSchema } from '../resources/appointment.js'
import { medicationSchema } from '../resources/medication.js'
import { DomainResource, FhirResource } from 'fhir/r4b.js'
import { medicationRequestSchema } from '../resources/medicationRequest.js'
import { questionnaireSchema } from '../resources/questionnaire.js'
import { questionnaireResponseSchema } from '../resources/questionnaireResponse.js'

export const domainResourceSchema = resourceSchema.extend({
  text: narrativeSchema.optional(),
  get contained() {
    const resources = z.discriminatedUnion('resourceType', [
      allergyIntoleranceSchema,
      appointmentSchema,
      medicationSchema,
      medicationRequestSchema,
      questionnaireSchema,
      questionnaireResponseSchema,
    ]) as ZodType<FhirResource>
    return resources.array().optional()
  },
  get extension() {
    return extensionSchema.array().optional()
  },
  get modifierExtension() {
    return extensionSchema.array().optional()
  },
}) satisfies ZodType<DomainResource>
