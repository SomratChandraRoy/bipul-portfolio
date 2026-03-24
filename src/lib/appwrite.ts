import { Client, Databases, ID } from 'appwrite'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT ?? ''
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID ?? ''
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID ?? ''
const contactCollectionId = import.meta.env.VITE_APPWRITE_CONTACT_COLLECTION_ID ?? ''

const isConfigured = Boolean(endpoint && projectId && databaseId && contactCollectionId)

const client = isConfigured ? new Client().setEndpoint(endpoint).setProject(projectId) : null

const databases = client ? new Databases(client) : null

export const appwriteConfig = {
  endpoint,
  projectId,
  databaseId,
  contactCollectionId,
  configured: isConfigured,
}

export type ContactMessageInput = {
  name: string
  email: string
  message: string
}

export async function submitContactMessage(payload: ContactMessageInput) {
  if (!databases || !databaseId || !contactCollectionId) {
    throw new Error('Appwrite contact form is not configured.')
  }

  return databases.createDocument(databaseId, contactCollectionId, ID.unique(), {
    name: payload.name,
    email: payload.email,
    message: payload.message,
    source: 'portfolio',
  })
}
