import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Bot } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hi! I'm Janson's AI assistant. Ask me anything about his experience, projects, or skills!" }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        setTimeout(() => {
            let botResponse = "That's a great question! Janson specializes in AI Engineering and Entrepreneurship. Would you like to know about his projects at Indxo AI or his education at Purdue?";

            const query = input.toLowerCase();
            if (query.includes('project')) {
                botResponse = `Janson has worked on several key projects including Alterate (Project Management Suite), an Accelerated AI Environment for image segmentation, and an Edge GenAI ANPR system.`;
            } else if (query.includes('experience') || query.includes('work')) {
                botResponse = `Janson is currently a Team Lead & AI Engineer at Indxo AI. He's led teams for enterprise apps like the TDS Generator and Fluid Manager System.`;
            } else if (query.includes('skill') || query.includes('tech')) {
                botResponse = `He's proficient in Python, JavaScript, SQL, and AI frameworks like PyTorch, OpenCV, and YOLOv8. He also works with Edge AI and Cloud (AWS/Azure).`;
            } else if (query.includes('contact') || query.includes('whatsapp') || query.includes('email')) {
                botResponse = `You can email him at ${resumeData.email} or WhatsApp him at ${resumeData.phone}. Links are in the contact section!`;
            }

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="glass-card mb-4 w-80 sm:w-96 flex flex-col overflow-hidden shadow-2xl border-accent-blue/20"
                        style={{ height: '450px' }}
                    >
                        <div className="p-4 border-b border-glass-border flex justify-between items-center bg-accent-blue/10">
                            <div className="flex items-center gap-2">
                                <Bot className="w-5 h-5 text-accent-blue" />
                                <span className="font-semibold text-sm">Resume Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-accent-blue text-background font-medium rounded-tr-none'
                                        : 'bg-glass-border text-foreground rounded-tl-none border border-glass-border'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-glass-border bg-black/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about Janson..."
                                    className="flex-1 bg-glass border border-glass-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-blue/50 text-white"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-2 bg-accent-blue rounded-lg text-background hover:bg-white transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-accent-blue rounded-full flex items-center justify-center shadow-lg shadow-accent-blue/20 text-background"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
