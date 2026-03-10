// This source file is part of the Spezi Firebase project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
// SPDX-License-Identifier: MIT

import { logger } from 'firebase-functions/v2'
import {
  onCall,
  type CallableRequest,
  HttpsError,
  type CallableOptions,
} from 'firebase-functions/v2/https'
import { z, type ZodType } from 'zod/v4'

/**
 *
 * @param schema
 * @param handler
 * @param options
 */
export /**
        *
        */
const validatedOnCall = <Schema extends ZodType, Return>(
  schema: Schema,
  handler: (request: CallableRequest<z.output<Schema>>) => Promise<Return>,
  options: CallableOptions = {},
) =>
  onCall(
    {
      cors: true,
      ...options,
    },
    async (request) => {
      try {
        /**
         *
         */
        const validatedData = schema.parse(request.data)
        /**
         *
         */
        const validatedRequest: CallableRequest<z.output<Schema>> = {
          ...request,
          data: validatedData,
        }
        return await handler(validatedRequest)
      } catch (error) {
        logger.error('Function error:', error)
        if (error instanceof z.ZodError) {
          throw new HttpsError(
            'invalid-argument',
            'Invalid request data',
            error.issues,
          )
        }
        throw error
      }
    },
  )
