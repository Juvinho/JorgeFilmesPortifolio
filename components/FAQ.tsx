import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Theme } from '../types';

interface FAQProps {
  theme: Theme;
}

const faqs = [
  {
    question: 'Com quanto tempo de antecedência devo reservar?',
    answer: 'Recomendamos reservar com pelo menos 6 a 12 meses de antecedência, especialmente para casamentos em datas populares. Aceitamos um número limitado de eventos por ano para garantir a qualidade.',
  },
  {
    question: 'Vocês viajam para filmar em outras cidades/países?',
    answer: 'Sim! Adoramos contar histórias em novos lugares. Nossos custos de deslocamento e hospedagem são calculados à parte no orçamento.',
  },
  {
    question: 'Como é feita a entrega do material?',
    answer: 'Entregamos tudo digitalmente através de uma galeria online exclusiva, onde você pode assistir, baixar e compartilhar seus filmes em 4K. Também oferecemos opções de entrega física em pendrives de luxo.',
  },
  {
    question: 'Qual é o prazo de entrega?',
    answer: 'Nosso prazo padrão para o filme principal é de 60 a 90 dias úteis após o evento. Teasers e trailers curtos geralmente são entregues na primeira semana.',
  },
  {
    question: 'Trabalham com fotografia também?',
    answer: 'Nosso foco principal é a cinematografia. No entanto, temos parceiros fotógrafos incríveis que recomendamos e que possuem uma sintonia perfeita com nossa equipe.',
  },
];

const FAQ: React.FC<FAQProps> = ({ theme }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isDark = theme === 'dark';

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={`py-24 px-4 md:px-12 ${isDark ? 'bg-luxury-slate' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`font-display text-4xl font-light mb-4 ${isDark ? 'text-white' : 'text-luxury-charcoal'}`}>
            Dúvidas <span className={`italic ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>Frequentes</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
              >
                <span className={`font-sans text-lg ${isDark ? 'text-white' : 'text-luxury-charcoal'}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 transition-colors ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze'}`}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className={`pb-6 font-sans font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
