//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { codeSchema, urlSchema } from '../primitiveTypes/primitiveTypes.js'
import { attachmentSchema } from '../dataTypes/attachment.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { RelatedArtifact } from 'fhir/r4b.js'

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
    label: z.string().optional(),
    display: z.string().optional(),
    citation: z.string().optional(),
    url: urlSchema.optional(),
    document: attachmentSchema.optional(),
    resource: z.string().optional(),
  }),
)

type _Assert = AssertOutput<typeof relatedArtifactSchema, RelatedArtifact>
type _AssertFull = AssertOutputFull<
  typeof relatedArtifactSchema,
  RelatedArtifact
>
