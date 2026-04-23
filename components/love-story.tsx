"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"

export default function LoveStorySection() {
  const { language, isRTL } = useLanguage()
  const [imgSrc, setImgSrc] = useState("/lovestory.jpg")
  const sectionRef = useReveal()

  const storyEn = [
    "In a quiet moment in Nepal, our story began—a meeting we believe was written by God. What started as a simple encounter soon became something far more meaningful—the one we met on a plane became the love of our lives.",
    "Through all the ups and downs, the laughter and the trials, His grace carried us and strengthened our love. And in a breathtaking moment beneath the pyramids, a promise for forever was made.",
    "Now, hand in hand, we step into forever, with hearts full of faith, love, and gratitude."
  ]

  const storyAr = [
    "في لحظة مميزة في نيبال بدأت حكايتنا… مقابلة إحنا مؤمنين إنها كانت مكتوبة من ربنا. اللي بدأت كصدفة بسيطة، اتحوّلت بسرعة لحاجة أكبر بكتير… الشخص اللي قابلناه على الطيارة بقى حب عمرنا.",
    "عدّينا سوا بحاجات كتير، بين الضحك والتحديات، وكل مرة كنا بنقع فيها، كان فضل ربنا بيرفعنا ويقوّي حبنا أكتر. ولحد اللحظة اللي أخدنا فيها قرارنا تحت الأهرامات بإننا نكمّل سوا العمر كله.",
    "ودلوقتي، إيد في إيد، بنبدأ رحلتنا سوا… وقلوبنا مليانة إيمان وحب وامتنان"
  ]

  const paragraphs = language === 'ar' ? storyAr : storyEn

  return (
    <section ref={sectionRef as any} className="relative py-20 px-4 md:py-28 overflow-hidden bg-gradient-to-b from-transparent via-accent/5 to-transparent">
      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Title */}
        <div className="mb-12 reveal reveal-up">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-accent/30" />
            <span className="text-accent text-2xl">♥</span>
            <div className="w-16 h-px bg-accent/30" />
          </div>
          <h2 className="font-heading font-luxury text-5xl md:text-6xl lg:text-7xl text-foreground tracking-wide">
            {language === 'ar' ? 'قصة حبنا' : 'Our Love Story'}
          </h2>
        </div>

        {/* Image */}
        <div className="mb-12 flex justify-center reveal reveal-scale reveal-delay-1">
          <div className="relative w-full max-w-lg aspect-[5/4] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
            <Image
              src={imgSrc}
              alt="Our Story"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              onError={() => setImgSrc("/invitation-design.png")}
            />
          </div>
        </div>

        {/* Story Text */}
        <div className={`space-y-6 md:space-y-8 font-luxury text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed ${isRTL ? 'rtl' : ''}`}>
          {paragraphs.map((p, i) => (
            <p key={i} className={`drop-shadow-sm font-medium reveal reveal-up reveal-delay-${i + 2}`}>
              {p}
              {i === paragraphs.length - 1 && " 💍"}
            </p>
          ))}
        </div>
      </div>

      {/* Static decorative background blobs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
