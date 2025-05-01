//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import {
  SchemaConverter,
  LocalizedText,
  average,
  chunks,
  capitalize,
  advanceDateByDays,
  optionalish
} from 'spezi-firebase-utils'

// 1. Define schemas with SchemaConverter
const userSchema = z.object({
  name: z.string(),
  age: z.number().optional(),
  email: z.string().email(),
  createdAt: z.date(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    notifications: z.boolean().default(true)
  }).optional()
})

type User = z.infer<typeof userSchema>

// 2. Create a schema converter
const userConverter = new SchemaConverter({
  schema: userSchema,
  encode: (user) => ({
    name: user.name,
    age: user.age,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    preferences: user.preferences
  })
})

// Example: Using LocalizedText
const greeting = new LocalizedText({
  'en': 'Welcome to our app!',
  'es': '¡Bienvenido a nuestra aplicación!',
  'de': 'Willkommen in unserer App!'
})

function greetUser(language: string) {
  return greeting.localize(language)
}

// Example: Using array utilities
function calculateStatistics(values: number[]) {
  return {
    average: average(values),
    batches: chunks(values, 5)
  }
}

// Example: Using date utilities
function getExpirationDate(fromDate: Date) {
  return advanceDateByDays(fromDate, 30)
}