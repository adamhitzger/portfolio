"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import t, { type Lang } from "@/lib/translations"

export default function Navbar({ lang }: { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { label: t.nav.about[lang], href: "#about" },
    { label: t.nav.technologies[lang], href: "#technologies" },
    { label: t.nav.projects[lang], href: "#projects" },
    { label: t.nav.testimonials[lang], href: "#testimonials" },
    { label: t.nav.contact[lang], href: "#contact" },
  ]

  const otherLang = lang === "cs" ? "en" : "cs"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="font-mono text-lg font-bold text-primary">
          {"AH"}
          <span className="text-muted-foreground font-normal text-sm ml-1.5 hidden sm:inline">{"/ dev"}</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`?lang=${otherLang}`}
            className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200"
          >
            {t.langSwitch[otherLang][lang]}
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <a
            href={`?lang=${otherLang}`}
            className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200"
          >
            {t.langSwitch[otherLang][lang]}
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
