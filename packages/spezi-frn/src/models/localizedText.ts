/**
 * Utility class for managing localized text with language preferences
 */

import { z } from 'zod'
import { SchemaConverter } from '../utils/schemaConverter.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const localizedTextConverter = new SchemaConverter<LocalizedText, any>({
  schema: z
    .string()
    .or(z.record(z.string()))
    .transform((content) => LocalizedText.raw(content)),
  encode: (object: LocalizedText) => LocalizedText.raw(object.content),
})

/**
 * Type-safe parameter extraction for localized text
 * This type extracts parameter types from a string template based on @N patterns
 */
export type LocalizedTextParams<S extends string, Acc extends unknown[] = []> =
  S extends `${string}@${infer N}${infer Rest}` ?
    N extends `${number}` ?
      LocalizedTextParams<Rest, [...Acc, string | number | LocalizedText]>
    : LocalizedTextParams<Rest, Acc>
  : Acc

// Type guard to check if value is LocalizedText
function isLocalizedText(value: unknown): value is LocalizedText {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const obj = value as Record<string, unknown>
  return 'localize' in obj && typeof obj.localize === 'function'
}

export class LocalizedText {
  // Properties
  readonly content: string | Record<string, string>

  // Constructor
  private constructor(input: string | Record<string, string>) {
    this.content = input
  }

  /**
   * Create a LocalizedText instance directly from a string or record
   */
  static raw(input: string | Record<string, string>): LocalizedText {
    return new LocalizedText(input)
  }

  /**
   * Create a LocalizedText with parameters
   * Uses TypeScript's type system to ensure the correct number and type of parameters
   * are provided based on the @N placeholders in the template
   */
  static create<L extends Record<string, string>>(
    input: L,
    ...params: LocalizedTextParams<L['en']>
  ): LocalizedText {
    const copy: Record<string, string> = {}

    for (const language of Object.keys(input)) {
      copy[language] = params.reduce(
        (previousValue, currentValue, index) => {
          let replacement = String(currentValue)

          // Check if the value is a LocalizedText and call localize
          if (isLocalizedText(currentValue)) {
            const localizedText = currentValue as LocalizedText
            replacement = String(localizedText.localize(language))
          }

          return previousValue.replace(`@${index}`, replacement)
        },
        String(input[language] || ''),
      )
    }

    return new LocalizedText(copy)
  }

  // Methods

  /**
   * Get a localized string based on provided language preferences
   * @param languages Priority-ordered list of preferred languages
   * @returns The localized string for the most preferred available language
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
