import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Clapperboard, Edit3, Send } from 'lucide-react';
import { Theme } from '../types';

interface ProcessProps {
  theme: Theme;
}

const steps = [
  {
    icon: Coffee,
    title: 'Conexão',
    description: 'Nossa primeira conversa. Entendemos sua história, seus desejos e a essência do que será filmado.',
  },
  {
    icon: Clapperboard,
    title: 'Produção',
    description: 'O dia da ação. Nossa equipe atua de forma discreta e atenta, capturando momentos espontâneos e dirigidos.',
  },
  {
    icon: Edit3,
    title: 'Pós-Produção',
    description: 'Onde a mágica acontece. Edição, color grading e sound design para criar uma narrativa cinematográfica.',
  },
  {
    icon: Send,
    title: 'Entrega',
    description: 'O momento da estreia. Seu filme entregue em alta resolução, pronto para emocionar gerações.',
  },
];

const Process: React.FC<ProcessProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className={`py-32 px-4 md:px-12 relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className={`font-sans text-xs tracking-[0.3em] uppercase block mb-4 ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>
            Workflow
          </span>
          <h2 className={`font-display text-4xl md:text-5xl font-light ${isDark ? 'text-white' : 'text-luxury-charcoal'}`}>
            Nosso Processo <span className={`italic ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>Criativo</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Connecting Line (Desktop only) */}
          <div className={`hidden md:block absolute top-12 left-0 w-full h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 rounded-full border mb-8 flex items-center justify-center relative z-10 transition-all duration-500 ${
                isDark 
                  ? 'bg-[#0a0a0a] border-white/10 group-hover:border-luxury-gold text-white group-hover:text-luxury-gold' 
                  : 'bg-white border-black/10 group-hover:border-luxury-bronze text-luxury-charcoal group-hover:text-luxury-bronze'
              }`}>
                <step.icon size={32} strokeWidth={1} />
              </div>
              
              <h3 className={`font-display text-2xl mb-4 ${isDark ? 'text-white' : 'text-luxury-charcoal'}`}>
                {step.title}
              </h3>
              <p className={`font-sans text-sm font-light leading-relaxed opacity-70 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
