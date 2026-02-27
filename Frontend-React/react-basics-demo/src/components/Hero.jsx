import React from 'react';

const Hero = ({ title, subtitle }) => {
    return (
        <section id="hero" className="py-5 text-center container-fluid bg-light border-bottom">
            <div className="container py-lg-5">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <h1 className="fw-bold display-4 text-primary mb-4">{title}</h1>
                        <p className="lead text-secondary mb-5">
                            {subtitle}
                        </p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button type="button" className="btn btn-primary btn-lg px-4 gap-3 shadow-sm">
                                Get Started
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4 shadow-sm">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
