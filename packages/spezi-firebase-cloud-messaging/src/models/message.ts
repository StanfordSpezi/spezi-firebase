//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Message model for notification content
 */

import {
  LocalizedText,
  localizedTextConverter,
} from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod'
import { dateConverter } from '../utils/dateConverter.js'
import { optionalish } from '../utils/optionalish.js'
import { SchemaConverter } from '../utils/schemaConverter.js'

export enum MessageType {
  Information = 'Information',
  Alert = 'Alert',
  Reminder = 'Reminder',
  Action = 'Action',
  System = 'System',
}

export const messageConverter = new SchemaConverter<Message, z.ZodType>({
  schema: z
    .object({
      creationDate: dateConverter.schema,
      dueDate: optionalish(dateConverter.schema),
      completionDate: optionalish(dateConverter.schema),
      type: z.nativeEnum(MessageType),
      title: z.lazy(() => localizedTextConverter.schema as z.ZodType),
      description: optionalish(
        z.lazy(() => localizedTextConverter.schema as z.ZodType),
      ),
      action: optionalish(z.string()),
      isDismissible: z.boolean(),
      reference: optionalish(z.string()),
      data: optionalish(z.record(z.string())),
    })
    .transform((content) => {
      // Create a properly typed instance with correct transformation
      return new Message({
        ...content,
        title: content.title as LocalizedText,
        description: content.description as LocalizedText | undefined,
      })
    }),
  encode: (object: Message) => {
    // Create an intermediate object to avoid TypeScript errors with date conversion
    return {
      creationDate: dateConverter.encode(object.creationDate),
      dueDate:
        object.dueDate ? dateConverter.encode(object.dueDate) : undefined,
      completionDate:
        object.completionDate ?
          dateConverter.encode(object.completionDate)
        : undefined,
      type: object.type,
      title: localizedTextConverter.encode(object.title),
      description:
        object.description ?
          localizedTextConverter.encode(object.description)
        : undefined,
      action: object.action ?? null,
      isDismissible: object.isDismissible,
      reference: object.reference ?? null,
      data: object.data ?? null,
    }
  },
})

export class Message {
  // Properties
  readonly creationDate: Date
  readonly dueDate?: Date
  readonly completionDate?: Date
  readonly type: MessageType
  readonly title: LocalizedText
  readonly description?: LocalizedText
  readonly action?: string
  readonly isDismissible: boolean
  readonly reference?: string
  readonly data?: Record<string, string>

  // Constructor
  constructor(input: {
    creationDate: Date
    dueDate?: Date
    completionDate?: Date
    type: MessageType
    title: LocalizedText
    description?: LocalizedText
    action?: string
    isDismissible: boolean
    reference?: string
    data?: Record<string, string>
  }) {
    this.creationDate = input.creationDate
    this.dueDate = input.dueDate
    this.completionDate = input.completionDate
    this.type = input.type
    this.title = input.title
    this.description = input.description
    this.action = input.action
    this.isDismissible = input.isDismissible
    this.reference = input.reference
    this.data = input.data
  }

  // Factory methods for common message types
  static createInformation(input: {
    title: Record<string, string> | string
    description?: Record<string, string> | string
    action?: string
    isDismissible?: boolean
    reference?: string
    data?: Record<string, string>
    creationDate?: Date
  }): Message {
    return new Message({
      creationDate: input.creationDate ?? new Date(),
      title:
        typeof input.title === 'string' ?
          new LocalizedText(input.title)
        : new LocalizedText(input.title),
      description:
        input.description ?
          typeof input.description === 'string' ?
            new LocalizedText(input.description)
          : new LocalizedText(input.description)
        : undefined,
      action: input.action,
      type: MessageType.Information,
      isDismissible: input.isDismissible ?? true,
      reference: input.reference,
      data: input.data,
    })
  }

  static createAlert(input: {
    title: Record<string, string> | string
    description?: Record<string, string> | string
    action?: string
    isDismissible?: boolean
    reference?: string
    data?: Record<string, string>
    creationDate?: Date
  }): Message {
    return new Message({
      creationDate: input.creationDate ?? new Date(),
      title:
        typeof input.title === 'string' ?
          new LocalizedText(input.title)
        : new LocalizedText(input.title),
      description:
        input.description ?
          typeof input.description === 'string' ?
            new LocalizedText(input.description)
          : new LocalizedText(input.description)
        : undefined,
      action: input.action,
      type: MessageType.Alert,
      isDismissible: input.isDismissible ?? true,
      reference: input.reference,
      data: input.data,
    })
  }

  static createReminder(input: {
    title: Record<string, string> | string
    description?: Record<string, string> | string
    action?: string
    dueDate?: Date
    isDismissible?: boolean
    reference?: string
    data?: Record<string, string>
    creationDate?: Date
  }): Message {
    return new Message({
      creationDate: input.creationDate ?? new Date(),
      dueDate: input.dueDate,
      title:
        typeof input.title === 'string' ?
          new LocalizedText(input.title)
        : new LocalizedText(input.title),
      description:
        input.description ?
          typeof input.description === 'string' ?
            new LocalizedText(input.description)
          : new LocalizedText(input.description)
        : undefined,
      action: input.action,
      type: MessageType.Reminder,
      isDismissible: input.isDismissible ?? false,
      reference: input.reference,
      data: input.data,
    })
  }

  static createAction(input: {
    title: Record<string, string> | string
    description?: Record<string, string> | string
    action: string
    isDismissible?: boolean
    reference?: string
    data?: Record<string, string>
    creationDate?: Date
  }): Message {
    return new Message({
      creationDate: input.creationDate ?? new Date(),
      title:
        typeof input.title === 'string' ?
          new LocalizedText(input.title)
        : new LocalizedText(input.title),
      description:
        input.description ?
          typeof input.description === 'string' ?
            new LocalizedText(input.description)
          : new LocalizedText(input.description)
        : undefined,
      action: input.action,
      type: MessageType.Action,
      isDismissible: input.isDismissible ?? false,
      reference: input.reference,
      data: input.data,
    })
  }
}
