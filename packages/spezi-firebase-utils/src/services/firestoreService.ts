import { Lazy } from '../helpers/lazy.js'
import {
  type BulkWriter,
  type BulkWriterOptions,
  type Transaction,
  type Firestore,
  type DocumentReference,
  type Query,
  type CollectionReference,
} from 'firebase-admin/firestore'

/**
 * Interface for a document retrieved from Firestore
 */
export interface Document<T> {
  id: string
  path: string
  lastUpdate: Date
  content: T
}

/**
 * Generic Firestore service with typed query and document methods
 */
export class FirestoreService {
  private readonly firestore: Firestore

  constructor(firestore: Firestore) {
    this.firestore = firestore
  }

  /**
   * Get documents from a Firestore query
   */
  async getQuery<T>(query: Query<T>): Promise<Array<Document<T>>> {
    const collection = await query.get()
    return collection.docs.map((doc) => ({
      id: doc.id,
      path: doc.ref.path,
      lastUpdate: doc.updateTime?.toDate() ?? doc.readTime.toDate(),
      content: doc.data(),
    }))
  }

  /**
   * Get a single document from Firestore
   */
  async getDocument<T>(
    reference: DocumentReference<T>
  ): Promise<Document<T> | undefined> {
    const doc = await reference.get()
    const data = doc.exists ? doc.data() : undefined
    return doc.exists && data !== undefined
      ? {
          id: doc.id,
          path: doc.ref.path,
          lastUpdate: doc.updateTime?.toDate() ?? doc.readTime.toDate(),
          content: data,
        }
      : undefined
  }

  /**
   * Perform multiple writes in a batch
   */
  async bulkWrite(
    callback: (writer: BulkWriter) => Promise<void>,
    options?: BulkWriterOptions,
  ): Promise<void> {
    const writer = this.firestore.bulkWriter(options)
    await callback(writer)
    await writer.close()
  }

  /**
   * List subcollections of a document
   */
  async listCollections<T>(
    docReference: DocumentReference<T>,
  ): Promise<CollectionReference[]> {
    return docReference.listCollections()
  }

  /**
   * Run a transaction
   */
  async runTransaction<T>(
    callback: (transaction: Transaction) => Promise<T> | T,
  ): Promise<T> {
    return this.firestore.runTransaction(async (transaction) =>
      callback(transaction),
    )
  }
}