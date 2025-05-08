//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//


import { LocalizedText } from 'spezi-firebase-utils'
import {
  Message,
  MessageType,
  messageConverter,
} from '../../src/models/message.js'

describe('Message Model', () => {
  const now = new Date()

  const validMessageData = {
    creationDate: now,
    type: MessageType.Information,
    title: new LocalizedText({
      en: 'Test Title',
      de: 'Testtitel',
    }),
    isDismissible: true,
  }

  describe('Constructor', () => {
    test('should create a Message instance with required properties', () => {
      const message = new Message(validMessageData)

      expect(message).toBeInstanceOf(Message)
      expect(message.creationDate).toBe(validMessageData.creationDate)
      expect(message.type).toBe(validMessageData.type)
      expect(message.title).toBe(validMessageData.title)
      expect(message.isDismissible).toBe(validMessageData.isDismissible)
      expect(message.dueDate).toBeUndefined()
      expect(message.completionDate).toBeUndefined()
      expect(message.description).toBeUndefined()
      expect(message.action).toBeUndefined()
      expect(message.reference).toBeUndefined()
      expect(message.data).toBeUndefined()
    })

    test('should create a Message instance with optional properties', () => {
      const dueDate = new Date(now.getTime() + 86400000) // +1 day
      const messageData = {
        ...validMessageData,
        dueDate,
        description: new LocalizedText({
          en: 'Test Description',
          de: 'Testbeschreibung',
        }),
        action: 'test-action',
        reference: 'test-ref',
        data: {
          key1: 'value1',
          key2: 'value2',
        },
      }

      const message = new Message(messageData)

      expect(message).toBeInstanceOf(Message)
      expect(message.creationDate).toBe(messageData.creationDate)
      expect(message.type).toBe(messageData.type)
      expect(message.title).toBe(messageData.title)
      expect(message.isDismissible).toBe(messageData.isDismissible)
      expect(message.dueDate).toBe(messageData.dueDate)
      expect(message.description).toBe(messageData.description)
      expect(message.action).toBe(messageData.action)
      expect(message.reference).toBe(messageData.reference)
      expect(message.data).toEqual(messageData.data)
    })
  })

  describe('Factory Methods', () => {
    test('should create an Information message', () => {
      const message = Message.createInformation({
        title: {
          en: 'Info Title',
          de: 'Info Titel',
        },
      })

      expect(message).toBeInstanceOf(Message)
      expect(message.type).toBe(MessageType.Information)
      expect(message.title).toBeInstanceOf(LocalizedText)
      expect(message.title.localize('en')).toBe('Info Title')
      expect(message.isDismissible).toBe(true)
    })

    test('should create an Alert message', () => {
      const message = Message.createAlert({
        title: 'Alert Title',
        description: 'Alert Description',
      })

      expect(message).toBeInstanceOf(Message)
      expect(message.type).toBe(MessageType.Alert)
      expect(message.title).toBeInstanceOf(LocalizedText)
      expect(message.title.localize('en')).toBe('Alert Title')
      expect(message.description).toBeInstanceOf(LocalizedText)
      expect(message.description?.localize('en')).toBe('Alert Description')
      expect(message.isDismissible).toBe(true)
    })

    test('should create a Reminder message', () => {
      const dueDate = new Date()
      const message = Message.createReminder({
        title: 'Reminder Title',
        dueDate,
        isDismissible: false,
      })

      expect(message).toBeInstanceOf(Message)
      expect(message.type).toBe(MessageType.Reminder)
      expect(message.title.localize('en')).toBe('Reminder Title')
      expect(message.dueDate).toBe(dueDate)
      expect(message.isDismissible).toBe(false)
    })

    test('should create an Action message', () => {
      const message = Message.createAction({
        title: 'Action Title',
        action: 'app://dosomething',
      })

      expect(message).toBeInstanceOf(Message)
      expect(message.type).toBe(MessageType.Action)
      expect(message.title.localize('en')).toBe('Action Title')
      expect(message.action).toBe('app://dosomething')
      expect(message.isDismissible).toBe(false)
    })
  })

  describe('Message Converter', () => {
    test('should encode a Message instance properly', () => {
      const message = new Message(validMessageData)
      const encoded = messageConverter.encode(message)

      expect(encoded).toBeObject()
      expect(encoded.type).toBe(validMessageData.type)
      expect(encoded.isDismissible).toBe(validMessageData.isDismissible)
      expect(encoded.creationDate).toHaveProperty("seconds")
      expect(encoded.creationDate).toHaveProperty("nanoseconds")
    })

    test('should handle optional properties during encoding', () => {
      const dueDate = new Date(now.getTime() + 86400000) // +1 day
      const messageData = {
        ...validMessageData,
        dueDate,
        description: new LocalizedText('Test Description'),
        action: 'test-action',
      }

      const message = new Message(messageData)
      const encoded = messageConverter.encode(message)

      expect(encoded).toBeObject()
      expect(encoded.dueDate).toHaveProperty("seconds")
      expect(encoded.dueDate).toHaveProperty("nanoseconds")
      expect(encoded.description).toBe('Test Description')
      expect(encoded.action).toBe(messageData.action)
    })
  })
})
