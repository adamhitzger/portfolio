export type Lang = "cs" | "en"

export function getLang(param: string | string[] | undefined): Lang {
  if (param === "en") return "en"
  else return "cs"
}

const translations = {
  // Navbar
  nav: {
    about: { en: "About", cs: "O mně" },
    technologies: { en: "Technologies", cs: "Technologie" },
    projects: { en: "Projects", cs: "Projekty" },
    testimonials: { en: "Testimonials", cs: "Reference" },
    contact: { en: "Contact", cs: "Kontakt" },
  },

  // Hero
  hero: {
    subtitle: { en: "Web & PLC Developer", cs: "Web & PLC Vývojář" },
    description: {
      en: "Full-stack web development and industrial automation. I build web apps, program PLCs, and integrate CNC machines.",
      cs: "Full-stack webový vývoj a průmyslová automatizace. Stavím webové aplikace, programuji PLC a integruji CNC stroje.",
    },
    viewProjects: { en: "View Projects", cs: "Zobrazit projekty" },
    getInTouch: { en: "Contact Me", cs: "Kontaktujte mě" },
    scrollToExplore: { en: "Scroll to explore", cs: "Scrollujte dolů" },
    loading: { en: "Loading 3D Scene...", cs: "Načítání 3D scény..." },
  },

  // About
  about: {
    title: { en: "About", cs: "O mně" },
    paragraph1: {
      en: "I'm Adam Hitzger. I develop web applications and program industrial automation systems. My work covers everything from Next.js full-stack apps to Beckhoff TwinCAT PLC programs and Fanuc FOCAS CNC integrations.",
      cs: "Jsem Adam Hitzger. Vyvíjím webové aplikace a programuji průmyslové automatizační systémy. Moje práce pokrývá vše od Next.js full-stack aplikací po Beckhoff TwinCAT PLC programy a Fanuc FOCAS CNC integrace.",
    },
    paragraph2: {
      en: "I work in IT and building production dashboards, connecting PLCs to the web, and delivering clean, maintainable code on both sides.",
      cs: "Pracuji v IT a vyvíjím výrobní dashboardy, propojuji PLC s webem a dodávám čistý, udržovatelný kód na obou stranách.",
    },
    webDev: { en: "Web Development", cs: "Webový vývoj" },
    webDevDesc: { en: "Full-stack apps with modern frameworks", cs: "Full-stack aplikace s moderními frameworky" },
    plc: { en: "PLC Programming", cs: "Programování PLC" },
    plcDesc: { en: "Industrial automation & control", cs: "Průmyslová automatizace a řízení" },
    iot: { en: "IoT Solutions", cs: "IoT řešení" },
    iotDesc: { en: "Connecting hardware to the cloud", cs: "Propojení hardwaru s cloudem" },
    integration: { en: "System Integration", cs: "Systémová integrace" },
    integrationDesc: { en: "Bridging IT & OT systems", cs: "Propojení IT a OT systémů" },
  },

  // Technologies
  tech: {
    title: { en: "Technologies", cs: "Technologie" },
    subtitle: {
      en: "Tools and platforms I work with daily",
      cs: "Nástroje a platformy, se kterými pracuji",
    },
    items: {
      "Next.js": { en: "React framework for production", cs: "React framework pro produkci" },
      TypeScript: { en: "Typed JavaScript at scale", cs: "Typovaný JavaScript ve velkém" },
      "Tailwind CSS": { en: "Utility-first CSS framework", cs: "Utility-first CSS framework" },
      Sanity: { en: "Headless CMS platform", cs: "Headless CMS platforma" },
      HTML: { en: "Foundation of the web", cs: "Základ webu" },
      CSS: { en: "Styling the web beautifully", cs: "Stylování webu" },
      Arduino: { en: "Open-source microcontroller platform", cs: "Open-source mikrokontrolérová platforma" },
      Beckhoff: { en: "TwinCAT PLC automation", cs: "TwinCAT PLC automatizace" },
      "B&R": { en: "Industrial automation solutions", cs: "Průmyslová automatizační řešení" },
      "SQL Databases": { en: "Relational data management & queries", cs: "Správa relačních dat a dotazů" },
      APIs: { en: "RESTful & real-time integrations", cs: "RESTful a real-time integrace" },
      "Fanuc FOCAS": { en: "CNC machine communication protocol", cs: "Komunikační protokol CNC strojů" },
    } as Record<string, { en: string; cs: string }>,
  },

  // Projects
  projects: {
    title: { en: "Projects", cs: "Projekty" },
    subtitle: {
      en: "Selected work from web development and industrial automation",
      cs: "Vybrané práce z webového vývoje a průmyslové automatizace",
    },
    all: { en: "All", cs: "Vše" },
    web: { en: "Web", cs: "Web" },
    industrial: { en: "Industrial", cs: "Průmysl" },
    iot: { en: "IoT", cs: "IoT" },
    items: [
      {
        title: { en: "E-Commerce Platform", cs: "E-Commerce platforma" },
        description: {
          en: "Full-stack online store with Sanity CMS, Stripe payments, and real-time inventory management.",
          cs: "Full-stack online obchod se Sanity CMS, Stripe platbami a real-time správou skladu.",
        },
        category: "Web",
        tags: ["Next.js", "TypeScript", "Sanity", "Tailwind CSS"],
        year: "2025",
      },
      {
        title: { en: "Manufacturing Dashboard", cs: "Výrobní dashboard" },
        description: {
          en: "Real-time monitoring dashboard connecting Beckhoff PLCs to a web interface for production analytics.",
          cs: "Real-time monitorovací dashboard propojující Beckhoff PLC s webovým rozhraním pro výrobní analytiku.",
        },
        category: "IoT",
        tags: ["Next.js", "Beckhoff", "TypeScript", "WebSocket"],
        year: "2025",
      },
      {
        title: { en: "Portfolio Website", cs: "Portfoliový web" },
        description: {
          en: "Personal portfolio with 3D elements, animations, and CMS-driven content management.",
          cs: "Osobní portfolio s 3D prvky, animacemi a správou obsahu přes CMS.",
        },
        category: "Web",
        tags: ["Next.js", "Three.js", "Tailwind CSS"],
        year: "2025",
      },
      {
        title: { en: "Conveyor Control System", cs: "Řídicí systém dopravníku" },
        description: {
          en: "Automated conveyor belt control system with speed regulation, fault detection, and HMI interface.",
          cs: "Automatizovaný řídicí systém dopravníkového pásu s regulací rychlosti, detekcí poruch a HMI rozhraním.",
        },
        category: "Industrial",
        tags: ["Beckhoff", "TwinCAT", "Structured Text"],
        year: "2024",
      },
      {
        title: { en: "Smart Building HVAC", cs: "Chytrá budova HVAC" },
        description: {
          en: "Climate control system with B&R PLC, integrating temperature sensors and energy optimization.",
          cs: "Systém řízení klimatu s B&R PLC, integrací teplotních senzorů a optimalizací energie.",
        },
        category: "Industrial",
        tags: ["B&R", "Automation Studio", "HVAC"],
        year: "2024",
      },
      {
        title: { en: "Restaurant CMS", cs: "CMS pro restaurace" },
        description: {
          en: "Content management system for a restaurant chain with menu management and multi-location support.",
          cs: "Systém pro správu obsahu řetězce restaurací se správou menu a podporou více poboček.",
        },
        category: "Web",
        tags: ["Next.js", "Sanity", "TypeScript", "Tailwind CSS"],
        year: "2024",
      },
      {
        title: { en: "Arduino Weather Station", cs: "Arduino meteostanice" },
        description: {
          en: "IoT weather station with Arduino sensors, cloud data logging, and a Next.js visualization dashboard.",
          cs: "IoT meteostanice s Arduino senzory, cloudovým logováním dat a vizualizačním dashboardem v Next.js.",
        },
        category: "IoT",
        tags: ["Arduino", "Next.js", "MQTT", "TypeScript"],
        year: "2024",
      },
      {
        title: { en: "Packaging Line Automation", cs: "Automatizace balicí linky" },
        description: {
          en: "Automated packaging line with B&R controllers, servo motors, and vision system integration.",
          cs: "Automatizovaná balicí linka s B&R kontroléry, servomotory a integrací kamerového systému.",
        },
        category: "Industrial",
        tags: ["B&R", "Servo Control", "Vision"],
        year: "2024",
      },
      {
        title: { en: "Real Estate Listings", cs: "Realitní inzerce" },
        description: {
          en: "Property listing platform with advanced search, map integration, and admin panel.",
          cs: "Platforma realitní inzerce s pokročilým vyhledáváním, integrací mapy a administračním panelem.",
        },
        category: "Web",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity"],
        year: "2023",
      },
      {
        title: { en: "Water Treatment SCADA", cs: "SCADA pro úpravnu vody" },
        description: {
          en: "Supervisory control and data acquisition system for water treatment plant monitoring.",
          cs: "Systém dohledu a sběru dat pro monitorování úpravny vody.",
        },
        category: "Industrial",
        tags: ["Beckhoff", "TwinCAT", "SCADA", "HMI"],
        year: "2023",
      },
      {
        title: { en: "Smart Greenhouse", cs: "Chytrý skleník" },
        description: {
          en: "Arduino-based greenhouse automation with temperature, humidity control, and web monitoring.",
          cs: "Automatizace skleníku na bázi Arduina s regulací teploty, vlhkosti a webovým monitoringem.",
        },
        category: "IoT",
        tags: ["Arduino", "Next.js", "Sensors", "IoT"],
        year: "2023",
      },
      {
        title: { en: "Agency Landing Page", cs: "Landing page agentury" },
        description: {
          en: "High-performance marketing site with animations, CMS integration, and conversion tracking.",
          cs: "Vysoce výkonný marketingový web s animacemi, integrací CMS a sledováním konverzí.",
        },
        category: "Web",
        tags: ["Next.js", "Tailwind CSS", "HTML", "CSS"],
        year: "2023",
      },
      {
        title: { en: "Motor Control Panel", cs: "Ovládací panel motoru" },
        description: {
          en: "Variable frequency drive control system with Beckhoff PLC, remote diagnostics, and web HMI.",
          cs: "Řídicí systém frekvenčního měniče s Beckhoff PLC, vzdálenou diagnostikou a webovým HMI.",
        },
        category: "Industrial",
        tags: ["Beckhoff", "VFD", "TwinCAT", "OPC UA"],
        year: "2023",
      },
    ],
  },

  // Testimonials
  testimonials: {
    title: { en: "Testimonials", cs: "Reference" },
    subtitle: {
      en: "Feedback from clients and collaborators",
      cs: "Zpětná vazba od klientů a spolupracovníků",
    },
    items: [
      {
        name: "Martin Keller",
        role: {
          en: "Plant Manager, Keller Manufacturing",
          cs: "Vedoucí závodu, Keller Manufacturing",
        },
        text: {
          en: "Their ability to connect our Beckhoff PLCs to a modern web dashboard transformed how we monitor production. Downtime dropped by 30% in the first month.",
          cs: "Schopnost propojit naše Beckhoff PLC s moderním webovým dashboardem proměnila způsob, jakým sledujeme výrobu. Prostoje klesly o 30 % v prvním měsíci.",
        },
      },
      {
        name: "Sarah Novak",
        role: {
          en: "CTO, Digital Agency Studio",
          cs: "CTO, Digital Agency Studio",
        },
        text: {
          en: "We needed a developer who truly understands both frontend excellence and backend architecture. The Next.js applications delivered were fast, accessible, and beautifully crafted.",
          cs: "Potřebovali jsme vývojáře, který skutečně rozumí jak frontendové dokonalosti, tak backendové architektuře. Dodané Next.js aplikace byly rychlé, přístupné a krásně zpracované.",
        },
      },
      {
        name: "Thomas Richter",
        role: {
          en: "Head of Automation, Richter GmbH",
          cs: "Vedoucí automatizace, Richter GmbH",
        },
        text: {
          en: "The B&R packaging line automation project was delivered ahead of schedule with zero issues during commissioning. Exceptional PLC programming expertise.",
          cs: "Projekt automatizace balicí linky s B&R byl dodán před termínem s nulovými problémy při uvádění do provozu. Výjimečné znalosti programování PLC.",
        },
      },
      {
        name: "Elena Vasquez",
        role: {
          en: "Founder, GreenTech Solutions",
          cs: "Zakladatelka, GreenTech Solutions",
        },
        text: {
          en: "Our smart greenhouse IoT project exceeded all expectations. The Arduino sensor network paired with the web monitoring dashboard was exactly what we needed.",
          cs: "Náš IoT projekt chytrého skleníku předčil všechna očekávání. Síť Arduino senzorů spárovaná s webovým monitorovacím dashboardem byla přesně to, co jsme potřebovali.",
        },
      },
      {
        name: "Jan Hofer",
        role: {
          en: "Operations Director, AquaPure",
          cs: "Provozní ředitel, AquaPure",
        },
        text: {
          en: "The SCADA system for our water treatment plant is robust and reliable. Their deep knowledge of TwinCAT and industrial protocols is impressive.",
          cs: "SCADA systém pro naši úpravnu vody je robustní a spolehlivý. Jejich hluboké znalosti TwinCAT a průmyslových protokolů jsou působivé.",
        },
      },
      {
        name: "Lisa Brenner",
        role: {
          en: "Marketing Director, Nova Real Estate",
          cs: "Marketingová ředitelka, Nova Real Estate",
        },
        text: {
          en: "The property listing platform they built with Sanity CMS gives our team full control over content. The performance and SEO results have been outstanding.",
          cs: "Realitní platforma, kterou vytvořili se Sanity CMS, dává našemu týmu plnou kontrolu nad obsahem. Výkon a výsledky SEO jsou vynikající.",
        },
      },
    ],
  },

  // Contact
  contact: {
    title: { en: "Contact", cs: "Kontakt" },
    heading: {
      en: "Have a project in mind? Let's talk specifics.",
      cs: "Máte konkrétní projekt? Pojďme se bavit o detailech.",
    },
    subtitle: {
      en: "I take on freelance web development and industrial automation projects.",
      cs: "Přijímám freelance zakázky na webový vývoj a průmyslovou automatizaci.",
    },
    cta: { en: "Send Email", cs: "Poslat email" },
    footer: { en: "Built with Next.js, Three.js & Tailwind CSS", cs: "Vytvořeno pomocí Next.js, Three.js a Tailwind CSS" },
  },

  // Language switcher
  langSwitch: {
    en: { en: "EN", cs: "EN" },
    cs: { en: "CZ", cs: "CZ" },
  },
} as const

export type Translations = typeof translations
export default translations
