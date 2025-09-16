import { Head, usePage } from '@inertiajs/react'

export default function SEOHead(seoProps = {}) {
  const { props } = usePage()

  // Page-specific SEO (like title, description) is handled by Inertia's Head component automatically
  // by picking up the `seo` prop passed from the controller.
  // This component's main job is to add the shared JSON-LD data.
  const jsonLd = props.shared_seo?.json_ld || {}

  return (
    <Head>
      {/* Structured Data from shared props */}
      {Object.keys(jsonLd).length > 0 && (
        <script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  )
}
