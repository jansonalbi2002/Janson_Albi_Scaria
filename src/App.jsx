import React, { Suspense } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import SpaceBackground from './components/SpaceBackground';

function App() {
    return (
        <div className="bg-background text-foreground min-h-screen selection:bg-accent-blue selection:text-background overflow-x-hidden">
            {/* 3D Background */}
            <Suspense fallback={<div className="fixed inset-0 bg-background" />}>
                <SpaceBackground />
            </Suspense>

            <main className="relative z-10 w-full">
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Footer />
            </main>

            <Chatbot />
        </div>
    );
}

export default App;
