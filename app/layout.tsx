import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Great_Vibes, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { RomanticAudio } from "@/components/romantic-audio"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/language-toggle"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://joel-sandy.digitivaa.com"),
  title: "Joel & Sandy - Wedding Celebration",
  description: "Join us in celebrating Joel & Sandy's wedding",
  generator: "Digitiva",
  openGraph: {
    url: "https://joel-sandy.digitivaa.com/",
    type: "website",
    siteName: "Joel & Sandy Wedding",
    title: "Joel & Sandy - Wedding Celebration",
    description: "Join us in celebrating Joel & Sandy's wedding",
    images: [
      {
        url: "https://joel-sandy.digitivaa.com/invitation-design.png",
        width: 768,
        height: 1365,
        alt: "Joel & Sandy Wedding Invitation",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel & Sandy - Wedding Celebration",
    description: "Join us in celebrating Joel & Sandy's wedding",
    images: ["https://joel-sandy.digitivaa.com/invitation-design.png"],
  },
  icons: {
    icon: "/invitation-design.png",
    apple: "/invitation-design.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* WhatsApp & Facebook Open Graph tags - MUST be explicit for WhatsApp */}
        {/* 
          IMPORTANT: WhatsApp requirements:
          - File size: MUST be under 300 KB (check your invitation-design.png file size!)
          - Recommended dimensions: 1200x630px (landscape) for best results
          - Current: 768x1365px (portrait) - may work but not optimal
          - Format: PNG or JPEG (not WebP)
        */}
        <meta property="og:url" content="https://joel-sandy.digitivaa.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Joel & Sandy - Wedding Celebration" />
        <meta property="og:description" content="Join us in celebrating Joel & Sandy's wedding" />
        <meta property="og:image" content="https://joel-sandy.digitivaa.com/invitation-design.png" />
        <meta property="og:image:secure_url" content="https://joel-sandy.digitivaa.com/invitation-design.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Joel & Sandy Wedding Invitation" />
        <meta property="og:site_name" content="Joel & Sandy Wedding" />
        <meta property="og:locale" content="en_US" />

        {/* WhatsApp specific tags */}
        <meta property="og:image" content="https://joel-sandy.digitivaa.com/invitation-design.png" />
        <meta name="whatsapp:url" content="https://joel-sandy.digitivaa.com/" />
        <meta name="whatsapp:title" content="Joel & Sandy - Wedding Celebration" />
        <meta name="whatsapp:description" content="Join us in celebrating Joel & Sandy's wedding" />
        <meta name="whatsapp:image" content="https://joel-sandy.digitivaa.com/invitation-design.png" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Joel & Sandy - Wedding Celebration" />
        <meta name="twitter:description" content="Join us in celebrating Joel & Sandy's wedding" />
        <meta name="twitter:image" content="https://joel-sandy.digitivaa.com/invitation-design.png" />

        {/* Preload PNG with high priority to eliminate lag on Netlify */}
        <link
          rel="preload"
          href="/invitation-design.png"
          as="image"
          type="image/png"
        />
        {/* Preload video and poster for faster intro */}
        <link
          rel="preload"
          href="/engagement-video.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/invitation-design.mp4"
          as="video"
          type="video/mp4"
        />
        {/* Preconnect to domains for faster loading */}
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        {/* Preload Google Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          as="style"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${greatVibes.variable}`}>
        <LanguageProvider>
          <Suspense fallback={null}>
            <ScrollReveal />
            <LanguageToggle />
            {children}
            <RomanticAudio />
            <Footer />
          </Suspense>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}