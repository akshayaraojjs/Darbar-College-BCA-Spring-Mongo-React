import React from 'react';

const ServiceCard = ({ icon, title, description, color }) => (
    <div className="col-md-4 mb-4">
        <div className="card h-100 border-0 shadow-sm p-4 text-center hover-up">
            <div className={`icon-box mb-4 mx-auto bg-${color}-subtle text-${color} rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '70px', height: '70px' }}>
                <i className={`bi bi-${icon} fs-2`}></i>
            </div>
            <h4 className="fw-bold mb-3">{title}</h4>
            <p className="text-secondary mb-0">{description}</p>
        </div>
    </div>
);

const Services = () => {
    const services = [
        {
            icon: 'laptop',
            title: 'Web Development',
            description: 'Building responsive and high-performance websites using the latest technologies and frameworks.',
            color: 'primary'
        },
        {
            icon: 'phone',
            title: 'Mobile Apps',
            description: 'Creating seamless mobile experiences for iOS and Android platforms with native-like performance.',
            color: 'success'
        },
        {
            icon: 'palette',
            title: 'UI/UX Design',
            description: 'Designing intuitive and aesthetically pleasing interfaces that enhance user engagement and satisfaction.',
            color: 'warning'
        },
        {
            icon: 'graph-up-arrow',
            title: 'Digital Marketing',
            description: 'Growing your brand presence through data-driven strategies and creative marketing campaigns.',
            color: 'info'
        },
        {
            icon: 'shield-lock',
            title: 'Cyber Security',
            description: 'Protecting your digital assets with advanced security measures and robust architectural patterns.',
            color: 'danger'
        },
        {
            icon: 'cloud-check',
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure management to ensure your services remain accessible and reliable.',
            color: 'dark'
        }
    ];

    return (
        <section id="services" className="py-5 bg-light">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h6 className="text-primary fw-bold text-uppercase mb-3">Our Services</h6>
                    <h2 className="display-6 fw-bold">Solutions We Provide</h2>
                    <div className="title-divider mx-auto"></div>
                </div>
                <div className="row g-4">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
