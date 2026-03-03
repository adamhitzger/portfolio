"use client"

import { useEffect, useRef, useState } from "react"
import t, { type Lang } from "@/lib/translations"

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function AboutSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView()

  const cards = [
    { label: t.about.webDev[lang], desc: t.about.webDevDesc[lang] },
    { label: t.about.plc[lang], desc: t.about.plcDesc[lang] },
    { label: t.about.iot[lang], desc: t.about.iotDesc[lang] },
    { label: t.about.integration[lang], desc: t.about.integrationDesc[lang] },
  ]

  return (
    <section id="about" className="py-24 px-6">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest">{t.about.title[lang]}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-foreground text-lg leading-relaxed mb-6">
              {t.about.paragraph1[lang]}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.about.paragraph2[lang]}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {cards.map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors duration-300"
              >
                <h3 className="text-sm font-semibold text-foreground mb-1">{item.label}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
