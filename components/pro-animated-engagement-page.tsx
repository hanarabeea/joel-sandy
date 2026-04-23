"use client"

import { useEffect, useRef, useState } from "react"
import CountdownTimer from "@/components/countdown-timer"
import VenueMap from "@/components/venue-map"
import HandwrittenMessage from "@/components/handwritten-message"
import LoveStorySection from "@/components/love-story"
import { useTranslation } from "@/lib/translations"
import { useLanguage } from "@/contexts/LanguageContext"
import PhotoUploadSection from "@/components/photo-upload-section"
import RSVPSection from "@/components/rsvp-section"

interface ProAnimatedEngagementPageProps {
  onImageLoad?: () => void;
  introFinished?: boolean;
}

export default function ProAnimatedEngagementPage({ onImageLoad, introFinished }: ProAnimatedEngagementPageProps) {
  const t = useTranslation()
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const invitationVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!introFinished) return
    const video = invitationVideoRef.current
    if (!video) return
    try {
      video.currentTime = 0
      video.load()
      video.play().catch(() => {})
    } catch {}
  }, [introFinished])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 overflow-x-hidden">

      {/* Hero Video */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full z-10">
          {introFinished && (
            <div style={{ height: '100dvh', width: '100vw', position: 'relative', backgroundColor: 'black', overflow: 'hidden' }}>
              <video
                key="invitation-video"
                ref={invitationVideoRef}
                src="/invitation-design.mp4"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                autoPlay
                muted
                playsInline
                preload="auto"
                onLoadedData={onImageLoad}
                poster="/invitation-design.png?v=2"
              />
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => {
            document.querySelector('#countdown')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-white font-bold drop-shadow-md mb-1">
            {language === 'ar' ? 'اسحب لأسفل' : 'Scroll'}
          </span>
          <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </section>

      {/* Decorative divider */}
      <div className="relative pt-12 px-4 md:pt-16 pb-8 md:pb-12">
        <div className="flex items-center justify-center gap-4">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>
      </div>

      {/* Quote */}
      <section className="relative px-4 pb-10 md:pb-14">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-heading text-2xl sm:text-3xl md:text-5xl text-foreground italic leading-relaxed whitespace-nowrap">
            You are my today and all of my tomorrows.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-accent/30" />
            <span className="text-accent">♥</span>
            <div className="w-16 h-px bg-accent/30" />
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section id="countdown" className="relative pt-0 pb-8 px-4 md:pb-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-0 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-0 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-flex flex-col items-center mb-16">
            <h2 className="font-heading font-luxury text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6 tracking-wide">
              {t('ourSpecialDay')}
            </h2>
            <p className="font-luxury text-3xl md:text-3xl lg:text-4xl font-bold max-w-3xl italic bg-clip-text text-transparent bg-gradient-to-br from-primary via-accent to-primary/60">
              {t('countingMoments')}
            </p>
          </div>
          <CountdownTimer targetDate={new Date("2026-05-05T16:00:00")} />
        </div>
      </section>

      {/* Venue Section */}
      <section className="relative py-20 px-4 md:py-32 bg-gradient-to-b from-transparent via-accent/5 to-transparent" style={{ clipPath: 'polygon(0 0%, 100% 5%, 100% 100%, 0% 95%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="w-3 h-3 rotate-45 bg-accent" />
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
            <h2 className="font-heading font-luxury text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-4 tracking-wide">
              {t('joinUsAt')}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Church */}
            <div className="flex-1 relative bg-gradient-to-br from-card/95 via-card/90 to-accent/10 backdrop-blur-sm border-4 border-accent/40 p-4 shadow-2xl mb-8">
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-accent mt-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-wide">
                  {language === 'ar' ? 'مراسم الإكليل' : 'The Church Ceremony'}
                </h3>
                <div className="mb-4">
                  <div className="bg-gradient-to-br from-accent/15 to-accent/5 border-2 border-accent/30 p-4 rounded-lg">
                    <p className="font-luxury text-xl md:text-2xl text-foreground font-medium text-center">
                      {language === 'ar' ? '٤:٠٠ مساءً' : '4:00 PM'}
                    </p>
                  </div>
                </div>
                <VenueMap locationType="church" />
              </div>
            </div>

            {/* Reception */}
            <div className="flex-1 relative bg-gradient-to-br from-card/95 via-card/90 to-accent/10 backdrop-blur-sm border-4 border-accent/40 p-4 shadow-2xl mb-8">
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-accent mt-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-wide">
                  {language === 'ar' ? 'حفل الاستقبال' : 'The Reception'}
                </h3>
                <div className="mb-4">
                  <div className="bg-gradient-to-br from-accent/15 to-accent/5 border-2 border-accent/30 p-4 rounded-lg">
                    <p className="font-luxury text-xl md:text-2xl text-foreground font-medium text-center">
                      {language === 'ar' ? '٦:٣٠ مساءً' : '6:30 PM'}
                    </p>
                  </div>
                </div>
                <VenueMap locationType="reception" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Love Story */}
      <LoveStorySection />

      {/* Message */}
      <HandwrittenMessage />

      {/* RSVP */}
      <RSVPSection />

      {/* Photo Upload */}
      <PhotoUploadSection />

      {/* Footer */}
      <footer className="relative py-24 text-center bg-gradient-to-t from-accent/10 to-transparent">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-heading text-4xl md:text-6xl text-foreground mb-10 italic leading-relaxed">
            {t('footerMessage')}
          </p>
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-accent" />
            <span className="text-3xl text-accent drop-shadow-lg" style={{ fontFamily: 'Arial, sans-serif' }}>♥</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent via-accent to-accent" />
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-light whitespace-nowrap">
              {t('madeBy')}
            </span>
            <a
              href="https://www.instagram.com/digitiva.co?igsh=MXNteGgyZjIzenQwaQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-105"
            >
              <img src="/digitiva.png" alt="Digitiva Logo" className="h-16 w-auto" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}