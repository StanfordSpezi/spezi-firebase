//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { expect } from 'chai'
import {
  LocalizedText,
  localizedTextConverter,
} from '../../src/models/localizedText.js'

describe('LocalizedText Model', () => {
  describe('Raw Creation', () => {
    it('should create a LocalizedText instance from a string', () => {
      const text = 'Hello World'
      const localizedText = LocalizedText.raw(text)

      expect(localizedText).to.be.an.instanceOf(LocalizedText)
      expect(localizedText.content).to.equal(text)
    })

    it('should create a LocalizedText instance from a record', () => {
      const record = {
        en: 'Hello',
        de: 'Hallo',
        fr: 'Bonjour',
      }
      const localizedText = LocalizedText.raw(record)

      expect(localizedText).to.be.an.instanceOf(LocalizedText)
      expect(localizedText.content).to.deep.equal(record)
    })
  })

  describe('Localize Method', () => {
    it('should return the same text for a string content', () => {
      const text = 'Hello World'
      const localizedText = LocalizedText.raw(text)

      expect(localizedText.localize('en')).to.equal(text)
      expect(localizedText.localize('de')).to.equal(text)
    })

    it('should return the correct language for a record content', () => {
      const record = {
        en: 'Hello',
        de: 'Hallo',
        fr: 'Bonjour',
      }
      const localizedText = LocalizedText.raw(record)

      expect(localizedText.localize('en')).to.equal(record.en)
      expect(localizedText.localize('de')).to.equal(record.de)
      expect(localizedText.localize('fr')).to.equal(record.fr)
    })

    it('should fallback to language prefix if exact match not found', () => {
      const record = {
        en: 'Hello',
        de: 'Hallo',
        fr: 'Bonjour',
      }
      const localizedText = LocalizedText.raw(record)

      expect(localizedText.localize('en-US')).to.equal(record.en)
      expect(localizedText.localize('de-DE')).to.equal(record.de)
      expect(localizedText.localize('fr-FR')).to.equal(record.fr)
    })

    it('should fallback to en-US if language not found', () => {
      const record = {
        en: 'Hello',
        fr: 'Bonjour',
      }
      const localizedText = LocalizedText.raw(record)

      expect(localizedText.localize('de')).to.equal(record.en)
    })

    it('should fallback to first value if en-US not found', () => {
      const record = {
        fr: 'Bonjour',
        de: 'Hallo',
      }
      const localizedText = LocalizedText.raw(record)

      expect(localizedText.localize('es')).to.equal(record.fr)
    })
  })

  describe('Converter', () => {
    it('should encode a LocalizedText properly', () => {
      const record = {
        en: 'Hello',
        de: 'Hallo',
      }
      const localizedText = LocalizedText.raw(record)

      const encoded = localizedTextConverter.encode(localizedText)

      expect(encoded).to.be.an.instanceOf(LocalizedText)
      expect(encoded.content).to.deep.equal(record)
    })
  })
})
