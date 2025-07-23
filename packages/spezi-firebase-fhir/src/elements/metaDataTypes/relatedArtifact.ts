//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type RelatedArtifact } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { attachmentSchema } from '../dataTypes/attachment.js'
import { stringSchema, urlSchema } from '../dataTypes/primitiveTypes.js'
import { elementSchema } from '../element.js'

const relatedArtifactTypeSchema = z.enum([
  'documentation',
  'justification',
  'citation',
  'predecessor',
  'successor',
  'derived-from',
  'depends-on',
  'composed-of',
])
export type RelatedArtifactType = z.infer<typeof relatedArtifactTypeSchema>

export const relatedArtifactSchema: ZodType<RelatedArtifact> = z.lazy(() =>
  elementSchema.extend({
    type: relatedArtifactTypeSchema,
    _type: elementSchema.optional(),
    label: stringSchema.optional(),
    _label: elementSchema.optional(),
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
    citation: stringSchema.optional(),
    _citation: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    document: attachmentSchema.optional(),
    resource: stringSchema.optional(),
    _resource: elementSchema.optional(),
  }),
)
