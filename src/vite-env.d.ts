/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BLINK_PROJECT_ID?: string
  readonly VITE_BLINK_PUBLISHABLE_KEY?: string
  readonly VITE_PUBLIC_POSTHOG_PROJECT_TOKEN?: string
  readonly VITE_PUBLIC_POSTHOG_HOST?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
