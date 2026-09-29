import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    // The locale root layout awaits `params` to render `<html lang>` and
    // `<body dir>`, and `<html>` cannot sit inside a `<Suspense>` boundary.
    // That is unavoidable for an i18n root layout, so only validate segments
    // that explicitly opt in with `export const instant`.
    instantInsights: {
      validationLevel: "manual-warning"
    }
  }
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
