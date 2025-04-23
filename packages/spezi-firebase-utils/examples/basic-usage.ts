import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { z } from 'zod'
import {
  SchemaConverter,
  DatabaseConverter,
  LocalizedText,
  FirestoreService,
  average,
  chunks,
  capitalize,
  advanceDateByDays,
  optionalish
} from 'spezi-firebase-utils'

// Initialize Firebase
const app = initializeApp()
const firestore = getFirestore(app)

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

// 3. Create a Firestore converter
const firestoreUserConverter = new DatabaseConverter(userConverter)

// 4. Use with Firestore
const usersRef = firestore.collection('users').withConverter(firestoreUserConverter)

// 5. Create a Firestore service
const firestoreService = new FirestoreService(firestore)

// Example: Create a user
async function createUser(userData: Omit<User, 'createdAt'>) {
  const user: User = {
    ...userData,
    createdAt: new Date()
  }
  
  await usersRef.add(user)
}

// Example: Get a user
async function getUser(userId: string) {
  const userDoc = await firestoreService.getDocument(usersRef.doc(userId))
  return userDoc?.content
}

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