import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Sparkles, Minimize2, MessageCircle } from 'lucide-react';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá. Sou a AURA, inteligência de planejamento da Jorge Filmes. Com quem tenho o prazer de falar hoje?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Fallback Logic States
  const [useFallback, setUseFallback] = useState(false);
  const [stage, setStage] = useState<'NAME' | 'EVENT' | 'DATE' | 'DETAILS' | 'FINISHED'>('NAME');
  const [userData, setUserData] = useState({ name: '', event: '', date: '' });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Helper for simulated delay
  const simulateThinking = async (response: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    setIsTyping(false);
  };

  const processFallbackMessage = async (text: string) => {
      const lowerText = text.toLowerCase();

      // Reset command
      if (lowerText.includes('começar') || lowerText.includes('reiniciar')) {
          setStage('NAME');
          setUserData({ name: '', event: '', date: '' });
          await simulateThinking("Olá novamente! Vamos recomeçar. Qual é o seu nome?");
          return;
      }

      switch (stage) {
          case 'NAME':
              const name = text.split(' ')[0]; // Simple extraction
              setUserData(prev => ({ ...prev, name }));
              setStage('EVENT');
              await simulateThinking(`Prazer, ${name}. É uma honra receber você aqui.\n\nQue tipo de história você quer que a gente conte? (Ex: Casamento, 15 Anos, Institucional...)`);
              break;

          case 'EVENT':
              setUserData(prev => ({ ...prev, event: text }));
              setStage('DATE');
              await simulateThinking(`Excelente escolha. Filmes de ${text} são nossa especialidade.\n\nPara quando estamos planejando esse grande dia?`);
              break;

          case 'DATE':
              setUserData(prev => ({ ...prev, date: text }));
              setStage('DETAILS');
              await simulateThinking(`Anotado: ${text}.\n\nPara finalizar nosso pré-planejamento, me conte um pouco mais sobre o que você imagina. Algum detalhe especial ou referência?`);
              break;

          case 'DETAILS':
              setStage('FINISHED');
              const summary = `Olá Jorge! Sou a AURA. Conversei com ${userData.name}. Eles planejam um ${userData.event} para ${userData.date}. Detalhes: ${text}.`;
              // Construct the special link format that the UI parses
              const response = `Perfeito, ${userData.name}. Já visualizei algumas cenas incríveis para o seu filme.\n\nPara te passar um orçamento exato e garantir a data, preparei um resumo para o Jorge.\n\nPosso te conectar diretamente com ele no WhatsApp agora?\n[LINK_WHATSAPP: ${summary}]`;
              await simulateThinking(response);
              break;
          
          case 'FINISHED':
              await simulateThinking(`Já preparei tudo! Basta clicar no botão acima para falar com o Jorge.`);
              break;
      }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    if (useFallback) {
        setIsTyping(false); 
        await processFallbackMessage(userMsg.text);
        return;
    }

    // Try API
    let fullResponse = "";
    setMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);

    try {
      const stream = sendMessageStream(userMsg.text);
      let hasContent = false;
      
      for await (const chunk of stream) {
        if (chunk) {
            // Check for explicit system error from service
            if (chunk.includes("SYSTEM_ERROR")) {
                throw new Error(chunk);
            }

            hasContent = true;
            fullResponse += chunk;
            setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1] = { 
                ...newMsgs[newMsgs.length - 1], 
                text: fullResponse 
                };
                return newMsgs;
            });
        }
      }

      if (!hasContent) throw new Error("Empty response");

    } catch (e) {
      console.warn("API Error, switching to fallback:", e);
      // Remove the empty/error message placeholder
      setMessages(prev => prev.slice(0, -1)); 
      
      setUseFallback(true);
      // Retry with fallback logic immediately
      await processFallbackMessage(userMsg.text);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Helper to extract whatsapp command
  const extractWhatsAppLink = (text: string) => {
    const match = text.match(/\[LINK_WHATSAPP:\s*(.*?)\]/);
    if (match) {
        return `https://wa.me/5516991113003?text=${encodeURIComponent(match[1])}`;
    }
    return null;
  };
  
  // Helper to clean text from command
  const cleanText = (text: string) => {
      return text.replace(/\[LINK_WHATSAPP:.*?\]/, '').trim();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
           <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-luxury-slate/80 backdrop-blur-md border border-luxury-gold/40 rounded-full flex items-center justify-center text-luxury-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all group"
           >
             <Sparkles size={24} className="group-hover:scale-110 transition-transform" />
           </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="w-[350px] md:w-[400px] h-[500px] bg-black/80 backdrop-blur-2xl border border-luxury-gold/20 rounded-t-2xl rounded-bl-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-luxury-gold/10 flex justify-between items-center bg-luxury-gold/5">
              <div className="flex items-center gap-2">
                <span className="font-display tracking-widest text-lg text-luxury-gold font-semibold">AURA AI</span>
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-luxury-gold/50 hover:text-luxury-gold transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-luxury-gold/20 scrollbar-track-transparent">
              {messages.map((msg, idx) => {
                const waLink = msg.role === 'model' ? extractWhatsAppLink(msg.text) : null;
                const displayText = msg.role === 'model' ? cleanText(msg.text) : msg.text;

                return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-luxury-gold/10 text-white rounded-2xl rounded-tr-sm border border-luxury-gold/20' 
                      : 'text-luxury-text/90 italic'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{displayText}</p>
                  </div>
                  
                  {waLink && (
                     <a 
                       href={waLink}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="mt-3 bg-[#25D366] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#128C7E] transition-colors shadow-lg cursor-pointer animate-pulse"
                     >
                        <MessageCircle size={20} />
                        Falar com Jorge
                     </a>
                  )}
                </motion.div>
                );
              })}
              {isTyping && (
                <div className="flex justify-start px-4">
                   <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s'}}></span>
                      <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-luxury-gold/10 bg-black/40">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite sua resposta..."
                  className="flex-1 bg-transparent border-b border-luxury-gold/30 text-white px-2 py-3 text-sm outline-none transition-colors placeholder:text-gray-600 focus:border-luxury-gold"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="text-luxury-gold hover:text-white transition-colors disabled:opacity-30"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;