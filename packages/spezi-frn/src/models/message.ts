/**
 * Message model for notification content
 */

import { z } from 'zod';
import { LocalizedText, localizedTextConverter } from './localizedText.js';
import { optionalish } from '../utils/optionalish.js';
import { SchemaConverter } from '../utils/schemaConverter.js';
import { dateConverter } from '../utils/dateConverter.js';

export enum MessageType {
  Information = 'Information',
  Alert = 'Alert',
  Reminder = 'Reminder',
  Action = 'Action',
  System = 'System',
}

export const messageConverter = new SchemaConverter({
  schema: z
    .object({
      creationDate: dateConverter.schema,
      dueDate: optionalish(dateConverter.schema),
      completionDate: optionalish(dateConverter.schema),
      type: z.nativeEnum(MessageType),
      title: z.lazy(() => localizedTextConverter.schema),
      description: optionalish(z.lazy(() => localizedTextConverter.schema)),
      action: optionalish(z.string()),
      isDismissible: z.boolean(),
      reference: optionalish(z.string()),
      data: optionalish(z.record(z.string())),
    })
    .transform((content) => new Message(content)),
  encode: (object) => ({
    creationDate: dateConverter.encode(object.creationDate),
    dueDate: object.dueDate ? dateConverter.encode(object.dueDate) : null,
    completionDate: object.completionDate ? dateConverter.encode(object.completionDate) : null,
    type: object.type,
    title: localizedTextConverter.encode(object.title),
    description: object.description ? localizedTextConverter.encode(object.description) : null,
    action: object.action ?? null,
    isDismissible: object.isDismissible,
    reference: object.reference ?? null,
    data: object.data ?? null,
  }),
});

export class Message {
  // Properties
  readonly creationDate: Date;
  readonly dueDate?: Date;
  readonly completionDate?: Date;
  readonly type: MessageType;
  readonly title: LocalizedText;
  readonly description?: LocalizedText;
  readonly action?: string;
  readonly isDismissible: boolean;
  readonly reference?: string;
  readonly data?: Record<string, string>;

  // Constructor
  constructor(input: {
    creationDate: Date;
    dueDate?: Date;
    completionDate?: Date;
    type: MessageType;
    title: LocalizedText;
    description?: LocalizedText;
    action?: string;
    isDismissible: boolean;
    reference?: string;
    data?: Record<string, string>;
  }) {
    this.creationDate = input.creationDate;
    this.dueDate = input.dueDate;
    this.completionDate = input.completionDate;
    this.type = input.type;
    this.title = input.title;
    this.description = input.description;
    this.action = input.action;
    this.isDismissible = input.isDismissible;
    this.reference = input.reference;
    this.data = input.data;
  }

  // Factory methods for common message types
  static createInformation(input: {
    title: Record<string, string> | string;
    description?: Record<string, string> | string;
    action?: string;
    isDismissible?: boolean;
    reference?: string;
    data?: Record<string, string>;
    creationDate?: Date;
  }): Message {
    return new Message({
      creationDate: input.creationDate ?? new Date(),
      title: typeof input.title === 'string' ? LocalizedText.raw(input.title) : LocalizedText.raw(input.title),
      description: input.description ? 
        (typeof input.description === 'string' ? LocalizedText.raw(input.description) : LocalizedText.raw(input.description)) 
        : undefined,
      action: input.action,
      type: MessageType.Information,
      isDismissible: input.isDismissible ?? true,
      reference: input.reference,
      data: input.data,
    });
  }

  static createAlert(input: {
    title: Record<string, string> | string;
    description?: Record<string, string> | string;
    action?: string;
    isDismissible?: boolean;
    reference?: string;
    data?: Record<string, string>;
    creationDate?: Date;
  }): Message {
    return new Message({
      creationDate: input.creationDate ?? new Date(),
      title: typeof input.title === 'string' ? LocalizedText.raw(input.title) : LocalizedText.raw(input.title),
      description: input.description ? 
        (typeof input.description === 'string' ? LocalizedText.raw(input.description) : LocalizedText.raw(input.description)) 
        : undefined,
      action: input.action,
      type: MessageType.Alert,
      isDismissible: input.isDismissible ?? true,
      reference: input.reference,
      data: input.data,
    });
  }

  static createReminder(input: {
    title: Record<string, string> | string;
    description?: Record<string, string> | string;
    action?: string;
    dueDate?: Date;
    isDismissible?: boolean;
    reference?: string;
    data?: Record<string, string>;
    creationDate?: Date;
  }): Message {
    return new Message({
      creationDate: input.creationDate ?? new Date(),
      dueDate: input.dueDate,
      title: typeof input.title === 'string' ? LocalizedText.raw(input.title) : LocalizedText.raw(input.title),
      description: input.description ? 
        (typeof input.description === 'string' ? LocalizedText.raw(input.description) : LocalizedText.raw(input.description)) 
        : undefined,
      action: input.action,
      type: MessageType.Reminder,
      isDismissible: input.isDismissible ?? false,
      reference: input.reference,
      data: input.data,
    });
  }

  static createAction(input: {
    title: Record<string, string> | string;
    description?: Record<string, string> | string;
    action: string;
    isDismissible?: boolean;
    reference?: string;
    data?: Record<string, string>;
    creationDate?: Date;
  }): Message {
    return new Message({
      creationDate: input.creationDate ?? new Date(),
      title: typeof input.title === 'string' ? LocalizedText.raw(input.title) : LocalizedText.raw(input.title),
      description: input.description ? 
        (typeof input.description === 'string' ? LocalizedText.raw(input.description) : LocalizedText.raw(input.description)) 
        : undefined,
      action: input.action,
      type: MessageType.Action,
      isDismissible: input.isDismissible ?? false,
      reference: input.reference,
      data: input.data,
    });
  }
}