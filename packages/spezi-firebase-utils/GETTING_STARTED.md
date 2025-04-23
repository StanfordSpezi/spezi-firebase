# Getting Started with spezi-firebase-utils

This guide will help you get started with using the spezi-firebase-utils package in your Firebase project.

## Installation

```bash
npm install spezi-firebase-utils
```

## Basic Usage

### Schema Converters with Zod

```typescript
import { SchemaConverter, DatabaseConverter } from 'spezi-firebase-utils';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';

// Define a schema using Zod
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

// Create a schema converter
const userConverter = new SchemaConverter({
  schema: userSchema,
  encode: (user) => ({
    name: user.name,
    email: user.email,
    age: user.age,
  }),
});

// Create a Firestore converter
const firestoreUserConverter = new DatabaseConverter(userConverter);

// Use with Firestore
const db = getFirestore();
const usersRef = db.collection('users').withConverter(firestoreUserConverter);

// Now you can use usersRef with type safety
async function createUser(name: string, email: string, age?: number) {
  await usersRef.add({ name, email, age });
}

async function getUser(id: string) {
  const doc = await usersRef.doc(id).get();
  if (doc.exists) {
    // doc.data() is fully typed!
    const user = doc.data();
    console.log(`User: ${user.name}, Email: ${user.email}`);
    return user;
  }
  return null;
}
```

### Localized Text

```typescript
import { LocalizedText } from 'spezi-firebase-utils';

// Create a localized text
const errorMessage = new LocalizedText({
  'en': 'An error occurred',
  'es': 'Se produjo un error',
  'fr': 'Une erreur est survenue',
});

// Get localized version based on user's language
function displayError(userLanguage: string) {
  alert(errorMessage.localize(userLanguage));
}

// With fallback
const result = errorMessage.localize('de', 'en'); // Will use 'en' as fallback
```

### Working with Dates

```typescript
import { advanceDateByDays, advanceDateByHours } from 'spezi-firebase-utils';

// Calculate expiration date
const now = new Date();
const expirationDate = advanceDateByDays(now, 30); // 30 days from now

// Calculate meeting end time
const meetingStartTime = new Date('2023-10-15T14:00:00Z');
const meetingEndTime = advanceDateByHours(meetingStartTime, 1); // 1 hour later
```

### Array Utilities

```typescript
import { average, median, chunks, compactMap } from 'spezi-firebase-utils';

// Calculate average
const scores = [85, 90, 78, 92, 88];
const avgScore = average(scores); // 86.6

// Calculate median
const medianScore = median(scores); // 88

// Split into batches
const batches = chunks(scores, 2); // [[85, 90], [78, 92], [88]]

// Transform and filter in one step
const userIds = ['user1', 'user2', null, 'user3', undefined];
const validUserIds = compactMap(userIds, id => id); // ['user1', 'user2', 'user3']
```

## Advanced Usage

Check out the full documentation and examples directory for more advanced usage scenarios including:

- Firebase service wrappers for transactions and batched writes
- Optional value handling with Zod
- Lazy initialization patterns

## License

MIT