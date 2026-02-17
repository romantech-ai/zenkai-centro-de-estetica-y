import type { Metadata } from "next"
import { clinic } from "@/config/clinic"
import { generateLocalBusinessSchema, generateFAQSchema } from "@/lib/schema"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    template: clinic.seo.titleTemplate,
    default: clinic.seo.defaultTitle,
  },
  description: clinic.seo.defaultDescription,
  keywords: clinic.seo.keywords,
  openGraph: {
    title: clinic.seo.defaultTitle,
    description: clinic.seo.defaultDescription,
    images: [clinic.seo.ogImage],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: clinic.seo.defaultTitle,
    description: clinic.seo.defaultDescription,
    images: [clinic.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""

  return (
    <html lang="es">
      <head>
        {/* Dynamic CSS variables from config */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --color-primary: ${clinic.colors.primary};
                --color-secondary: ${clinic.colors.secondary};
                --color-accent: ${clinic.colors.accent};
                --color-neutral: ${clinic.colors.neutral};
              }
            `,
          }}
        />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema(baseUrl)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema()),
          }}
        />
      
        <script dangerouslySetInnerHTML={{ __html: `window.__WIDGET_API_URL="https://automatizacion-webs.vercel.app";window.__PROJECT_ID="zenkai-centro-de-estetica-y";` }} />

        <script
          src="https://automatizacion-webs.vercel.app/widget.js"
          data-project-name="Zenkai Centro de Estética y Relax"
          data-api-url="https://automatizacion-webs.vercel.app"
          data-project-id="zenkai-centro-de-estetica-y"
          data-primary-color="#894512"
          defer
        ></script>
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  )
}
