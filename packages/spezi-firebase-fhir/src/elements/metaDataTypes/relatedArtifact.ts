//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type RelatedArtifact } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { attachmentSchema } from '../dataTypes/attachment.js'
import { elementSchema } from '../element.js'
import { urlSchema } from '../primitiveTypes/primitiveTypes.js'

const relatedArtifactType = [
  'documentation',
  'justification',
  'citation',
  'predecessor',
  'successor',
  'derived-from',
  'depends-on',
  'composed-of',
] as const

export const relatedArtifactSchema: ZodType<RelatedArtifact> = z.lazy(() =>
  elementSchema.extend({
    type: z.enum(relatedArtifactType),
    _type: elementSchema.optional(),
    label: z.string().optional(),
    _label: elementSchema.optional(),
    display: z.string().optional(),
    _display: elementSchema.optional(),
    citation: z.string().optional(),
    _citation: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    document: attachmentSchema.optional(),
    resource: z.string().optional(),
    _resource: elementSchema.optional(),
  }),
)
