import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const Experience = () => {
    return (
        <section className="py-24 px-4 bg-black/40 relative overflow-hidden" id="experience">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4">Professional <span className="text-gradient-blue">Journey</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Building scalable AI solutions and leading innovation at Indxo AI.</p>
                </motion.div>

                <div className="space-y-12">
                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-8 hover:border-accent-blue/40 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-blue/30 group-hover:bg-accent-blue transition-colors" />

                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold group-hover:text-accent-blue transition-colors">{exp.role}</h3>
                                    <div className="flex items-center gap-3 text-gray-400 mt-1">
                                        <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {exp.company}</span>
                                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {exp.location}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-accent-blue font-semibold text-sm bg-accent-blue/10 px-3 py-1 rounded-full w-fit">
                                    <Calendar className="w-4 h-4" /> {exp.period}
                                </div>
                            </div>

                            <ul className="space-y-4">
                                {exp.highlights.map((item, id) => (
                                    <li key={id} className="flex gap-3 text-gray-300 leading-relaxed">
                                        <CheckCircle2 className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
