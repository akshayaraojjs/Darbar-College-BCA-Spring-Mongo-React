import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-5 bg-white">
            <div className="container py-5">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <div className="position-relative">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                className="img-fluid rounded-4 shadow-lg"
                                alt="About Us"
                            />
                            <div className="position-absolute bottom-0 end-0 bg-primary text-white p-4 rounded-4 shadow m-n3 d-none d-md-block">
                                <h4 className="fw-bold mb-0">10+</h4>
                                <p className="small mb-0">Years Experience</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h6 className="text-primary fw-bold text-uppercase mb-3">About Our Company</h6>
                        <h2 className="display-5 fw-bold mb-4">We Design & Build Premium Digital Experiences</h2>
                        <p className="lead text-secondary mb-4">
                            Our team of dedicated professionals works tirelessly to deliver high-quality web solutions tailored to your business needs.
                        </p>
                        <p className="text-muted mb-4">
                            We focus on scalability, performance, and user-centric design to ensure your digital presence stands out in today's competitive landscape. From initial concept to final deployment, we are your partners in growth.
                        </p>
                        <div className="row g-4 mb-4">
                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-patch-check-fill text-primary fs-3 me-3"></i>
                                    <span className="fw-bold">Quality First</span>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-patch-check-fill text-primary fs-3 me-3"></i>
                                    <span className="fw-bold">24/7 Support</span>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg px-5">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
