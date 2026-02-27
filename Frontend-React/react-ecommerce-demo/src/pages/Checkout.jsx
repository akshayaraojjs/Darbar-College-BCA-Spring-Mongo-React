import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            clearCart();
            navigate('/');
        }, 3000);
    };

    if (submitted) return (
        <div className="container py-5 text-center">
            <div className="py-5">
                <i className="bi bi-check-circle-fill display-1 text-success mb-4"></i>
                <h2 className="fw-bold">Order Placed Successfully!</h2>
                <p className="lead text-secondary opacity-75">Thank you for your purchase. Redirecting you to home page...</p>
            </div>
        </div>
    );

    return (
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5">
                        <h4 className="fw-bold mb-4">Shipping Information</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">First Name</label>
                                    <input type="text" className="form-control" required placeholder="John" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Last Name</label>
                                    <input type="text" className="form-control" required placeholder="Doe" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-bold">Email Address</label>
                                    <input type="email" className="form-control" required placeholder="john@example.com" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-bold">Shipping Address</label>
                                    <input type="text" className="form-control" required placeholder="123 Shopping St, Retail City" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">City</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Postal Code</label>
                                    <input type="text" className="form-control" required />
                                </div>
                            </div>

                            <h4 className="fw-bold mb-4 mt-5">Payment Details</h4>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label small fw-bold">Card Holder Name</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-bold">Card Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-credit-card"></i></span>
                                        <input type="text" className="form-control" placeholder="0000 0000 0000 0000" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Expiry Date</label>
                                    <input type="text" className="form-control" placeholder="MM/YY" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">CVV</label>
                                    <input type="text" className="form-control" placeholder="123" required />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill mt-5 py-3 fw-bold">
                                Complete Purchase of ${totalPrice.toFixed(2)}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-light h-100">
                        <h5 className="fw-bold mb-4">Your Order</h5>
                        <div className="mb-4">
                            {cart.map(item => (
                                <div key={item.id} className="d-flex align-items-center mb-3">
                                    <div className="bg-white rounded p-1 shadow-sm me-3">
                                        <img src={item.image} style={{ width: '40px', height: '40px', objectFit: 'contain' }} alt={item.title} />
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <div className="text-truncate fw-bold small">{item.title}</div>
                                        <div className="text-muted smallest">Qty: {item.quantity} x ${item.price}</div>
                                    </div>
                                    <div className="fw-bold ms-3">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-auto pt-3">
                            <span className="fs-5 fw-bold">Total Amount:</span>
                            <span className="fs-5 fw-bold text-primary">${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="text-muted small mt-4 text-center">
                            <i className="bi bi-shield-check me-2"></i>Secure checkout guaranteed by ReactStore
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
