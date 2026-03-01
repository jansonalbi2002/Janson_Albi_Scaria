import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { Linkedin, Github, Mail, MessageCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[140px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[140px] animate-pulse delay-1000 pointer-events-none" />

            <div className="max-w-5xl w-full text-center relative z-10 backdrop-blur-[2px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-accent-blue/20 bg-accent-blue/5 text-accent-blue text-xs font-bold mb-8 uppercase tracking-[0.2em]">
                        Bridging AI Research & Industry
                    </span>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-none">
                        I'm <span className="text-gradient-blue drop-shadow-[0_0_30px_rgba(0,216,255,0.3)]">{resumeData.name.split(' ')[0]}</span>
                        <br />
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">{resumeData.name.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        <span className="text-white font-bold">{resumeData.title}</span> specializing in deployable AI products, computer vision, and high-performance automation.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <a href={`mailto:${resumeData.email}`} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-accent-blue hover:text-white transition-all duration-300 flex items-center gap-2">
                        <Mail className="w-5 h-5" /> Hire Me
                    </a>
                    <a
                        href={`https://wa.me/${resumeData.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 glass-card hover:bg-white/5 font-bold rounded-full transition-all duration-300 flex items-center gap-2 text-white border-white/20"
                    >
                        <MessageCircle className="w-5 h-5" /> WhatsApp
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-16 flex justify-center gap-8"
                >
                    <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-blue transition-colors">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                        <Github className="w-6 h-6" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
