//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { backboneElementSchema } from '../backBoneElement.js'
import { codeableConceptSchema } from './dataTypes/codeableConcept.js'
import { periodSchema } from './dataTypes/period.js'
import { dateTimeSchema } from './dataTypes/primitiveTypes.js'
import { elementSchema } from './element.js'

export const marketingStatusSchema = z.lazy(() =>
  backboneElementSchema.extend({
    country: codeableConceptSchema.optional(),
    jurisdiction: codeableConceptSchema.optional(),
    status: codeableConceptSchema,
    dateRange: periodSchema.optional(),
    restoreDate: dateTimeSchema.optional(),
    _restoreDate: elementSchema.optional(),
  }),
)
