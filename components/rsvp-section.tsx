"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/translations'
import { useLanguage } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'

export default function RSVPSection() {
  const t = useTranslation()
  const { language } = useLanguage()
  const [name, setName] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('')
  const [guests, setGuests] = useState('1')
  const [guestNames, setGuestNames] = useState<string[]>([''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' as 'success' | 'error' | 'info' | '' })

  const sectionRef = useReveal()

  const handleGuestsChange = (value: string) => {
    setGuests(value)
    const count = parseInt(value, 10) || 0
    setGuestNames((prev) => {
      const next = [...prev]
      if (count > next.length) { while (next.length < count) next.push('') }
      else if (count < next.length) { next.length = count }
      return next
    })
  }

  const handleGuestNameChange = (index: number, value: string) => {
    setGuestNames((prev) => { const next = [...prev]; next[index] = value; return next })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setMessage({ text: t('rsvpError'), type: 'error' }); return }
    if (attending !== 'yes' && attending !== 'no') { setMessage({ text: t('rsvpError'), type: 'error' }); return }
    if (attending === 'yes') {
      if (!guests.trim()) { setMessage({ text: t('rsvpError'), type: 'error' }); return }
      const guestCountNumber = parseInt(guests, 10) || 0
      if (guestCountNumber < 1) { setMessage({ text: t('rsvpError'), type: 'error' }); return }
      if (guestNames.slice(0, guestCountNumber).some((n) => !n.trim())) { setMessage({ text: t('rsvpError'), type: 'error' }); return }
    }

    setIsSubmitting(true)
    setMessage({ text: language === 'ar' ? 'جاري الإرسال...' : 'Submitting...', type: 'info' })

    try {
      const formData = new FormData()
      const guestsValue = attending === 'yes' ? guests.trim() : '0'
      formData.append('name', name.trim())
      formData.append('attending', attending)
      formData.append('guests', guestsValue)
      formData.append('type', 'rsvp')
      if (attending === 'yes') {
        formData.append('guestNames', guestNames.slice(0, parseInt(guestsValue, 10) || 0).join(', '))
      }

      const response = await fetch('/api/send-email', { method: 'POST', body: formData })
      const contentType = response.headers.get('content-type') || ''
      let responseData: any = null
      if (contentType.includes('application/json')) {
        try { responseData = await response.json() }
        catch { responseData = { raw: await response.text().catch(() => '') } }
      } else {
        responseData = { raw: await response.text().catch(() => '') }
      }
      if (!response.ok) throw new Error(responseData?.message || responseData?.error || 'Failed to submit RSVP')
      if (!responseData.success) throw new Error(responseData.message || 'RSVP submission failed')

      setMessage({ text: t('rsvpSuccess'), type: 'success' as const })
      setName(''); setAttending(''); setGuests('1'); setGuestNames([''])
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : t('rsvpError'), type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef as any}
      id="rsvp"
      className="relative py-20 px-4 md:py-32 bg-gradient-to-b from-accent/5 via-background to-transparent overflow-hidden"
      style={{ clipPath: 'polygon(0 0%, 100% 3%, 100% 100%, 0% 97%)' }}
    >
      {/* Static decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 reveal reveal-up">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-accent" />
            <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="w-24 h-px bg-gradient-to-l from-transparent via-accent to-accent" />
          </div>
          <h2 className="font-heading font-luxury text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 tracking-wide">{t('rsvpTitle')}</h2>
          <p className="font-luxury text-lg md:text-xl text-muted-foreground mb-8 italic max-w-2xl mx-auto">{t('rsvpDescription')}</p>
        </div>

        {/* Form card */}
        <div
          className="reveal reveal-scale reveal-delay-2 relative bg-gradient-to-br from-card/95 via-card/90 to-accent/10 backdrop-blur-sm border-4 border-accent/40 p-8 md:p-12 shadow-2xl"
          style={{ clipPath: 'polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)' }}
        >
          {/* Corner hearts */}
          <div className="absolute -top-3 -left-3 text-accent">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <div className="absolute -top-3 -right-3 text-accent">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <div className="absolute -bottom-3 -left-3 text-accent">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <div className="absolute -bottom-3 -right-3 text-accent">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div>
              <label htmlFor="rsvp-name" className="block text-sm font-medium text-foreground mb-2 font-luxury">
                {t('rsvpFormName')}
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('rsvpFormName')}
                className="w-full px-4 py-3 bg-background/50 border-2 border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-luxury"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3 font-luxury">
                {language === 'ar' ? 'حالة الحضور' : 'Attendance'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setAttending('yes')} disabled={isSubmitting}
                  className={`px-4 py-2 rounded-lg border-2 font-luxury transition-all ${attending === 'yes' ? 'bg-accent text-white border-accent shadow-md' : 'bg-background/50 text-foreground border-accent/30 hover:border-accent/60'}`}>
                  {language === 'ar' ? 'سأحضر' : 'Attending'}
                </button>
                <button type="button" onClick={() => setAttending('no')} disabled={isSubmitting}
                  className={`px-4 py-2 rounded-lg border-2 font-luxury transition-all ${attending === 'no' ? 'bg-accent text-white border-accent shadow-md' : 'bg-background/50 text-foreground border-accent/30 hover:border-accent/60'}`}>
                  {language === 'ar' ? 'لن أتمكن من الحضور' : 'Not attending'}
                </button>
              </div>
            </div>

            {attending === 'yes' && (
              <>
                <div>
                  <label htmlFor="rsvp-guests" className="block text-sm font-medium text-foreground mb-2 font-luxury">{t('rsvpFormGuests')}</label>
                  <select id="rsvp-guests" value={guests} onChange={(e) => handleGuestsChange(e.target.value)} disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-background/50 border-2 border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-luxury">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? (language === 'ar' ? 'ضيف' : 'Guest') : (language === 'ar' ? 'ضيوف' : 'Guests')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 font-luxury">
                    {language === 'ar' ? 'أسماء الضيوف' : 'Guest Names'}
                  </label>
                  <div className="space-y-3">
                    {Array.from({ length: parseInt(guests, 10) || 0 }).map((_, index) => (
                      <input key={index} type="text" value={guestNames[index] || ''} onChange={(e) => handleGuestNameChange(index, e.target.value)} disabled={isSubmitting}
                        placeholder={language === 'ar' ? `اسم الضيف ${index + 1}` : `Guest ${index + 1} Name`}
                        className="w-full px-4 py-3 bg-background/50 border-2 border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-luxury"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <button type="submit" disabled={isSubmitting}
                className="w-full px-8 py-4 text-white bg-accent rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-all font-luxury text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none">
                {isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : t('rsvpFormSubmit')}
              </button>
            </div>

            {message.text && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className={`mt-4 p-4 rounded-lg text-center font-luxury ${
                  message.type === 'error' ? 'bg-red-100/80 text-red-700 border-2 border-red-300' :
                  message.type === 'info'  ? 'bg-blue-100/80 text-blue-700 border-2 border-blue-300' :
                                             'bg-green-100/80 text-green-700 border-2 border-green-300'
                }`}>
                {message.text}
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
