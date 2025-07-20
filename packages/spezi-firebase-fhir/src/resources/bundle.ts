//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Bundle, type DomainResource } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { fhirResourceSchema } from './fhirResource.js'
import {
  backboneElementSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  signatureSchema,
  unsignedIntSchema,
  uriSchema,
} from '../elements/index.js'
import { resourceSchema } from '../elements/resource.js'

const bundleLinkSchema = backboneElementSchema.extend({
  relation: z.string(),
  _relation: elementSchema.optional(),
  url: uriSchema,
  _url: elementSchema.optional(),
})

export function bundleSchema<R extends DomainResource>(
  schema: ZodType<R>,
): ZodType<Bundle<R>> {
  return resourceSchema.extend({
    resourceType: z.literal('Bundle').readonly(),
    identifier: identifierSchema.optional(),
    type: z.enum([
      'document',
      'message',
      'transaction',
      'transaction-response',
      'batch',
      'batch-response',
      'history',
      'searchset',
      'collection',
    ]),
    _type: elementSchema.optional(),
    timestamp: instantSchema.optional(),
    _timestamp: elementSchema.optional(),
    total: unsignedIntSchema.optional(),
    link: bundleLinkSchema.array().optional(),
    entry: backboneElementSchema
      .extend({
        link: bundleLinkSchema.array().optional(),
        fullUrl: uriSchema.optional(),
        _fullUrl: elementSchema.optional(),
        resource: schema.optional(),
        search: backboneElementSchema.extend({
          mode: z.enum(['match', 'include', 'outcome']).optional(),
          _mode: elementSchema.optional(),
          score: z.number().optional(),
        }),
        request: backboneElementSchema.extend({
          method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
          _method: elementSchema.optional(),
          url: uriSchema,
          _url: elementSchema.optional(),
          ifNoneExist: z.string().optional(),
          _ifNoneExist: elementSchema.optional(),
          ifModifiedSince: instantSchema.optional(),
          _ifModifiedSince: elementSchema.optional(),
          ifMatch: z.string().optional(),
          _ifMatch: elementSchema.optional(),
          ifNoneMatch: z.string().optional(),
          _ifNoneMatch: elementSchema.optional(),
        }),
        response: backboneElementSchema.extend({
          status: z.string(),
          _status: elementSchema.optional(),
          location: uriSchema.optional(),
          _location: elementSchema.optional(),
          etag: z.string().optional(),
          _etag: elementSchema.optional(),
          lastModified: instantSchema.optional(),
          _lastModified: elementSchema.optional(),
          outcome: fhirResourceSchema.optional(),
        }),
      })
      .array()
      .optional(),
    signature: signatureSchema.optional(),
  }) satisfies ZodType<Bundle<R>>
}

export const genericBundleSchema = bundleSchema(fhirResourceSchema)
