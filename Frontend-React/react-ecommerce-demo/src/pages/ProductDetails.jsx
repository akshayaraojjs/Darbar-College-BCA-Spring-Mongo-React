import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-capitalize">{product.category}</li>
                    <li className="breadcrumb-item active text-truncate" style={{ maxWidth: '200px' }}>{product.title}</li>
                </ol>
            </nav>

            <div className="row g-5">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-5 h-100 bg-white d-flex align-items-center justify-content-center">
                        <img src={product.image} className="img-fluid" alt={product.title} style={{ maxHeight: '400px' }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="ps-lg-4">
                        <h6 className="text-primary fw-bold text-uppercase mb-2">{product.category}</h6>
                        <h1 className="fw-bold mb-3">{product.title}</h1>

                        <div className="d-flex align-items-center mb-4">
                            <div className="text-warning me-2">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill ms-1"></i>
                                <i className="bi bi-star-fill ms-1"></i>
                                <i className="bi bi-star-fill ms-1"></i>
                                <i className="bi bi-star-half ms-1"></i>
                            </div>
                            <span className="text-muted small">({product.rating?.count} customer reviews)</span>
                        </div>

                        <div className="display-5 fw-bold text-primary mb-4">${product.price}</div>

                        <h5 className="fw-bold mb-3">Description</h5>
                        <p className="text-secondary lh-lg mb-5">{product.description}</p>

                        <div className="d-grid gap-2">
                            <button
                                className="btn btn-primary btn-lg rounded-pill py-3 fw-bold"
                                onClick={() => addToCart(product)}
                            >
                                <i className="bi bi-cart-plus me-2"></i>Add to Shopping Cart
                            </button>
                            <Link to="/cart" className="btn btn-outline-dark btn-lg rounded-pill py-3 fw-bold">
                                View My Cart
                            </Link>
                        </div>

                        <div className="mt-5 p-4 bg-light rounded-4 border">
                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="small text-muted mb-1">Shipping</div>
                                    <div className="fw-bold">Fast Delivery</div>
                                </div>
                                <div className="col-6">
                                    <div className="small text-muted mb-1">Returns</div>
                                    <div className="fw-bold">30 Days Return</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
