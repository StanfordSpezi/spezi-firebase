//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

// Using Jest assertions
import {
  LocalizedText,
  localizedTextConverter,
} from '../../src/types/localizedText.js'

describe('LocalizedText', () => {
  describe('constructor', () => {
    it('should create an instance with a string', () => {
      const text = new LocalizedText('hello')
      expect(text).toBeInstanceOf(LocalizedText)
      expect(text.content).toBe('hello')
    })

    it('should create an instance with a record of translations', () => {
      const translations = {
        en: 'hello',
        es: 'hola',
        fr: 'bonjour',
      }
      const text = new LocalizedText(translations)
      expect(text).toBeInstanceOf(LocalizedText)
      expect(text.content).toEqual(translations)
    })
  })

  describe('localize', () => {
    it('should return the string content if content is a string', () => {
      const text = new LocalizedText('hello')
      expect(text.localize('fr')).toBe('hello')
      expect(text.localize('en')).toBe('hello')
    })

    it('should return the exact language match if available', () => {
      const text = new LocalizedText({
        en: 'hello',
        es: 'hola',
        fr: 'bonjour',
      })
      expect(text.localize('es')).toBe('hola')
      expect(text.localize('fr')).toBe('bonjour')
    })

    it('should use language fallbacks if specified', () => {
      const text = new LocalizedText({
        en: 'hello',
        es: 'hola',
      })
      expect(text.localize('fr', 'es')).toBe('hola')
      expect(text.localize('de', 'fr', 'en')).toBe('hello')
    })

    it('should match language prefixes', () => {
      const text = new LocalizedText({
        en: 'hello',
        es: 'hola',
      })
      expect(text.localize('en-US')).toBe('hello')
      expect(text.localize('es-ES')).toBe('hola')
    })

    it('should fallback to en-US if available', () => {
      const text = new LocalizedText({
        'en-US': 'hello',
        es: 'hola',
      })
      expect(text.localize('fr')).toBe('hello')
    })

    it('should fallback to en if available', () => {
      const text = new LocalizedText({
        en: 'hello',
        es: 'hola',
      })
      expect(text.localize('fr')).toBe('hello')
    })

    it('should return the first translation if no matches', () => {
      const text = new LocalizedText({
        es: 'hola',
        fr: 'bonjour',
      })
      expect(text.localize('de')).toBe('hola')
    })

    it('should return empty string if no translations available', () => {
      const text = new LocalizedText({})
      expect(text.localize('en')).toBe('')
    })
  })

  describe('localizedTextConverter', () => {
    it('should convert string to LocalizedText', () => {
      const result = localizedTextConverter.schema.parse('hello')
      expect(result).toBeInstanceOf(LocalizedText)
      expect(result.content).toBe('hello')
    })

    it('should convert object to LocalizedText', () => {
      const translations = {
        en: 'hello',
        es: 'hola',
      }
      const result = localizedTextConverter.schema.parse(translations)
      expect(result).toBeInstanceOf(LocalizedText)
      expect(result.content).toEqual(translations)
    })

    it('should encode LocalizedText to original content', () => {
      const translations = {
        en: 'hello',
        es: 'hola',
      }
      const text = new LocalizedText(translations)
      const encoded = localizedTextConverter.encode(text)
      expect(encoded).toEqual(translations)
    })

    it('should handle roundtrip conversion', () => {
      const translations = {
        en: 'hello',
        es: 'hola',
      }
      const parsed = localizedTextConverter.schema.parse(translations)
      const encoded = localizedTextConverter.encode(parsed)
      expect(encoded).toEqual(translations)
    })

    // TODO: Add more tests for granular localization keys
    // - Test region-specific language codes (e.g., en-US, en-GB, pt-BR, zh-CN)
    // - Test handling of non-standard codes and case sensitivity
    // - Test multi-level fallbacks (e.g., zh-HK → zh-TW → zh-CN → zh)
    // - Test script variants (e.g., sr-Latn vs sr-Cyrl)
  })
})
