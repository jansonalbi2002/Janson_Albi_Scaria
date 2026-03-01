import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { Mail, MessageCircle, Linkedin, Github, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-20 px-4 bg-black border-t border-glass-border">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 text-center md:text-left">

                    <div className="space-y-6">
                        <h3 className="text-3xl font-black text-gradient-blue">{resumeData.name}</h3>
                        <p className="text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
                            Expert AI Engineer, Entrepreneur, and Thinker building the future of industrial automation.
                        </p>
                        <div className="flex justify-center md:justify-start gap-5">
                            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 glass-card hover:bg-accent-blue/20 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="p-2 glass-card hover:bg-white/10 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold uppercase tracking-widest text-xs text-gray-500">Quick Contact</h4>
                        <div className="space-y-4">
                            <a href={`mailto:${resumeData.email}`} className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-accent-blue transition-colors">
                                <Mail className="w-5 h-5 text-accent-blue" /> {resumeData.email}
                            </a>
                            <a href={`https://wa.me/${resumeData.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-accent-blue transition-colors">
                                <MessageCircle className="w-5 h-5 text-accent-blue" /> WhatsApp: {resumeData.phone}
                            </a>
                            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300">
                                <MapPin className="w-5 h-5 text-accent-blue" /> {resumeData.location}, KA
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold uppercase tracking-widest text-xs text-gray-500">Core Expertise</h4>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {resumeData.technologies.ai_ml.slice(0, 6).map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                                    {tech}
                                </span>
                            ))}
                            <span className="px-3 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded-full text-xs text-accent-blue font-bold">
                                + Many More
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
                    <span>© 2026 Janson Albi Scaria. Built with ❤️ for AI.</span>
                    <div className="flex gap-6">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
