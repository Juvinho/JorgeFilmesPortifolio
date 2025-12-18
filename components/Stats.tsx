import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface StatsProps {
  theme: Theme;
}

const stats = [
  { label: 'Anos de Experiência', value: 25, suffix: '+' },
  { label: 'Filmes Entregues', value: 1000, suffix: '+' },
  { label: 'Cidades Visitadas', value: 60, suffix: '+' },
];

const Stats: React.FC<StatsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 border-y ${isDark ? 'bg-luxury-black border-white/5' : 'bg-luxury-paper border-black/5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className={`font-display text-5xl md:text-6xl font-light mb-2 ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>
                {stat.value}{stat.suffix}
              </span>
              <span className={`font-sans text-xs uppercase tracking-[0.2em] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
