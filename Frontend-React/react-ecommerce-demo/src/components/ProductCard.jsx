import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="card h-100 border-0 shadow-sm transition-hover">
            <div className="p-3 text-center bg-white rounded-top" style={{ height: '200px' }}>
                <img
                    src={product.image}
                    className="img-fluid h-100 object-fit-contain"
                    alt={product.title}
                />
            </div>
            <div className="card-body d-flex flex-column">
                <h6 className="text-muted small text-uppercase mb-2">{product.category}</h6>
                <h5 className="card-title text-truncate fw-bold mb-3">{product.title}</h5>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fs-4 fw-bold text-primary">${product.price}</span>
                    <div className="d-flex gap-2">
                        <Link to={`/product/${product.id}`} className="btn btn-outline-secondary btn-sm rounded-pill">
                            Details
                        </Link>
                        <button
                            className="btn btn-primary btn-sm rounded-pill px-3"
                            onClick={() => addToCart(product)}
                        >
                            <i className="bi bi-cart-plus me-1"></i>Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
