import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { ExternalLink, Code2, Rocket, Newspaper } from 'lucide-react';

const Projects = () => {
    return (
        <section className="py-24 px-4 bg-transparent" id="projects">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-6">Innovation <span className="text-gradient-gold drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]">& R&D</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">Selected projects and research publications in AI and Edge Computing.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {resumeData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass-card p-8 flex flex-col h-full hover:border-accent-gold/40 transition-all group bg-black/40 backdrop-blur-md"
                        >
                            <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-gold transition-colors duration-300">
                                <Rocket className="w-6 h-6 text-accent-gold group-hover:text-black transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tools.map((tool, id) => (
                                    <span key={id} className="text-[10px] font-bold uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-gray-300 border border-white/10">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Publications */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Newspaper className="w-6 h-6 text-accent-gold" /> Publications & Patents</h3>
                    <div className="space-y-6">
                        {resumeData.publications.map((pub, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card p-6 border-l-4 border-l-accent-gold bg-black/20 backdrop-blur-sm"
                            >
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    <h4 className="font-bold text-lg leading-tight">{pub.title}</h4>
                                    <span className="text-accent-gold text-xs font-bold whitespace-nowrap bg-accent-gold/10 px-2 py-1 rounded uppercase tracking-tighter">
                                        {pub.date}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm">{pub.details}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
