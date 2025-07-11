//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { AssertOutput } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from './element.js'
import { extensionSchema } from './extension.js'
import { BackboneElement } from 'fhir/r4b.js'

export const backboneElementSchema = elementSchema.extend({
  modifierExtension: extensionSchema.array().optional(),
})

type _Assert = AssertOutput<typeof backboneElementSchema, BackboneElement>
