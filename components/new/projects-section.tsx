"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import t, { type Lang } from "@/lib/translations"
import { Projects } from "@/types"
import Link from "next/link"
import { PortableText } from "next-sanity"

function useInView(threshold = 0.05) {
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

export default function ProjectsSection({ lang, projekty }: { lang: Lang, projekty: Projects }) {
  const { ref, inView } = useInView()
  const en = lang === "en"
  return (
    <section id="projects" className="py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest">{t.projects.title[lang]}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          {t.projects.subtitle[lang]}
        </p>

       

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projekty.map((project, i) => (
            <Link
            href={project.www}
              key={en ? project.title_en :project.title_cz}
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-400"
              style={{
                transitionDelay: `${i * 50}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  
                  <h3 className="text-base font-semibold text-foreground mt-0.5">{en ? project.title_en :project.title_cz}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">{project.year}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
             <div className="text-sm">
               <PortableText value={en ? project.description_en :project.description_cz}/>
             </div>
             
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
