import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card, Spinner, Row, Col, Alert } from 'react-bootstrap';
import { customerService } from '../services/api';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await customerService.getAll();
            setCustomers(res.data.data || []);
        } catch (err) { console.error(err); }
        finally { setInitialLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await customerService.register(formData);
            setShowModal(false);
            setFormData({ name: '', email: '', phone: '' });
            fetchCustomers();
        } catch (err) { setError(err.response?.data?.message || err.message); }
        finally { setLoading(false); }
    };

    if (initialLoading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    );

    return (
        <div className="animate-up">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="fw-bold mb-1">Customer Directory</h2>
                    <p className="text-muted small">Registered passenger accounts and profile management</p>
                </div>
                <button className="btn-brand" onClick={() => setShowModal(true)}>
                    <i className="bi bi-person-plus-fill me-2"></i> NEW PASSENGER
                </button>
            </div>

            <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '25px' }}>
                <Table responsive className="table-brand mb-0 align-middle">
                    <thead>
                        <tr>
                            <th>IDENTIFIER</th>
                            <th>NAME/FULL PROFILE</th>
                            <th>EMAIL ACCESS</th>
                            <th>CONTACT NO.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? customers.map(customer => (
                            <tr key={customer.id}>
                                <td className="small text-muted font-monospace">{customer.id.substring(0, 8)}</td>
                                <td className="fw-bold fs-6 text-dark">{customer.name}</td>
                                <td className="text-muted">{customer.email}</td>
                                <td>{customer.phone}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-muted">Zero accounts found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="border-0 shadow-lg" style={{ borderRadius: '30px' }}>
                <Modal.Header closeButton className="p-4 border-light">
                    <Modal.Title className="fw-bold px-2">Register Identity</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="p-4 bg-light overflow-hidden" style={{ borderRadius: '0 0 30px 30px' }}>
                        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">Full Passenger Name</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter name" className="form-input-brand shadow-none"
                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">Email Identity</Form.Label>
                            <Form.Control
                                type="email" placeholder="e.g. name@example.com" className="form-input-brand shadow-none"
                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">Direct Phone</Form.Label>
                            <Form.Control
                                type="text" placeholder="e.g. +1 555-0123" className="form-input-brand shadow-none"
                                value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <div className="text-end mt-4">
                            <button type="submit" className="btn-brand" disabled={loading}>
                                {loading ? 'SAVING...' : 'REGISTER PROFILE'}
                            </button>
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
        </div>
    );
};

export default Customers;