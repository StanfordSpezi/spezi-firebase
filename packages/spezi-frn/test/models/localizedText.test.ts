//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//


import {
  LocalizedText,
  localizedTextConverter,
} from 'spezi-firebase-utils'

describe('LocalizedText Model', () => {
  describe('Construction', () => {
    test('should create a LocalizedText instance from a string', () => {
      const text = 'Hello World'
      const localizedText = new LocalizedText(text)

      expect(localizedText).toBeInstanceOf(LocalizedText)
      expect(localizedText.content).toBe(text)
    })

    test('should create a LocalizedText instance from a record', () => {
      const record = {
        en: 'Hello',
        de: 'Hallo',
        fr: 'Bonjour',
      }
      const localizedText = new LocalizedText(record)

      expect(localizedText).toBeInstanceOf(LocalizedText)
      expect(localizedText.content).toEqual(record)
    })
  })

  describe('Localize Method', () => {
    test('should return the same text for a string content', () => {
      const text = 'Hello World'
      const localizedText = new LocalizedText(text)

      expect(localizedText.localize('en')).toBe(text)
      expect(localizedText.localize('de')).toBe(text)
    })

    test('should return the correct language for a record content', () => {
      const record = {
        en: 'Hello',
        de: 'Hallo',
        fr: 'Bonjour',
      }
      const localizedText = new LocalizedText(record)

      expect(localizedText.localize('en')).toBe(record.en)
      expect(localizedText.localize('de')).toBe(record.de)
      expect(localizedText.localize('fr')).toBe(record.fr)
    })

    test('should fallback to language prefix if exact match not found', () => {
      const record = {
        en: 'Hello',
        de: 'Hallo',
        fr: 'Bonjour',
      }
      const localizedText = new LocalizedText(record)

      expect(localizedText.localize('en-US')).toBe(record.en)
      expect(localizedText.localize('de-DE')).toBe(record.de)
      expect(localizedText.localize('fr-FR')).toBe(record.fr)
    })

    test('should fallback to en-US if language not found', () => {
      const record = {
        en: 'Hello',
        fr: 'Bonjour',
      }
      const localizedText = new LocalizedText(record)

      expect(localizedText.localize('de')).toBe(record.en)
    })

    test('should fallback to first value if en-US not found', () => {
      const record = {
        fr: 'Bonjour',
        de: 'Hallo',
      }
      const localizedText = new LocalizedText(record)

      expect(localizedText.localize('es')).toBe(record.fr)
    })
  })

  describe('Converter', () => {
    test('should encode a LocalizedText properly', () => {
      const record = {
        en: 'Hello',
        de: 'Hallo',
      }
      const localizedText = new LocalizedText(record)

      const encoded = localizedTextConverter.encode(localizedText)

      expect(encoded).toEqual(record)
    })
  })
})
