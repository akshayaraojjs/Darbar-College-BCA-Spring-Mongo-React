import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="py-5 bg-white">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h6 className="text-primary fw-bold text-uppercase mb-3">Contact Us</h6>
                    <h2 className="display-6 fw-bold">Get In Touch</h2>
                    <div className="title-divider mx-auto"></div>
                </div>

                <div className="row g-5">
                    <div className="col-lg-5">
                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-primary text-white h-100">
                            <h4 className="fw-bold mb-4">Contact Information</h4>
                            <p className="opacity-75 mb-5">
                                Have a question or a project in mind? Reach out to us and we'll get back to you as soon as possible.
                            </p>

                            <div className="d-flex mb-4">
                                <i className="bi bi-geo-alt-fill fs-4 me-3"></i>
                                <div>
                                    <h6 className="fw-bold mb-1">Our Location</h6>
                                    <p className="small mb-0 opacity-75">123 Tech Avenue, Silicon Valley, CA 94025</p>
                                </div>
                            </div>

                            <div className="d-flex mb-4">
                                <i className="bi bi-envelope-fill fs-4 me-3"></i>
                                <div>
                                    <h6 className="fw-bold mb-1">Email Us</h6>
                                    <p className="small mb-0 opacity-75">hello@reactbasics.demo</p>
                                </div>
                            </div>

                            <div className="d-flex mb-5">
                                <i className="bi bi-telephone-fill fs-4 me-3"></i>
                                <div>
                                    <h6 className="fw-bold mb-1">Call Us</h6>
                                    <p className="small mb-0 opacity-75">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="mt-auto d-flex gap-3">
                                <a href="#" className="btn btn-light btn-sm rounded-circle p-2" style={{ width: '40px', height: '40px' }}><i className="bi bi-facebook"></i></a>
                                <a href="#" className="btn btn-light btn-sm rounded-circle p-2" style={{ width: '40px', height: '40px' }}><i className="bi bi-twitter-x"></i></a>
                                <a href="#" className="btn btn-light btn-sm rounded-circle p-2" style={{ width: '40px', height: '40px' }}><i className="bi bi-linkedin"></i></a>
                                <a href="#" className="btn btn-light btn-sm rounded-circle p-2" style={{ width: '40px', height: '40px' }}><i className="bi bi-instagram"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm p-4 rounded-4">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">Full Name</label>
                                        <input type="text" className="form-control" placeholder="John Doe" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">Email Address</label>
                                        <input type="email" className="form-control" placeholder="john@example.com" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold small">Subject</label>
                                        <input type="text" className="form-control" placeholder="Project Inquiry" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold small">Message</label>
                                        <textarea className="form-control" rows="5" placeholder="How can we help you?"></textarea>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <button type="submit" className="btn btn-primary btn-lg w-100 py-3 fw-bold">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <div className="rounded-4 overflow-hidden border shadow-sm" style={{ height: '400px' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15220.844111326442!2d75.69838035255476!3d16.828236173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc658390b162f27%3A0xc3910c85c290a365!2sVijayapura%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1708845012345!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
