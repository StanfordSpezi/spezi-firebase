//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { SchemaConverter } from '../helpers/schemaConverter.js'

/**
 * Converter for LocalizedText objects
 */
export const localizedTextConverter = new SchemaConverter({
  schema: z
    .string()
    .or(z.record(z.string(), z.string()))
    .transform((content) => new LocalizedText(content)),
  encode: (object) => object.content,
})

/**
 * A class for handling multi-language text with fallbacks.
 */
export class LocalizedText {
  /**
   * The text content, either a single string or a record of language codes to strings
   */
  readonly content: string | Record<string, string>

  /**
   * Creates a new LocalizedText instance
   * @param input Either a string or a record of language codes to strings
   */
  constructor(input: string | Record<string, string>) {
    this.content = input
  }

  /**
   * Get the localized text for the given languages, with fallbacks.
   * @param languages Priority list of languages to try
   * @returns The localized text, or the first available translation if none match
   */
  localize(...languages: string[]): string {
    if (typeof this.content === 'string') return this.content

    for (const language of [...languages, 'en-US']) {
      const exactMatch = this.content[language]
      if (exactMatch) return exactMatch

      const languagePrefix = language.split(/-|_/).at(0)
      if (languagePrefix) {
        const prefixMatch = this.content[languagePrefix]
        if (prefixMatch) return prefixMatch
      }
    }

    return Object.values(this.content).at(0) ?? ''
  }
}
