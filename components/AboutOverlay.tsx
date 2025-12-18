import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Camera, Mail, Facebook } from 'lucide-react';
import { Theme } from '../types';

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isOpen, onClose, theme }) => {
  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Elegant ease
          className={`fixed inset-0 z-[60] overflow-y-auto ${isDark ? 'bg-luxury-black text-white' : 'bg-luxury-paper text-luxury-charcoal'}`}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className={`fixed top-8 right-8 z-50 p-4 rounded-full border transition-all duration-300 group hover:rotate-90 ${isDark ? 'border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold' : 'border-luxury-bronze/30 hover:border-luxury-bronze text-luxury-bronze'}`}
          >
            <X size={32} strokeWidth={1} />
          </button>

          <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Image Section */}
            <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen sticky top-0">
               <div className="w-full h-full relative overflow-hidden">
                 <motion.img 
                  initial={{ scale: 1.2, filter: 'blur(10px)' }}
                  animate={{ scale: 1, filter: 'blur(0px)' }}
                  transition={{ delay: 0.3, duration: 1.5 }}
                  src="/profile.jpg"
                  alt="O Filmmaker"
                  className="w-full h-full object-cover"
                />
                 <div className={`absolute inset-0 opacity-20 ${isDark ? 'bg-luxury-gold mix-blend-overlay' : 'bg-luxury-bronze mix-blend-color'}`}></div>
               </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-20 lg:p-32 flex flex-col justify-center relative">
              <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 0.8 }}
              >
                <span className={`block text-xs font-sans tracking-[0.4em] uppercase mb-8 ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>
                  Por trás das lentes
                </span>
                
                <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mb-12">
                  <span className="italic block">Poesia</span>
                  <span className="font-bold">VISUAL</span>
                </h2>

                <div className={`w-20 h-[1px] mb-12 ${isDark ? 'bg-white/20' : 'bg-black/20'}`}></div>

                <div className={`space-y-8 font-sans font-light text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>
                    Acredito que a memória é o único paraíso do qual não podemos ser expulsos. Atuando em <strong>Franca e região</strong>, meu trabalho não é apenas documentar um evento; é preservar a sensação de um momento tão potente que transcende o tempo.
                  </p>
                  <p>
                    Seja a antecipação silenciosa antes dos votos na Catedral ou a alegria explosiva de uma festa de 15 anos, eu busco o não roteirizado, o cru e o sublimemente belo.
                  </p>
                </div>

                {/* Signature / Socials */}
                <div className="mt-20 pt-10 border-t border-dashed border-gray-500/30 flex items-center justify-between">
                   <div className="font-display italic text-2xl">Jorge Filmes</div>
                   <div className="flex gap-6">
                      <a href="https://www.facebook.com/centralfilmsfranca/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Facebook size={20} /></a>
                      <a href="https://www.instagram.com/jorgefilmesfranca/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Instagram size={20} /></a>
                      <a href="https://wa.me/5516991113003" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                      </a>
                      <a href="mailto:contato@jorgefilmes.com" className="hover:scale-110 transition-transform"><Mail size={20} /></a>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutOverlay;