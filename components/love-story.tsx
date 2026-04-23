"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
}

export default function LoveStorySection() {
  const { language, isRTL } = useLanguage()
  const [imgSrc, setImgSrc] = useState("/lovestory.jpg")

  const storyEn = [
    "In a quiet moment in Kathmandu, our story began—a meeting we believe was written by God. What started as a simple encounter soon became something far more meaningful—the one we met on a plane became the love of our lives.",
    "Through all the ups and downs, the laughter and the trials, His grace carried us and strengthened our love. And in a breathtaking moment beneath the pyramids, a promise for forever was made.",
    "Now, hand in hand, we step into forever, with hearts full of faith, love, and gratitude."
  ]

  const storyAr = [
    "في لحظة هادئة في كاتماندو، بدأت قصتنا—لقاء نؤمن بأن الله قد খُطه لنا. ما بدأ كلقاء بسيط سرعان ما أصبح شيئاً أعمق بكثير—رفيق السفر على متن الطائرة أصبح حب حياتنا.",
    "عبر كل الصعود والهبوط، الضحكات والتجارب، حملتنا العناية الإلهية وقوت حبنا. وفي لحظة تخطف الأنفاس تحت ظلال الأهرامات، تعاهدنا على البقاء معاً إلى الأبد.",
    "الآن، يداً بيد، نخطو نحو الأبدية، بقلوب مليئة بالإيمان، والحب، والامتنان."
  ]

  const paragraphs = language === 'ar' ? storyAr : storyEn

  return (
    <section className="relative py-20 px-4 md:py-28 overflow-hidden bg-gradient-to-b from-transparent via-accent/5 to-transparent">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-accent/30" />
             <span className="text-accent text-2xl">♥</span>
            <div className="w-16 h-px bg-accent/30" />
          </div>
          <h2 className="font-heading font-luxury text-5xl md:text-6xl lg:text-7xl text-foreground tracking-wide">
            {language === 'ar' ? 'قصة حبنا' : 'Our Love Story'}
          </h2>
        </motion.div>

        {/* Image above the story */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 flex justify-center"
        >
          <div className="relative w-full max-w-lg aspect-[5/4] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
            <Image 
              src={imgSrc} 
              alt="Our Story" 
              fill 
              className="object-cover transition-transform duration-700 hover:scale-105"
              onError={() => {
                // Fallback to the invitation design if the love story picture isn't added yet
                setImgSrc("/invitation-design.png")
              }}
            />
          </div>
        </motion.div>

        {/* Story Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className={`space-y-6 md:space-y-8 font-luxury text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed ${isRTL ? 'rtl' : ''}`}
        >
          {paragraphs.map((p, i) => (
            <motion.p key={i} variants={fadeUp} className="drop-shadow-sm font-medium">
              {p}
              {i === paragraphs.length - 1 && " 💍"}
            </motion.p>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
