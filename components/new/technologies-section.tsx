"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import t, { type Lang } from "@/lib/translations"

const technologies = [
  { name: "Next.js", category: "Web", image: "/images/tech/nextjs.jpg" },
  { name: "TypeScript", category: "Web", image: "/images/tech/typescript.jpg" },
  { name: "Tailwind CSS", category: "Web", image: "/images/tech/tailwindcss.jpg" },
  { name: "Sanity", category: "Web", image: "/images/tech/sanity.jpg" },
  { name: "HTML", category: "Web", image: "/images/tech/html.jpg" },
  { name: "CSS", category: "Web", image: "/images/tech/css.jpg" },
  { name: "SQL Databases", category: "Web", image: "/images/tech/sql.jpg" },
  { name: "APIs", category: "Web", image: "/images/tech/api.jpg" },
  { name: "Arduino", category: "Industrial", image: "/images/tech/arduino.jpg" },
  { name: "Beckhoff", category: "Industrial", image: "/images/tech/beckhoff.jpg" },
  { name: "B&R", category: "Industrial", image: "/images/tech/br.jpg" },
  { name: "Fanuc FOCAS", category: "Industrial", image: "/images/tech/focas.jpg" },
]

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

function TechCard({ tech, index, inView, lang }: {
  tech: typeof technologies[0]; index: number; inView: boolean; lang: Lang
}) {
  const description = t.tech.items[tech.name]?.[lang] ?? ""

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
      style={{
        transitionDelay: `${index * 80}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
      }}
    >
      <div className="relative h-40 overflow-hidden">
        <Image src={tech.image} alt={`${tech.name} technology`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
          {tech.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground mb-1">{tech.name}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export default function TechnologiesSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView()

  return (
    <section id="technologies" className="py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest">{t.tech.title[lang]}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          {t.tech.subtitle[lang]}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} inView={inView} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
