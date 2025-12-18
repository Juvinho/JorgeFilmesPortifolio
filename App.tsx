import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Instagram, Twitter, Mail, Sun, Moon, Facebook } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import GlitchText from './components/GlitchText'; 
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import AboutOverlay from './components/AboutOverlay';
import CinematicScroll from './components/CinematicScroll';
import Logo from './components/Logo';
import DynamicFavicon from './components/DynamicFavicon';
import Preloader from './components/Preloader';
import FilmGrain from './components/FilmGrain';
import RevealText from './components/RevealText';
import MagneticButton from './components/MagneticButton';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Stats from './components/Stats';
import Process from './components/Process';
import FAQ from './components/FAQ';
import { PROJECTS_DARK, PROJECTS_LIGHT } from './constants';
import { Theme } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [filter, setFilter] = useState('Todas');
  
  const { scrollY } = useScroll();
  
  // Parallax Effects for Hero
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const bgY1 = useTransform(scrollY, [0, 500], [0, 200]); // Moves slower
  const bgY2 = useTransform(scrollY, [0, 500], [0, -150]); // Moves upward
  const bgY3 = useTransform(scrollY, [0, 500], [0, 100]); 

  const allProjects = theme === 'dark' ? PROJECTS_DARK : PROJECTS_LIGHT;
  const isDark = theme === 'dark';

  // Calculate unique categories from current projects
  const categories = ['Todas', ...Array.from(new Set(allProjects.map(p => p.category)))];

  const filteredProjects = filter === 'Todas' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  // Reset filter when theme changes to avoid stale categories
  useEffect(() => {
    setFilter('Todas');
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, 400); // Wait for curtain to cover
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const handleOpenAbout = () => {
    setAboutOpen(true);
    setMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-luxury-black text-luxury-text selection:bg-luxury-gold selection:text-black' : 'bg-luxury-paper text-luxury-charcoal selection:bg-luxury-bronze selection:text-white'}`}>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <FilmGrain />
      <CustomCursor />
      <DynamicFavicon theme={theme} />
      
      {/* Theme Transition Curtain */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0, transformOrigin: 'bottom' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-luxury-gold pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 p-6 md:p-10 flex justify-between items-center transition-colors duration-500 ${isDark ? 'mix-blend-exclusion' : ''}`}>
        <div className="z-50 cursor-pointer flex items-center gap-4 group" onClick={() => scrollToSection('hero')}>
          <Logo theme={theme} className="w-10 h-10 md:w-12 md:h-12" />
          <div className="flex flex-col">
            <h1 className={`font-display font-medium text-xl md:text-2xl tracking-[0.15em] uppercase leading-none transition-colors duration-300 ${isDark ? 'text-white group-hover:text-luxury-gold' : 'text-luxury-charcoal group-hover:text-luxury-bronze'}`}>
              Jorge Filmes
            </h1>
            <span className={`text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] uppercase opacity-60 font-sans ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              Cinematography
            </span>
          </div>
        </div>

        <div className="z-50 flex items-center gap-6">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`transition-transform hover:rotate-180 duration-500 ${isDark ? 'text-white hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-bronze'}`}
          >
            {isDark ? <Sun size={24} strokeWidth={1.5} /> : <Moon size={24} strokeWidth={1.5} />}
          </button>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className={`transition-colors ${isDark ? 'text-white hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-bronze'}`}
          >
            {menuOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div className={`fixed inset-0 z-30 flex items-center justify-center transition-all duration-1000 cubic-bezier(0.7, 0, 0.3, 1) ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F0]'}`}>
        <ul className="text-center space-y-12 font-display text-5xl md:text-7xl font-light italic">
          <li className="overflow-hidden">
             <button onClick={() => scrollToSection('work')} className={`hover:scale-105 transition-all duration-500 ${isDark ? 'text-white hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-bronze'}`}>
               PORTFÓLIO
             </button>
          </li>
          <li className="overflow-hidden">
             <button onClick={handleOpenAbout} className={`hover:scale-105 transition-all duration-500 ${isDark ? 'text-white hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-bronze'}`}>
               SOBRE MIM
             </button>
          </li>
          <li className="overflow-hidden">
             <button onClick={() => scrollToSection('contact')} className={`hover:scale-105 transition-all duration-500 ${isDark ? 'text-white hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-bronze'}`}>
               CONTATO
             </button>
          </li>
        </ul>
      </div>

      {/* About Overlay Component */}
      <AboutOverlay isOpen={aboutOpen} onClose={() => setAboutOpen(false)} theme={theme} />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
        
        {/* Video Background Layer */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={isDark ? 'dark-video' : 'light-video'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full"
              >
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-30 grayscale mix-blend-overlay pointer-events-none"
                    onError={(e) => e.currentTarget.style.display = 'none'} 
                >
                    <source src={isDark ? "/hero-video-dark.mp4" : "/hero-video-light.mp4"} type="video/mp4" />
                </video>
              </motion.div>
            </AnimatePresence>
            
            {/* Gradient Overlay for Text Readability */}
            <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'bg-black/60' : 'bg-white/60'}`} />
        </div>

        {/* Background Atmosphere - Parallax Layers (Fallback/Enhancement) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div style={{ y: bgY1 }} className={`absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full blur-[150px] animate-float opacity-60 ${isDark ? 'bg-luxury-gold/10' : 'bg-luxury-bronze/10'}`}></motion.div>
          <motion.div style={{ y: bgY2 }} className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-float opacity-50 ${isDark ? 'bg-purple-900/20' : 'bg-orange-100/60'}`} ></motion.div>
          <motion.div style={{ y: bgY3 }} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[180px] opacity-30 animate-pulse ${isDark ? 'bg-blue-900/10' : 'bg-yellow-100/40'}`}></motion.div>
        </div>
        
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="mb-8 flex justify-center items-center gap-6 opacity-80">
            <motion.span 
              initial={{ width: 0 }} animate={{ width: 80 }} transition={{ delay: 0.5, duration: 1 }}
              className={`h-[1px] bg-gradient-to-r from-transparent ${isDark ? 'to-luxury-gold' : 'to-luxury-bronze'}`}
            ></motion.span>
            <span className={`font-sans text-xs md:text-sm tracking-[0.5em] uppercase ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze font-bold'}`}>
              {isDark ? 'Edição da Meia-noite' : 'Edição Diurna'}
            </span>
            <motion.span 
              initial={{ width: 0 }} animate={!loading ? { width: 80 } : {}} transition={{ delay: 1, duration: 1 }}
              className={`h-[1px] bg-gradient-to-l from-transparent ${isDark ? 'to-luxury-gold' : 'to-luxury-bronze'}`}
            ></motion.span>
          </div>
          
          <h1 className="font-display text-6xl md:text-9xl font-light tracking-wide mb-10 leading-tight">
            <span className={`block italic ${isDark ? 'text-white/90' : 'text-luxury-charcoal'} transform hover:scale-105 transition-transform duration-700`}>
               {isDark ? 'Eterno' : 'Natural'}
            </span>
            {/* We can re-use GlitchText as a shimmer component, it just needs styling tweaks via props, but for now standard text is cleaner for light mode */}
            <span className={`relative inline-block ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-white to-luxury-gold animate-shimmer' : 'text-luxury-charcoal font-medium'} drop-shadow-lg`}>
               {isDark ? 'NOTURNO' : 'RADIANTE'}
            </span>
          </h1>
          
          <p className={`max-w-2xl mx-auto font-sans text-lg md:text-xl font-light tracking-wide leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isDark 
              ? "Preservando a magia da noite, onde sombras dançam e estrelas testemunham seu legado." 
              : "Capturando a pureza da luz, emoções honestas e o sopro suave do dia."}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => scrollToSection('work')}
        >
          <span className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${isDark ? 'text-gray-500 group-hover:text-luxury-gold' : 'text-gray-400 group-hover:text-luxury-bronze'}`}>Explorar</span>
          <ChevronDown className={`transition-colors duration-300 ${isDark ? "text-luxury-gold/50 group-hover:text-luxury-gold" : "text-luxury-bronze/50 group-hover:text-luxury-bronze"}`} size={32} strokeWidth={1} />
        </motion.div>
      </section>

      {/* Cinematic Scroll Showcase - New Apple-style Section */}
      <CinematicScroll theme={theme} />

      {/* Stats Section - New */}
      <Stats theme={theme} />

      {/* Services Section - New */}
      <Services theme={theme} />

      {/* Process Section - New */}
      <Process theme={theme} />

      {/* Work Section */}
      <section id="work" className={`py-32 px-4 md:px-12 relative z-10 ${isDark ? 'bg-luxury-slate' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className={`flex flex-col md:flex-row justify-between items-end mb-16 border-b pb-10 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
            <h2 className={`font-display text-5xl md:text-7xl font-light ${isDark ? 'text-white' : 'text-luxury-charcoal'}`}>
              Histórias <span className={`italic ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>Selecionadas</span>
            </h2>
            <span className="font-sans text-gray-400 text-sm tracking-widest uppercase mt-4 md:mt-0">
               {isDark ? 'Coleção Noturna' : 'Coleção Diurna'}
            </span>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-16 justify-center md:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 pb-1 border-b-2 ${
                  filter === cat 
                    ? (isDark ? 'text-luxury-gold border-luxury-gold' : 'text-luxury-bronze border-luxury-bronze font-bold')
                    : (isDark ? 'text-gray-600 border-transparent hover:text-white' : 'text-gray-400 border-transparent hover:text-luxury-charcoal')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 min-h-[500px]">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} theme={theme} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full flex items-center justify-center text-gray-500 font-sans tracking-widest">
                NENHUM PROJETO ENCONTRADO NESTA CATEGORIA
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <Testimonials theme={theme} />

      {/* FAQ Section - New */}
      <FAQ theme={theme} />

      {/* Contact Section */}
      <section id="contact" className={`py-40 px-4 md:px-12 flex flex-col items-center text-center relative overflow-hidden ${isDark ? 'bg-luxury-slate' : 'bg-luxury-paper'}`}>
        {/* Decorative BG */}
        <div className={`absolute top-0 w-full h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-luxury-gold/30' : 'via-luxury-bronze/30'}`} />

        <div className="max-w-4xl mx-auto z-10">
          <span className={`font-sans text-xs tracking-[0.3em] uppercase mb-6 block ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>Agenda 2026</span>
          <h2 className={`font-display text-5xl md:text-8xl font-light mb-10 ${isDark ? 'text-white' : 'text-luxury-charcoal'}`}>
            Sua História <br/> <span className={`italic ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>Começa Aqui</span>
          </h2>
          <p className={`text-lg mb-16 max-w-xl mx-auto font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Todo grande filme começa com uma conversa. Vamos discutir como podemos capturar seus momentos mais preciosos.
          </p>
          
          <MagneticButton href="mailto:contato@jorgefilmes.com" className={`group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-sans font-medium tracking-tighter border rounded-full transition-colors duration-500 ${isDark ? 'text-white border-white/20 hover:border-luxury-gold' : 'text-luxury-charcoal border-black/20 hover:border-luxury-bronze'}`}>
            <span className={`absolute w-0 h-0 transition-all duration-500 ease-out rounded-full group-hover:w-64 group-hover:h-64 opacity-10 ${isDark ? 'bg-luxury-gold' : 'bg-luxury-bronze'}`}></span>
            <span className="relative flex items-center gap-3 tracking-widest uppercase text-sm">
              Solicitar Orçamento <Mail size={16} />
            </span>
          </MagneticButton>
        </div>

        <div className={`mt-24 flex gap-10 justify-center transition-opacity ${isDark ? 'opacity-60 hover:opacity-100' : 'opacity-80 hover:opacity-100'}`}>
            <a href="https://www.facebook.com/centralfilmsfranca/" target="_blank" rel="noopener noreferrer" className={`transform hover:-translate-y-1 duration-300 ${isDark ? 'text-white hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-bronze'}`}>
              <Facebook size={24} strokeWidth={1.5} />
            </a>
            <a href="https://www.instagram.com/jorgefilmesfranca/" target="_blank" rel="noopener noreferrer" className={`transform hover:-translate-y-1 duration-300 ${isDark ? 'text-white hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-bronze'}`}>
              <Instagram size={24} strokeWidth={1.5} />
            </a>
            <a href="https://wa.me/5516991113003" target="_blank" rel="noopener noreferrer" className={`transform hover:-translate-y-1 duration-300 ${isDark ? 'text-white hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-bronze'}`}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
            </a>
            <a href="mailto:contato@jorgefilmes.com" className={`transform hover:-translate-y-1 duration-300 ${isDark ? 'text-white hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-bronze'}`}>
              <Mail size={24} strokeWidth={1.5} />
            </a>
        </div>

        <footer className="absolute bottom-8 w-full text-center text-[10px] font-sans tracking-[0.2em] uppercase flex flex-col items-center gap-2">
           <span className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>© 2024 JORGE FILMES. Desde 1997</span>
           <a 
             href="https://axyonmarketing.com" 
             target="_blank" 
             rel="noopener noreferrer" 
             className={`${isDark ? 'text-luxury-gold/60 hover:text-luxury-gold' : 'text-luxury-bronze/60 hover:text-luxury-bronze'} transition-colors duration-300`}
           >
             Site criado pela Axyon Marketing
           </a>
        </footer>
      </section>

      <AIChat />
    </div>
  );
};

export default App;