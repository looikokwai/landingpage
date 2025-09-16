import './bootstrap'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { router } from '@inertiajs/core' // Import router for event listening
import GuestLayout from './Layouts/GuestLayout'
import AdminLayout from './Layouts/AdminLayout'
import ThemeProvider from './theme/ThemeProvider'
import i18n from './i18n' // Import the i18n instance

// --- i18n Namespace Auto Switcher ---
// This logic automatically sets the default i18n namespace ('user' or 'admin')
// based on the Inertia page component name. This avoids having to manually
// specify the namespace in every component.

const setDefaultI18nNamespace = componentName => {
  if (componentName.startsWith('Admin/')) {
    i18n.setDefaultNamespace('admin')
  } else {
    i18n.setDefaultNamespace('user')
  }
}

// Listen for navigation events to switch namespace on page changes.
router.on('navigate', event => {
  setDefaultI18nNamespace(event.detail.page.component)
})
// --- End of i18n Namespace Auto Switcher ---

createInertiaApp({
  title: title => `${title}`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    const page = pages[`./Pages/${name}.jsx`]

    // Automatically apply a layout based on the page name
    if (name.startsWith('Admin/')) {
      if (name !== 'Admin/Login') {
        page.default.layout = pageComponent => <AdminLayout>{pageComponent}</AdminLayout>
      }
    } else {
      page.default.layout = pageComponent => <GuestLayout>{pageComponent}</GuestLayout>
    }

    return page
  },
  setup({ el, App, props }) {
    // Set namespace for the initial page load
    setDefaultI18nNamespace(props.initialPage.component)

    const root = createRoot(el)
    root.render(
      <ThemeProvider>
        <App {...props} />
      </ThemeProvider>
    )
  },
  progress: {
    color: '#4B5563',
  },
})