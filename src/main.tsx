import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlinkUIProvider, Toaster } from '@blinkdotnew/ui'
import { PostHogProvider } from '@posthog/react'
import App from './App'
import './index.css'

const queryClient = new QueryClient()
const posthogOptions = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
} as const

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN ?? ''}
      options={posthogOptions}
    >
      <QueryClientProvider client={queryClient}>
        <BlinkUIProvider theme="linear" darkMode="system">
          <Toaster />
          <App />
        </BlinkUIProvider>
      </QueryClientProvider>
    </PostHogProvider>
  </React.StrictMode>,
)
