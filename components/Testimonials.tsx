import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Theme } from '../types';

interface TestimonialsProps {
  theme: Theme;
}

const testimonials = [
  {
    name: 'Ana & Pedro',
    event: 'Casamento',
    quote: 'O Jorge não apenas filmou nosso casamento, ele capturou a alma do dia. Cada vez que assistimos, choramos novamente. É pura arte.',
  },
  {
    name: 'Maria Helena',
    event: '15 Anos',
    quote: 'A sensibilidade da equipe foi incrível. Eles me deixaram super à vontade e o resultado ficou parecendo um filme de cinema mesmo!',
  },
  {
    name: 'Grupo Soluções',
    event: 'Institucional',
    quote: 'Profissionalismo impecável. O vídeo elevou a percepção da nossa marca para um novo patamar. Recomendamos de olhos fechados.',
  },
];

const Testimonials: React.FC<TestimonialsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className={`py-32 px-4 md:px-12 relative overflow-hidden ${isDark ? 'bg-luxury-black' : 'bg-[#F5F5F0]'}`}>
      {/* Decorative background elements */}
      <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-10 ${isDark ? 'text-white' : 'text-black'}`} />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <Quote size={48} className={`mb-6 opacity-30 ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`} />
          <h2 className={`font-display text-4xl md:text-5xl font-light mb-4 ${isDark ? 'text-white' : 'text-luxury-charcoal'}`}>
            O Que Dizem Nossos <span className={`italic ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>Clientes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <p className={`font-display text-xl md:text-2xl italic leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                "{t.quote}"
              </p>
              <div className="mt-auto">
                <h4 className={`font-sans text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>
                  {t.name}
                </h4>
                <span className={`text-xs opacity-50 uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>
                  {t.event}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
