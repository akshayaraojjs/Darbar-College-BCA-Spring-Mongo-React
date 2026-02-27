import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-lg py-3">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
                    <div className="bg-primary rounded-circle p-1 me-2 d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                        <i className="bi bi-rocket-takeoff-fill text-white fs-5"></i>
                    </div>
                    React<span className="text-primary">Demo</span>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item ms-lg-3">
                            <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold border-bottom border-primary border-2' : ''}`}
                                to="/"
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold border-bottom border-primary border-2' : ''}`}
                                to="/people"
                            >
                                Directory
                            </NavLink>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold border-bottom border-primary border-2' : ''}`}
                                to="/hooks"
                            >
                                Hooks Demo
                            </NavLink>
                        </li>
                        <li className="nav-item ms-lg-3 ms-lg-4 mt-3 mt-lg-0">
                            <a href="#contact" className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">
                                Get Started
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
