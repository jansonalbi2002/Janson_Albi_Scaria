import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { GraduationCap } from 'lucide-react';

const About = () => {
    return (
        <section className="py-24 px-4 bg-transparent relative" id="about">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                        Thinker. <span className="text-gradient-blue">Engineer.</span><br />Entrepreneur.
                    </h2>
                    <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                        <p className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">{resumeData.about}</p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            {resumeData.technologies.languages.map((lang, i) => (
                                <span key={i} className="px-5 py-2 glass-card text-accent-blue font-bold text-sm tracking-widest border-accent-blue/30 shadow-[0_0_15px_rgba(0,216,255,0.1)]">
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="glass-card p-8 border-accent-blue/20 bg-black/40 backdrop-blur-md">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><GraduationCap className="w-8 h-8 text-accent-blue" /> Academic Excellence</h3>
                        <div className="space-y-8">
                            {resumeData.education.map((edu, i) => (
                                <div key={i} className="relative pl-6 border-l border-accent-blue/30">
                                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent-blue" />
                                    <h4 className="font-bold text-white leading-none mb-2">{edu.institution}</h4>
                                    <p className="text-sm text-gray-400 mb-1">{edu.degree}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs font-bold text-accent-blue uppercase tracking-widest">{edu.period}</span>
                                        <span className="px-2 py-0.5 bg-accent-blue/10 rounded text-accent-blue text-[10px] font-black italic">GPA: {edu.gpa}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {edu.coursework.map((course, idx) => (
                                            <span key={idx} className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-500 border border-white/5 uppercase">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
