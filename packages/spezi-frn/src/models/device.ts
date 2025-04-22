/**
 * Device model for managing notification registrations
 */

import { z } from 'zod';
import { optionalish } from '../utils/optionalish.js';
import { SchemaConverter } from '../utils/schemaConverter.js';

export enum DevicePlatform {
  Android = 'Android',
  iOS = 'iOS',
  Web = 'Web',
}

export const deviceConverter = new SchemaConverter({
  schema: z
    .object({
      notificationToken: z.string(),
      platform: z.nativeEnum(DevicePlatform),
      osVersion: optionalish(z.string()),
      appVersion: optionalish(z.string()),
      appBuild: optionalish(z.string()),
      language: optionalish(z.string()),
      timeZone: optionalish(z.string()),
    })
    .transform((values) => new Device(values)),
  encode: (object) => ({
    notificationToken: object.notificationToken,
    platform: object.platform,
    osVersion: object.osVersion ?? null,
    appVersion: object.appVersion ?? null,
    appBuild: object.appBuild ?? null,
    language: object.language ?? null,
    timeZone: object.timeZone ?? null,
  }),
});

export class Device {
  // Properties
  readonly notificationToken: string;
  readonly platform: DevicePlatform;
  readonly osVersion?: string;
  readonly appVersion?: string;
  readonly appBuild?: string;
  readonly language?: string;
  readonly timeZone?: string;

  // Constructor
  constructor(input: {
    notificationToken: string;
    platform: DevicePlatform;
    osVersion?: string;
    appVersion?: string;
    appBuild?: string;
    language?: string;
    timeZone?: string;
  }) {
    this.notificationToken = input.notificationToken;
    this.platform = input.platform;
    this.osVersion = input.osVersion;
    this.appVersion = input.appVersion;
    this.appBuild = input.appBuild;
    this.language = input.language;
    this.timeZone = input.timeZone;
  }
}