import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (cart.length === 0) return (
        <div className="container py-5 text-center">
            <div className="py-5">
                <i className="bi bi-cart-x display-1 text-muted mb-4 d-block"></i>
                <h2 className="fw-bold">Your cart is empty</h2>
                <p className="text-secondary mb-4">You haven't added anything to your cart yet.</p>
                <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5">
                    Start Shopping
                </Link>
            </div>
        </div>
    );

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-5">Shopping Cart</h2>
            <div className="row g-5">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="px-4 py-3 border-0">Product</th>
                                        <th className="py-3 border-0">Price</th>
                                        <th className="py-3 border-0 text-center">Quantity</th>
                                        <th className="py-3 border-0">Subtotal</th>
                                        <th className="px-4 py-3 border-0"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3">
                                                <div className="d-flex align-items-center">
                                                    <img src={item.image} alt={item.title} className="me-3" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                                    <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                                        <div className="fw-bold mb-0">{item.title}</div>
                                                        <span className="text-muted small">{item.category}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3">${item.price}</td>
                                            <td className="py-3">
                                                <div className="input-group input-group-sm mx-auto" style={{ width: '100px' }}>
                                                    <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                                                    <input type="text" className="form-control text-center bg-white shadow-none" value={item.quantity} readOnly />
                                                    <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                            </td>
                                            <td className="py-3 fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                                            <td className="px-4 py-3 text-end">
                                                <button className="btn btn-link text-danger p-0" onClick={() => removeFromCart(item.id)}>
                                                    <i className="bi bi-trash3 fs-5"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                        <h5 className="fw-bold mb-4">Order Summary</h5>
                        <div className="d-flex justify-content-between mb-3 text-secondary">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 text-secondary">
                            <span>Shipping</span>
                            <span className="text-success">Free</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-4 fs-4 fw-bold">
                            <span>Total</span>
                            <span className="text-primary">${totalPrice.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold">
                            Proceed to Checkout
                        </Link>
                        <div className="mt-3 text-center">
                            <Link to="/" className="text-secondary small text-decoration-none">
                                <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
