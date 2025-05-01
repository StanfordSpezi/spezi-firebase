<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Spezi Firebase Utils

A collection of utility functions for Firebase projects, extracted from the Stanford ENGAGE-HF project.

## Installation

```bash
npm install spezi-firebase-utils
```

## Features

- **Schema Converters**: Type-safe data conversion with Zod
- **Localization**: Easily handle multi-language text with fallbacks
- **Array Helpers**: Functions for working with arrays (average, median, percentile, etc.)
- **Date Utilities**: Simple date manipulation functions
- **Lazy Loading**: Generic lazy initialization pattern

## Usage Examples

### Schema Converter

```typescript
import { SchemaConverter } from 'spezi-firebase-utils';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

const userConverter = new SchemaConverter({
  schema: userSchema,
  encode: (user) => ({
    name: user.name,
    email: user.email,
    age: user.age,
  }),
});
```

### Localized Text

```typescript
import { LocalizedText } from 'spezi-firebase-utils';

const greeting = new LocalizedText({
  'en': 'Hello',
  'es': 'Hola',
  'fr': 'Bonjour'
});

console.log(greeting.localize('fr')); // 'Bonjour'
console.log(greeting.localize('de', 'en')); // 'Hello' (fallback)
```

## License

MIT © Stanford Byers Center for Biodesign