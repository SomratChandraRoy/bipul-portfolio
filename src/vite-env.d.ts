/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BLINK_PROJECT_ID?: string
  readonly VITE_BLINK_PUBLISHABLE_KEY?: string
  readonly VITE_APPWRITE_ENDPOINT?: string
  readonly VITE_APPWRITE_PROJECT_ID?: string
  readonly VITE_APPWRITE_DATABASE_ID?: string
  readonly VITE_APPWRITE_CONTACT_COLLECTION_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
