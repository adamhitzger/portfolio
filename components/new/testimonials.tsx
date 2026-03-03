"use client"

import { useRef, useEffect, useState } from "react"
import t, { type Lang } from "@/lib/translations"
import { Reviews } from "@/types"

function useInView(threshold = 0.1) {
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

export default function TestimonialsSection({ lang, testismonials }: { lang: Lang, testismonials: Reviews }) {
  const { ref, inView } = useInView()
  const en = lang === "en"
  return (
    <section id="testimonials" className="py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest">{t.testimonials.title[lang]}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          {t.testimonials.subtitle[lang]}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testismonials.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500"
              style={{
                transitionDelay: `${i * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary/40 mb-4">
                <path
                  d="M11 7H7a4 4 0 00-4 4v1a3 3 0 003 3h1a2 2 0 002-2v-1a2 2 0 00-2-2H5.5A2.5 2.5 0 018 7.5V7h3V7zm10 0h-4a4 4 0 00-4 4v1a3 3 0 003 3h1a2 2 0 002-2v-1a2 2 0 00-2-2h-1.5A2.5 2.5 0 0118 7.5V7h3V7z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-sm text-foreground leading-relaxed mb-5">
                {`"${en ? item.review_en :item.review_cz}"`}
              </p>
              <div className="flex items-center gap-3">
               
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.client}</p>
                  <p className="text-[11px] text-muted-foreground">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
