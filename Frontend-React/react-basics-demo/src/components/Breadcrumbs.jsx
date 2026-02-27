import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
    return (
        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb bg-light p-3 rounded-4 shadow-sm">
                <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none d-flex align-items-center">
                        <i className="bi bi-house-door-fill me-2"></i>Home
                    </Link>
                </li>
                {paths.map((path, index) => {
                    const isLast = index === paths.length - 1;
                    return isLast ? (
                        <li key={index} className="breadcrumb-item active fw-bold text-primary" aria-current="page">
                            {path.name}
                        </li>
                    ) : (
                        <li key={index} className="breadcrumb-item">
                            <Link to={path.url} className="text-decoration-none">
                                {path.name}
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
