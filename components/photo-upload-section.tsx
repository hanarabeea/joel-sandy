"use client"

import { useTranslation } from "@/lib/translations"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Camera, Upload } from "lucide-react"

export default function PhotoUploadSection() {
  const t = useTranslation()
  const { language } = useLanguage()

  const driveLink = "https://drive.google.com/drive/folders/1OgqQAdKFkTXUlDWxtsv4xuv8O8JtS5ZX"

  const handleUploadClick = () => {
    window.open(driveLink, "_blank")
  }

  return (
    <section className="relative py-20 px-4 md:py-32 bg-gradient-to-b from-transparent via-accent/5 to-transparent overflow-hidden">
      {/* Static decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <Camera className="w-6 h-6 text-accent" />
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>
          <h2 className="font-heading font-luxury text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-4 tracking-wide">
            {t('sharePhotosTitle')}
          </h2>
          <p className="font-luxury text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto italic">
            {t('sharePhotosDescription')}
          </p>
        </div>

        {/* Card */}
        <div className="max-w-3xl mx-auto reveal-scale delay-200">
          <div className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md border-2 border-accent/20 rounded-3xl p-10 md:p-14 shadow-2xl overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-accent/30 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-accent/30 rounded-br-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* QR Code */}
              <div className="flex flex-col items-center mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border-2 border-accent/10">
                  <Image
                    src="/qr-code-img.png"
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="w-[200px] h-[200px]"
                  />
                </div>
                <p className="font-luxury text-lg md:text-xl text-foreground text-center mb-2 font-medium">
                  {t('scanQRCode')}
                </p>
                <p className="font-luxury text-base text-muted-foreground text-center italic">
                  {t('orUploadDirectly')}
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-10">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-accent/30" />
                <span className="text-muted-foreground font-luxury text-sm uppercase tracking-wider">
                  {language === 'ar' ? 'أو' : 'OR'}
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-accent/30 to-accent/30" />
              </div>

              {/* Upload Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleUploadClick}
                  className="group relative px-10 py-7 text-lg md:text-xl font-luxury bg-accent hover:bg-accent/90 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Upload className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  {t('uploadButton')}
                </Button>
              </div>

              {/* Info */}
              <div className="mt-10 pt-8 border-t-2 border-accent/20">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <p className="font-luxury text-sm md:text-base text-center italic">
                    {language === 'ar'
                      ? 'التقطوا صوراً خلال الحفل وارفعوها هنا'
                      : 'Take photos during the event and upload them here'}
                  </p>
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
