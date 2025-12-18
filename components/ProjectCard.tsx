import React from 'react';
import { motion } from 'framer-motion';
import { Project, Theme } from '../types';
import { Play } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  theme: Theme;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, theme }) => {
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[16/9] overflow-hidden cursor-pointer shadow-xl rounded-sm"
    >
      {/* Image with Ken Burns Effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
         <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 7, ease: "linear" }} // Slow, cinematic zoom
         />
         <div className={`absolute inset-0 transition-colors duration-700 ${isDark ? 'bg-black/40 group-hover:bg-black/60' : 'bg-black/10 group-hover:bg-black/30'}`} />
         
         {/* Cinematic Shine Effect */}
         <div className="absolute inset-0 -translate-x-[150%] skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 pointer-events-none" />
      </div>

      {/* Elegant Border Frame */}
      <div className={`absolute inset-4 border scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ${isDark ? 'border-luxury-gold/30' : 'border-luxury-bronze/40'}`} />

      {/* Overlay Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 items-center text-center">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
          <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
             <span className={`text-xs font-sans uppercase tracking-[0.2em] ${isDark ? 'text-luxury-gold' : 'text-luxury-bronze font-bold'}`}>
               {project.category}
             </span>
          </div>
          <h3 className={`font-display text-3xl md:text-4xl italic mb-2 transition-colors drop-shadow-md ${isDark ? 'text-white group-hover:text-luxury-goldLight' : 'text-white group-hover:text-white'}`}>
            {project.title}
          </h3>
          <p className={`text-sm font-light max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 drop-shadow-sm ${isDark ? 'text-gray-200' : 'text-white'}`}>
            {project.description}
          </p>
        </div>
      </div>

      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
         <div className={`w-14 h-14 rounded-full border flex items-center justify-center backdrop-blur-md transition-colors ${isDark ? 'border-white/30 bg-white/10 hover:bg-luxury-gold/20' : 'border-white/50 bg-white/20 hover:bg-white/40'}`}>
            <Play className="text-white fill-white ml-1 w-5 h-5" />
         </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;