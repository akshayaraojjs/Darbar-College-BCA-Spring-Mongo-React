import React from 'react';

const ProjectCard = ({ image, category, title, description }) => (
    <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100 border-0 shadow-sm overflow-hidden portfolio-item">
            <div className="portfolio-img-wrapper position-relative overflow-hidden">
                <img src={image} className="card-img-top portfolio-img" alt={title} style={{ height: '250px', objectFit: 'cover' }} />
                <div className="portfolio-overlay">
                    <div className="overlay-content">
                        <button className="btn btn-light rounded-circle shadow-sm me-2">
                            <i className="bi bi-link-45deg fs-4"></i>
                        </button>
                        <button className="btn btn-light rounded-circle shadow-sm">
                            <i className="bi bi-zoom-in fs-4"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body p-4">
                <span className="badge bg-primary-subtle text-primary mb-2">{category}</span>
                <h5 className="fw-bold mb-3">{title}</h5>
                <p className="text-secondary small mb-0">{description}</p>
            </div>
        </div>
    </div>
);

const Portfolio = () => {
    const projects = [
        {
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            category: 'Web Design',
            title: 'E-Commerce Platform',
            description: 'A full-featured online store with complex state management and secure checkout.'
        },
        {
            image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80',
            category: 'Branding',
            title: 'Identity Branding',
            description: 'Complete brand identity design including logo, typography, and marketing assets.'
        },
        {
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
            category: 'Mobile App',
            title: 'Fitness Tracker',
            description: 'Interactive mobile application interface with real-time health data visualization.'
        }
    ];

    return (
        <section id="portfolio" className="py-5 bg-white">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h6 className="text-primary fw-bold text-uppercase mb-3">Portfolio</h6>
                    <h2 className="display-6 fw-bold">Recent Projects</h2>
                    <div className="title-divider mx-auto"></div>
                </div>
                <div className="row">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
