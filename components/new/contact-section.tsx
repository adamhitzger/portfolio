"use client"

import { useRef, useEffect, useState } from "react"
import { Mail, Github, Linkedin } from "lucide-react"
import t, { type Lang } from "@/lib/translations"

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

export default function ContactSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView()

  return (
    <>
      <section id="contact" className="py-24 px-6">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest">{t.contact.title[lang]}</h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <p className="text-foreground text-2xl font-semibold mb-4 text-balance">
            {t.contact.heading[lang]}
          </p>
          <p className="text-muted-foreground mb-8">
            {t.contact.subtitle[lang]}
          </p>

          <a
            href="mailto:adam.hitzger@icloud.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Mail className="w-4 h-4" />
            {t.contact.cta[lang]}
          </a>

          <div className="flex justify-center gap-6 mt-10">
            <a
              href="https://github.com/adamhitzger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/adam-hitzger-aa518622b/?originalSubdomain=cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:adam.hitzger@icloud.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span className="font-mono">{"Adam Hitzger \u00A9 2026"}</span>
          <span>{t.contact.footer[lang]}</span>
        </div>
      </footer>
    </>
  )
}
