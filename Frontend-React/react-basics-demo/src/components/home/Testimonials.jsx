import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Marketing Director',
            text: 'Working with this team has been a game-changer for our digital presence. Their attention to detail and creative approach is unmatched.',
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
        },
        {
            name: 'Michael Chen',
            role: 'Tech Lead',
            text: 'The code quality and architectural decisions they made were top-notch. They delivered exactly what we needed on time and within budget.',
            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        },
        {
            name: 'Emily Davis',
            role: 'Startup Founder',
            text: 'From initial brainstorming to final deployment, the experience was smooth. They really understood our vision and brought it to life.',
            img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
        }
    ];

    return (
        <section id="testimonials" className="py-5 bg-light testimonials-section overflow-hidden">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h6 className="text-primary fw-bold text-uppercase mb-3">Testimonials</h6>
                    <h2 className="display-6 fw-bold">What Our Clients Say</h2>
                    <div className="title-divider mx-auto"></div>
                </div>

                <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                    <div className="carousel-indicators">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#testimonialCarousel"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active bg-primary' : 'bg-primary'}
                                aria-current={index === 0 ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    <div className="carousel-inner pb-5">
                        {testimonials.map((item, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="row justify-content-center px-4">
                                    <div className="col-lg-8">
                                        <div className="card border-0 shadow-lg p-5 rounded-4 bg-white text-center position-relative mx-auto" style={{ maxWidth: '800px' }}>
                                            <div className="position-absolute top-0 start-50 translate-middle">
                                                <img
                                                    src={item.img}
                                                    className="rounded-circle border border-5 border-white shadow"
                                                    alt={item.name}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="mt-5 mb-4 text-warning">
                                                <i className="bi bi-star-fill me-1"></i>
                                                <i className="bi bi-star-fill me-1"></i>
                                                <i className="bi bi-star-fill me-1"></i>
                                                <i className="bi bi-star-fill me-1"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                            <p className="text-secondary italic mb-4 fs-4 px-lg-5">"{item.text}"</p>
                                            <h5 className="fw-bold mb-1">{item.name}</h5>
                                            <span className="text-primary small fw-semibold text-uppercase tracking-wider">{item.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-primary rounded-circle p-3" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-primary rounded-circle p-3" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
