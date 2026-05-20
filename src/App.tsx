import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Linkedin, 
  Github, 
  Mail, 
  ExternalLink, 
  Briefcase, 
  Award, 
  Globe, 
  MessageCircle, 
  Code,
  Languages,
  BookOpen,
  ArrowRight,
  Sparkles,
  Phone,
  CheckCircle,
  Cpu
} from 'lucide-react';

// --- Types & Data Definitions ---
interface Project {
  id: number;
  title: string;
  image: string;
  descId: string;
  descEn: string;
  tags: string[];
  link: string;
}

interface Skill {
  category: string;
  items: string[];
  icon: string;
}

interface Experience {
  id: number;
  roleId: string;
  roleEn: string;
  company: string;
  period: string;
  descId: string;
  descEn: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  name: string;
  levelId: string;
  levelEn: string;
}

const PROFILE_DATA = {
  name: "Fira Apriliana",
  image: "https://raw.githubusercontent.com/firaapriliana/porto_fi/main/public/hijab_laptop_avatar_1779261890396.png",
  social: {
    linkedin: "https://linkedin.com/in/fira-apriliana-02b2aa241",
    github: "https://github.com/firaapriliana/",
    email: "mailto:firaaprilianaa2@gmail.com",
    whatsapp: "https://wa.me/6282232661790"
  },
  skills: [
    { category: "Frontend Design", items: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React.js", "Responsive Design"], icon: "layout" },
    { category: "Backend & Data", items: ["Python", "SQL Databases", "Firebase Integration", "Streamlit Apps"], icon: "database" },
    { category: "AI & Digital Skills", items: ["AI Prompting", "LLM APIs Integration", "Generative AI", "Digital Literacy Instruction"], icon: "cpu" },
  ] as Skill[],
  experience: [
    { 
      id: 1, 
      roleId: "Instruktur", 
      roleEn: "Digital", 
      company: "Komdigi", 
      period: "2025 - Sekarang / Present", 
      descId: "penerapan AI generatif, teknik prompt, keselamatan digital, dan data .", 
      descEn: "Developing interactive landing page using AI" 
    },
    { 
      id: 2, 
      roleId: "Pengembang Web Freelance", 
      roleEn: "Freelance Web Developer", 
      company: "Proyek Mandiri / Independent Projects", 
      period: "2024 - Sekarang / Present", 
      descId: "Membangun, mendesain situs web statis yang responsif dengan performa optimal untuk kebutuhan bisnis atau portofolio.", 
      descEn: "Building, designing, and launching static and interactive websites for commercial and personal cases." 
    }
  ] as Experience[],
  projects: [
    { 
      id: 1, 
      title: "Undangan Digital", 
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80", 
      descId: "Platform undangan pernikahan berbasis web yang interaktif dengan integrasi audio, navigasi lokasi dan desain responsive modern.", 
      descEn: "A high-end, responsive wedding invitation web platform with background music, maps navigation, and minimalist layouts.", 
      tags: ["HTML", "CSS", "JavaScript"], 
      link: "https://haribahagia-95991.web.app/" 
    },
    { 
      id: 2, 
      title: "Portofolio Web", 
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80", 
      descId: "Situs etalase karya berestetika tinggi yang memadukan UI minimalist modern, integrasi Firebase, dan navigasi yang sangat lancar.", 
      descEn: "An artistic portfolio application merging clean UI design elements, database metrics integration, and swift transitions.", 
      tags: ["HTML", "Firebase", "Tailwind CSS"], 
      link: "https://otto-portofolio-de0e0.firebaseapp.com" 
    },
    { 
      id: 3, 
      title: "Chatbot Education", 
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", 
      descId: "Asisten virtual chatbot edukatif interaktif yang memandu para orang tua memahami konten sesuai usia dini.", 
      descEn: "An interactive educational AI caregiver assistant designed to help parents analyze good content", 
      tags: ["Python", "Streamlit", "LLM API Integration"], 
      link: "https://temantunas.streamlit.app/" 
    },
    { 
      id: 4, 
      title: "Catalog Digital", 
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", 
      descId: "Katalog pemasaran unit mobil Daihatsu, memudahkan calon pembeli melihat spesifikasi secara detail, responsif, dan elegan.", 
      descEn: "A digital marketing catalog for Daihatsu car displays, providing specs overview, responsive viewports and high elegance.", 
      tags: ["HTML", "CSS", "JavaScript"], 
      link: "https://promo-daihatsu-lamongan.web.app/" 
    }
  ] as Project[],
  certifications: [
    { id: 1, name: "Training of Trainers: Literasi dan Kreasi AI", issuer: "Komdigi", date: "2025" },
    { id: 2, name: "LLM-based Tools and API Integration for Data Scientists", issuer: "Hacktiv8 Indonesia", date: "2025" }
  ] as Certification[],
  languages: [
    { name: "Indonesian (Bahasa)", levelId: "Penutur Asli", levelEn: "Native Speaker" },
    { name: "English (Inggris)", levelId: "Menengah (Aktif)", levelEn: "Intermediate (Active)" },
  ] as Language[]
};

const TRANSLATIONS = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang Saya",
      skills: "Keahlian",
      experience: "Pengalaman & Sertifikat",
      projects: "Proyek Pilihan",
      contact: "Hubungi"
    },
    hero: {
      greeting: "Halo Dunia, saya",
      role: "Pengembang Perangkat Lunak & Instruktur",
      badgeTitle: "Aktif Belajar & Berkarya",
      desc: "Membangun solusi digital yang elegan dan relevan dengan akselerasi teknologi kecerdasan buatan. Berdedikasi menyalurkan literasi digital",
      ctaResume: "Kunjungi LinkedIn",
      ctaProjects: "Mulai Jelajahi Proyek",
    },
    about: {
      title: "Jelajahi Tentang Saya",
      p1: "Saya adalah seorang tech enthusiast yang percaya bahwa masa depan berada dikesiapan dan kebijaksanaan kita terhadap perkembangan teknologi. Sebagai instruktur saya antusias dengan adopsi AI untuk kebermanfaatan yang luas.",
      langTitle: "Kemampuan Bahasa",
    },
    skills: {
      title: "Keahlian",
      subtitle: "sains data, pemrograman, dan pengajaran"
    },
    experience: {
      title: "Perjalanan Karir",
      certTitle: "Sertifikasi Kompetensi",
    },
    projects: {
      title: "Proyek Pilihan",
      subtitle: "Karya nyata dari hasil rancangan dan implementasi teknologi mandiri",
      btnView: "Kunjungi Situs Live",
    },
    contact: {
      title: "Mari Terbincang & Berkolaborasi",
      subtitle: "Ingin membangun website, mengintegrasikan sistem AI, mari berkolaborasi",
      btnChat: "Hubungi via WhatsApp",
      emailBtn: "Kirim Surat Elektronik",
    },
    footer: {
      text: "Portofolio Fira Apriliana © 2026. Semua Hak Cipta Dilindungi."
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      skills: "Skills",
      experience: "Experience & Certs",
      projects: "Featured Projects",
      contact: "Contact"
    },
    hero: {
      greeting: "Hello World, I'm",
      role: "Web Developer & Instructor",
      badgeTitle: "Teaching & Developing Actively",
      desc: "Building elegant and practical digital solutions powered by AI integrations. Dedicated to spreading advanced digital literacy.",
      ctaResume: "Visit My LinkedIn",
      ctaProjects: "Explore Selected Works",
    },
    about: {
      title: "About My Journey",
      p1: "I am a technology enthusiast who believes the future lies in the harmony of intuitive web interactions and artificial intelligence analytics. Serving as an instructor under Komdigi, I instruct local learners on efficient AI tools curation.",
      p2: "Concurrently, I build web solutions including digital invitation webapps, high-speed online store catalogs, and interactive LLM education chatbots, delivering excellent software design.",
      langTitle: "Language Proficiency",
    },
    skills: {
      title: "Technical Spectrum",
      subtitle: "A balanced combo of front-end engineering, database architecture, and digital literacy"
    },
    experience: {
      title: "Professional Milestones",
      certTitle: "Verified Licenses & Certifications",
    },
    projects: {
      title: "Featured Project Exhibition",
      subtitle: "Concrete implementations ranging from web apps to education tools",
      btnView: "Visit Live Demo Website",
    },
    contact: {
      title: "Get in Touch & Collaborate Today",
      subtitle: "Planning to construct a custom website, integrate modern AI workflows, or organize structured webinars? Let me know.",
      btnChat: "Connect on WhatsApp",
      emailBtn: "Send Me an Email",
    },
    footer: {
      text: "Fira Apriliana Portfolio © 2026. All Rights Reserved."
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [isDark, setIsDark] = useState<boolean>(true);
  
  // Custom Interactive Image Styling Filters just for fun
  const [frameColor, setFrameColor] = useState<'purple' | 'emerald' | 'amber' | 'blue'>('purple');
  const [imageSepia, setImageSepia] = useState<boolean>(false);

  // Sync dark theme setting across element DOM class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300 antialiased selection:bg-purple-500 selection:text-white pb-12">
      
      {/* Absolute Aesthetic Gradients for Premium Feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden opacity-50 dark:opacity-30 z-0">
        <div className="absolute -top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -top-[5%] right-[15%] w-[400px] h-[400px] rounded-full bg-blue-500/15 blur-3xl"></div>
      </div>

      {/* --- FLOATING HEADER NAVIGATION --- */}
      <header className="fixed top-6 left-0 right-0 z-50 px-4 max-w-5xl mx-auto flex justify-center">
        <div className="w-full px-5 py-3 rounded-full flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/50 shadow-lg">
          
          {/* Brand Initials / Logo */}
          <a href="#home" id="brand-logo" className="text-xl font-black tracking-tight bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition">
            fira<span className="text-purple-600">.</span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-zinc-300">
            <a href="#home" className="hover:text-purple-500 dark:hover:text-purple-400 transition">{t.nav.home}</a>
            <a href="#about" className="hover:text-purple-500 dark:hover:text-purple-400 transition">{t.nav.about}</a>
            <a href="#skills" className="hover:text-purple-500 dark:hover:text-purple-400 transition">{t.nav.skills}</a>
            <a href="#experience" className="hover:text-purple-500 dark:hover:text-purple-400 transition">{t.nav.experience}</a>
            <a href="#projects" className="hover:text-purple-500 dark:hover:text-purple-400 transition">{t.nav.projects}</a>
          </nav>

          {/* Interactive Language and Theme Controllers */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button 
              id="lang-selector-btn"
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 flex items-center gap-1.5 transition"
              title="Ganti Bahasa / Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-purple-500" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button 
              id="theme-toggler-btn"
              onClick={() => setIsDark(!isDark)}
              className="p-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-full text-slate-700 dark:text-zinc-200 transition"
              title="Ubah Tema / Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO CONTAINER --- */}
      <section id="home" className="max-w-5xl mx-auto px-6 pt-32 pb-16 relative z-10 min-h-[85vh] flex items-center">
        <div className="w-full flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          
          {/* Left Hero Texts */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm text-xs font-semibold shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
              </span>
              <span className="text-slate-700 dark:text-zinc-300">
                 {t.hero.badgeTitle}
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-sm font-semibold tracking-widest text-purple-600 dark:text-purple-400 uppercase block">
                {t.hero.greeting}
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                {PROFILE_DATA.name}
              </h1>
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
                {t.hero.role}
              </p>
            </div>

            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0 font-medium">
              {t.hero.desc}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href="#projects" 
                id="hero-cta-projects"
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all transform hover:-translate-y-0.5 text-sm"
              >
                <span>{t.hero.ctaProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href={PROFILE_DATA.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                id="hero-cta-linkedin"
                className="flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-100 font-bold rounded-full transition text-sm"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span>{t.hero.ctaResume}</span>
              </a>
            </div>

            {/* Quick interactive Social Actions in Hero */}
            <div className="flex gap-4 items-center justify-center md:justify-start text-xs font-semibold text-slate-400 pt-2">
              <a href={PROFILE_DATA.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors flex items-center gap-1.5 p-1">
                <Github className="w-4 h-4 text-slate-800 dark:text-zinc-300" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <span className="text-slate-300 dark:text-zinc-800">/</span>
              <a href={PROFILE_DATA.social.email} className="hover:text-purple-500 transition-colors flex items-center gap-1.5 p-1">
                <Mail className="w-4 h-4 text-rose-500" />
                <span className="hidden sm:inline">Email</span>
              </a>
              <span className="text-slate-300 dark:text-zinc-800">/</span>
              <a href={PROFILE_DATA.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors flex items-center gap-1.5 p-1">
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Hero Image Portrait (Locked to user image with dynamic filters control for interactivity) */}
          <div className="flex-1 flex flex-col items-center justify-center">
            
            {/* Main picture display wrapper with interactive framing styles */}
            <div className="relative w-64 h-64 sm:w-[320px] sm:h-[320px] mb-6 select-none group">
              
              {/* Back ambient lighting */}
              <div className={`absolute -inset-4 rounded-full blur-2xl opacity-25 dark:opacity-35 transition duration-500 bg-gradient-to-r ${
                frameColor === 'purple' ? 'from-purple-500 to-indigo-500' :
                frameColor === 'emerald' ? 'from-emerald-500 to-teal-500' :
                frameColor === 'amber' ? 'from-amber-400 to-orange-500' :
                'from-blue-500 to-cyan-500'
              }`}></div>

              {/* Styled Interactive frame container */}
              <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition duration-500 ${
                frameColor === 'purple' ? 'ring-4 ring-purple-500' :
                frameColor === 'emerald' ? 'ring-4 ring-emerald-500' :
                frameColor === 'amber' ? 'ring-4 ring-amber-400' :
                'ring-4 ring-blue-500'
              }`}>
                
                {/* Image asset with interactive Sepia filter toggle */}
                <img 
                  src={PROFILE_DATA.photo} 
                  alt={PROFILE_DATA.name} 
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition duration-300 ${
                    imageSepia ? 'sepia brightness-90 contrast-110 saturate-[0.80]' : 'brightness-100 contrast-100'
                  }`}
                />

                {/* Aesthetic Gradient Cover Layer */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-4 flex items-end justify-between">
                  <span className="text-white text-[11px] font-black tracking-widest uppercase bg-black/40 px-2 py-1 rounded backdrop-blur-[2px]">
                    FIRA A.
                  </span>
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Picture Controller Panel (Making it fun and functional as requested!) */}
            <div className="w-full max-w-[320px] p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/60 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>Interactive Frame Style:</span>
                </span>
                <span className="text-[10px] font-mono select-none px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 dark:text-zinc-400">
                  {frameColor.toUpperCase()}
                </span>
              </div>
              
              <div className="flex gap-2 items-center justify-between">
                {/* Dots to cycle colors */}
                <div className="flex gap-1.5">
                  <button 
                    id="frame-color-purple-btn"
                    onClick={() => setFrameColor('purple')}
                    className={`h-5 w-5 rounded-full bg-purple-500 border-2 transition ${frameColor === 'purple' ? 'border-purple-800 dark:border-white scale-110' : 'border-transparent'}`}
                    title="Purple Accent"
                  />
                  <button 
                    id="frame-color-emerald-btn"
                    onClick={() => setFrameColor('emerald')}
                    className={`h-5 w-5 rounded-full bg-emerald-500 border-2 transition ${frameColor === 'emerald' ? 'border-emerald-800 dark:border-white scale-110' : 'border-transparent'}`}
                    title="Emerald Accent"
                  />
                  <button 
                    id="frame-color-amber-btn"
                    onClick={() => setFrameColor('amber')}
                    className={`h-5 w-5 rounded-full bg-amber-400 border-2 transition ${frameColor === 'amber' ? 'border-amber-600 dark:border-white scale-110' : 'border-transparent'}`}
                    title="Amber Accent"
                  />
                  <button 
                    id="frame-color-blue-btn"
                    onClick={() => setFrameColor('blue')}
                    className={`h-5 w-5 rounded-full bg-blue-500 border-2 transition ${frameColor === 'blue' ? 'border-blue-800 dark:border-white scale-110' : 'border-transparent'}`}
                    title="Blue Accent"
                  />
                </div>

                {/* Sepia filter toggle */}
                <button 
                  id="sepia-filter-toggle-btn"
                  onClick={() => setImageSepia(!imageSepia)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    imageSepia 
                      ? 'bg-amber-600 text-white shadow' 
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>{lang === 'id' ? 'Klasik Sepia' : 'Classic Sepia'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENTO GRID: TENTANG SAYA & KEMAMPUAN BAHASA --- */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Main About Text (Takes up 2/3 cols) */}
          <div className="md:col-span-2 rounded-3xl p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl -translate-y-12 translate-x-12 pointer-events-none"></div>
            
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <span>{t.about.title}</span>
              </h2>
              <div className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed space-y-4 font-normal">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>
            </div>

            {/* Language Box nested elegantly inside */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800/80">
              <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase block mb-3">
                💬 {t.about.langTitle}
              </span>
              <div className="flex flex-wrap gap-3">
                {PROFILE_DATA.languages.map((langItem, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200/40 dark:border-zinc-800/40 rounded-xl">
                    <span className="text-xs font-black text-slate-800 dark:text-zinc-200">{langItem.name}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                      {lang === 'id' ? langItem.levelId : langItem.levelEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Quote Box / Teaching Philosophy (Takes up 1/3 col) */}
          <div className="md:col-span-1 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-purple-900 to-indigo-950 text-white border border-transparent shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-md"></div>
            
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-white/20 text-white rounded-md inline-block">
                INSTRUCTOR'S HIGHLIGHT
              </span>
              <p className="text-sm font-serif italic leading-relaxed text-purple-100">
                "Curated learning modules empower societies. AI is not here to replace human expertise, but to multiply creative potential tenfold."
              </p>
            </div>

            <div className="flex gap-3 items-center pt-4 mt-6 border-t border-white/10">
              <div className="h-10 w-10 rounded-full border border-white/30 overflow-hidden bg-zinc-800 flex-shrink-0">
                <img src={PROFILE_DATA.photo} alt={PROFILE_DATA.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white leading-none">{PROFILE_DATA.name}</span>
                <span className="text-[10px] text-purple-300">Instruktur (2025)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- KEAHLIAN --- */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center md:text-left mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
             {t.skills.title}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-zinc-400 mt-1">
            {t.skills.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROFILE_DATA.skills.map((skillGroup, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 shadow-sm flex flex-col justify-between hover:border-purple-500/30 transition duration-300">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    {skillGroup.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skillItem, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-50 dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800/60 rounded-lg text-slate-700 dark:text-zinc-300"
                    >
                      {skillItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROFESSIONAL EXPERIENCE & CERTIFICATIONS --- */}
      <section id="experience" className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Work Experience Milestones */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <Briefcase className="w-6 h-6 text-purple-600" />
              <span>{t.experience.title}</span>
            </h2>

            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-zinc-800 space-y-8">
              {PROFILE_DATA.experience.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Milestones dot indicator */}
                  <span className="absolute -left-[31px] top-1 h-4.5 w-4.5 rounded-full border-4 border-white dark:border-zinc-950 bg-purple-500 transition group-hover:scale-110"></span>
                  
                  <span className="text-[11px] font-black tracking-wider text-purple-600 dark:text-purple-400 block uppercase mb-1">
                    {exp.period}
                  </span>
                  
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    {lang === 'id' ? exp.roleId : exp.roleEn}
                  </h3>
                  
                  <span className="text-xs font-medium text-slate-400 dark:text-zinc-500 block mb-3">
                    {exp.company}
                  </span>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {lang === 'id' ? exp.descId : exp.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Block */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <Award className="w-6 h-6 text-yellow-500" />
              <span>{t.experience.certTitle}</span>
            </h2>

            <div className="space-y-4">
              {PROFILE_DATA.certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 flex gap-4 items-start hover:border-yellow-500/30 transition duration-300"
                >
                  <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500 flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500 mt-1">
                      {cert.issuer} • <span className="text-yellow-600 dark:text-yellow-400 font-bold">{cert.date}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- FEATURED PROJECTS EXHIBITION --- */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            🛠️ {t.projects.title}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-zinc-400 mt-1">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROFILE_DATA.projects.map((proj) => (
            <div 
              key={proj.id} 
              className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="w-full aspect-video overflow-hidden relative">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                
                {/* Visual hovering card layer */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white text-base font-bold shadow-sm">{proj.title}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {lang === 'id' ? proj.descId : proj.descEn}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 text-[10px] font-black bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a 
                  href={proj.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  id={`project-link-btn-${proj.id}`}
                  className="w-full py-2.5 rounded-lg text-center font-bold text-xs bg-slate-100 group-hover:bg-purple-600 text-slate-800 group-hover:text-white dark:bg-zinc-800 dark:hover:bg-purple-600 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition duration-300"
                >
                  <span>{t.projects.btnView}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTACT & CALL TO ACTION --- */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="rounded-3xl p-6 sm:p-10 bg-slate-900 text-white border border-transparent shadow-xl relative overflow-hidden text-center">
          
          {/* Premium Background Graphics */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-white/10 text-purple-300 rounded-md inline-block">
              LET'S PARTNER
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {t.contact.title}
            </h2>
            
            <p className="text-sm sm:text-base text-purple-200 leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              {/* WhatsApp direct contact */}
              <a 
                href={PROFILE_DATA.social.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                id="contact-whatsapp-btn"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl transition text-sm shadow-md"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>{t.contact.btnChat}</span>
              </a>

              {/* Email direct button */}
              <a 
                href={PROFILE_DATA.social.email}
                id="contact-email-btn"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-black rounded-xl transition text-sm shadow-md"
              >
                <Mail className="w-4 h-4 text-rose-500" />
                <span>{t.contact.emailBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER BANNER --- */}
      <footer className="max-w-5xl mx-auto px-6 pt-12 text-center relative z-10">
        <p className="text-slate-400 dark:text-zinc-600 font-medium text-xs">
          {t.footer.text}
        </p>
      </footer>

    </div>
  );
}
