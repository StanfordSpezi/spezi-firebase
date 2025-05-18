<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Getting Started with spezi-firebase-utils

This guide will help you get started with using the spezi-firebase-utils package in your project.

## Installation

```bash
npm install spezi-firebase-utils
```

## Basic Usage

### Schema Converters with Zod

The package provides utilities for schema validation and type safety using Zod, which can be used with any database or state management system.

```typescript
import { SchemaConverter } from 'spezi-firebase-utils'
import { z } from 'zod'

// Define a schema using Zod
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
})

// Create a schema converter
const userConverter = new SchemaConverter({
  schema: userSchema,
  encode: (user) => ({
    name: user.name,
    email: user.email,
    age: user.age,
  }),
})

// This converter can be used with any database or state management system
// to validate and transform data

// Type safety with Zod
type User = z.infer<typeof userSchema>

function processUser(userData: unknown): User {
  // Validate and parse the input data
  return userSchema.parse(userData)
}
```

### Localized Text

```typescript
import { LocalizedText } from 'spezi-firebase-utils'

// Create a localized text
const errorMessage = new LocalizedText({
  en: 'An error occurred',
  es: 'Se produjo un error',
  fr: 'Une erreur est survenue',
})

// Get localized version based on user's language
function displayError(userLanguage: string) {
  alert(errorMessage.localize(userLanguage))
}

// With fallback
const result = errorMessage.localize('de', 'en') // Will use 'en' as fallback
```

### Working with Dates

```typescript
import { advanceDateByDays, advanceDateByHours } from 'spezi-firebase-utils'

// Calculate expiration date
const now = new Date()
const expirationDate = advanceDateByDays(now, 30) // 30 days from now

// Calculate meeting end time
const meetingStartTime = new Date('2023-10-15T14:00:00Z')
const meetingEndTime = advanceDateByHours(meetingStartTime, 1) // 1 hour later
```

### Array Utilities

```typescript
import { average, median, chunks, compactMap } from 'spezi-firebase-utils'

// Calculate average
const scores = [85, 90, 78, 92, 88]
const avgScore = average(scores) // 86.6

// Calculate median
const medianScore = median(scores) // 88

// Split into batches
const batches = chunks(scores, 2) // [[85, 90], [78, 92], [88]]

// Transform and filter in one step
const userIds = ['user1', 'user2', null, 'user3', undefined]
const validUserIds = compactMap(userIds, (id) => id) // ['user1', 'user2', 'user3']
```

## Advanced Usage

Check out the full documentation and examples directory for more advanced usage scenarios including:

- Optional value handling with Zod
- Lazy initialization patterns
- Type-safe data transformations

## License

MIT
