import { sanityFetch } from "@/sanity/lib/client";
import { get_projects, get_reviews } from "@/sanity/lib/query";
import { Projects, Reviews } from "@/types";
import { getLang } from "@/lib/translations"
import Navbar from "@/components/new/navbar";
import HeroScene from "@/components/new/hero-section";
import AboutSection from "@/components/new/about-section";
import ContactSection from "@/components/new/contact-section";
import TechnologiesSection from "@/components/new/technologies-section";
import ProjectsSection from "@/components/new/projects-section";
import TestimonialsSection from "@/components/new/testimonials";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams
  const lang = getLang(params.lang)
  const reviewsPromise = await sanityFetch<Reviews>({query: get_reviews});
  const projectsPromise = await sanityFetch<Projects>({query: get_projects});
  const [reviews, projects, ] = await Promise.all([
    reviewsPromise,
    projectsPromise,
  ])
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar lang={lang}/>
      <HeroScene lang={lang}/>
      <AboutSection lang={lang}/>
      <ProjectsSection lang={lang} projekty={projects}/>
      <TestimonialsSection lang={lang} testismonials={reviews}/>
      <TechnologiesSection lang={lang}/>
      <ContactSection lang={lang}/>
    </main>
  );
}
