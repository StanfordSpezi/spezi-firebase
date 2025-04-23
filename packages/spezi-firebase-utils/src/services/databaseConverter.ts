import { type SchemaConverter } from '../helpers/schemaConverter.js'
import {
  type DocumentData,
  type DocumentSnapshot,
  type FirestoreDataConverter,
} from 'firebase-admin/firestore'
import { type z } from 'zod'

/**
 * Implements FirestoreDataConverter for schema-based data validation.
 * Uses a SchemaConverter to validate and encode data.
 */
export class DatabaseConverter<Schema extends z.ZodTypeAny, Encoded>
  implements FirestoreDataConverter<z.output<Schema>>
{
  private readonly converter: SchemaConverter<Schema, Encoded>

  constructor(converter: SchemaConverter<Schema, Encoded>) {
    this.converter = converter
  }

  /**
   * Convert Firestore data to your model object.
   */
  fromFirestore(snapshot: DocumentSnapshot): z.output<Schema> {
    const data = snapshot.data()
    try {
      return this.converter.schema.parse(data) as z.output<Schema>
    } catch (error) {
      console.error(
        `DatabaseDecoder: Failed to decode object ${JSON.stringify(data)} due to ${String(error)}.`,
      )
      throw error
    }
  }

  /**
   * Convert your model object to Firestore data.
   */
  toFirestore(modelObject: z.output<Schema>): DocumentData {
    try {
      return this.converter.encode(modelObject) as DocumentData
    } catch (error) {
      console.error(
        `DatabaseDecoder: Failed to encode object ${JSON.stringify(modelObject)} due to ${String(error)}.`,
      )
      throw error
    }
  }
}