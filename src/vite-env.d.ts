/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BLINK_PROJECT_ID?: string
  readonly VITE_BLINK_PUBLISHABLE_KEY?: string
  readonly VITE_TALLY_FORM_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
