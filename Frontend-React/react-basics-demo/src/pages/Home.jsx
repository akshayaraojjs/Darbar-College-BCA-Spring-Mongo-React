import React from 'react';
import Hero from '../components/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Portfolio from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';

const Home = () => {
    return (
        <div className="home-page">
            <Hero
                title="Elevate Your Vision with Precise Design"
                subtitle="We create stunning, high-performance web applications tailored to your unique business goals. Experience the perfect blend of aesthetics and functionality."
            />
            <About />
            <Services />
            <Portfolio />
            <Testimonials />
            <Contact />
        </div>
    );
};

export default Home;
