import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ onSearch }) => {
    const { totalItems } = useCart();
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top py-3 shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
                    <i className="bi bi-cart4 me-2"></i>React<span className="text-white">Store</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/category/electronics">Electronics</NavLink>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0"><i className="bi bi-search"></i></span>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none bg-light"
                                placeholder="Search products..."
                                onChange={handleSearchChange}
                            />
                        </div>

                        <Link to="/cart" className="btn btn-outline-primary position-relative rounded-pill px-3">
                            <i className="bi bi-bag-fill"></i>
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
