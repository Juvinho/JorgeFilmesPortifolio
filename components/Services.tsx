import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Heart, Star, Music, Aperture } from 'lucide-react';
import { Theme } from '../types';

interface ServicesProps {
  theme: Theme;
}

const services = [
  {
    icon: Heart,
    title: 'Casamentos',
    description: 'Capturando a essência do amor em cada olhar e gesto, criando memórias eternas do seu grande dia.',
  },
  {
    icon: Star,
    title: '15 Anos',
    description: 'A magia da transformação e a alegria da juventude registradas com glamour e emoção.',
  },
  {
    icon: Aperture,
    title: 'Corporativo',
    description: 'Eleve a imagem da sua marca com produções audiovisuais que transmitem profissionalismo e inovação.',
  },
  {
    icon: Film,
    title: 'Documentários',
    description: 'Histórias reais contadas com profundidade, sensibilidade e uma estética cinematográfica única.',
  },
];

const Services: React.FC<ServicesProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className={`py-24 px-4 md:px-12 relative z-10 ${isDark ? 'bg-luxury-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-sans text-xs tracking-[0.3em] uppercase block mb-4 ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}
          >
            Nossa Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`font-display text-4xl md:text-6xl font-light ${isDark ? 'text-white' : 'text-luxury-charcoal'}`}
          >
            Cinema Além da <span className={`italic ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>Imagem</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className={`group p-8 border border-transparent hover:border-opacity-20 transition-all duration-500 rounded-sm ${
                isDark 
                  ? 'hover:bg-white/5 hover:border-luxury-gold' 
                  : 'hover:bg-black/5 hover:border-luxury-bronze'
              }`}
            >
              <div className={`mb-6 transform transition-transform duration-500 group-hover:scale-110 ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>
                <service.icon size={40} strokeWidth={1} />
              </div>
              <h3 className={`font-display text-2xl mb-4 ${isDark ? 'text-white' : 'text-luxury-charcoal'}`}>
                {service.title}
              </h3>
              <p className={`font-sans font-light text-sm leading-relaxed opacity-80 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
