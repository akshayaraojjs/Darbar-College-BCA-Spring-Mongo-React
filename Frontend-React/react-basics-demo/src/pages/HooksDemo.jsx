import React from 'react';
import Hero from '../components/Hero';
import Counter from '../components/Counter';
import DataFetcher from '../components/DataFetcher';
import RefExample from '../components/RefExample';

const HooksDemo = () => {
    return (
        <div className="hooks-demo-page">
            <Hero
                title="Mastering React Hooks"
                subtitle="A comprehensive guide for beginners to understand React components, State management, and Side effects using standard Bootstrap styling."
            />

            <div id="hooks" className="container py-5">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8 text-center">
                        <h2 className="fw-bold section-title">Interactive Hook Demonstrations</h2>
                        <p className="text-muted">Explore these practical examples to see how React's built-in hooks work in a real application.</p>
                        <div className="title-divider mx-auto"></div>
                    </div>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <Counter />
                    </div>
                    <div className="col-md-4">
                        <DataFetcher />
                    </div>
                    <div className="col-md-4">
                        <RefExample />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12 bg-light p-5 rounded-4 border">
                        <h3 className="fw-bold mb-4">Summary for Students</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-group list-group-flush bg-transparent">
                                    <li className="list-group-item bg-transparent border-0 px-0">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        <strong>Functional Components:</strong> Modern way to write React UI.
                                    </li>
                                    <li className="list-group-item bg-transparent border-0 px-0">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        <strong>Props:</strong> Pass data from parent to child components.
                                    </li>
                                    <li className="list-group-item bg-transparent border-0 px-0">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        <strong>Hooks:</strong> Special functions that let you "hook into" React features.
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 bg-white rounded shadow-sm">
                                    <p className="mb-0 italic text-secondary">
                                        "Hooks allow us to use state and other React features without writing a class. They make code more reusable and readable."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HooksDemo;
