import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card, Spinner, Row, Col, Badge, Alert } from 'react-bootstrap';
import { flightService } from '../services/api';

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ flightNumber: '', origin: '', destination: '', departureTime: '', totalSeats: 100, price: 0 });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const res = await flightService.getAll();
            setFlights(res.data.data || []);
        } catch (err) { console.error(err); }
        finally { setInitialLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await flightService.add(formData);
            setShowModal(false);
            setFormData({ flightNumber: '', origin: '', destination: '', departureTime: '', totalSeats: 100, price: 0 });
            fetchFlights();
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
                    <h2 className="fw-bold mb-1">Flight Schedules</h2>
                    <p className="text-muted small">Route journey and inventory management</p>
                </div>
                <button className="btn-brand" onClick={() => setShowModal(true)}>
                    <i className="bi bi-calendar-plus-fill me-2"></i> ADD FLIGHT
                </button>
            </div>

            <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '25px' }}>
                <Table responsive className="table-brand mb-0 align-middle">
                    <thead>
                        <tr>
                            <th>FLIGHT NO</th>
                            <th>ROUTE</th>
                            <th>DEPARTURE</th>
                            <th>CAPACITY</th>
                            <th>PRICING</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.length > 0 ? flights.map(flight => (
                            <tr key={flight.id}>
                                <td className="fw-bold text-accent" style={{ color: 'var(--accent-color)' }}>{flight.flightNumber}</td>
                                <td>
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fw-bold fs-6 text-dark">{flight.origin}</span>
                                        <i className="bi bi-airplane-engines text-accent mx-2" style={{ color: '#a855f7' }}></i>
                                        <span className="fw-bold fs-6 text-dark">{flight.destination}</span>
                                    </div>
                                </td>
                                <td className="small text-muted">
                                    {new Date(flight.departureTime).toLocaleString()}
                                </td>
                                <td>
                                    <span className="px-3 py-2 rounded-pill fw-bold" style={{ background: '#f1f5f9', color: '#64748b', fontSize: '0.75rem' }}>
                                        {flight.availableSeats} of {flight.totalSeats} seats
                                    </span>
                                </td>
                                <td className="fw-bold text-dark fs-6">${flight.price.toFixed(2)}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center py-5 text-muted">Empty schedule records.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="border-0 shadow-lg" style={{ borderRadius: '30px' }}>
                <Modal.Header closeButton className="p-4 border-light">
                    <Modal.Title className="fw-bold px-2">Schedule New Route</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="p-4 bg-light overflow-hidden" style={{ borderRadius: '0 0 30px 30px' }}>
                        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">Flight Serial</Form.Label>
                            <Form.Control
                                type="text" placeholder="e.g. SKY-HUB-101" className="form-input-brand shadow-none"
                                value={formData.flightNumber} onChange={e => setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() })}
                                required
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Departure Point</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="e.g. Bangalore" className="form-input-brand shadow-none"
                                        value={formData.origin} onChange={e => setFormData({ ...formData, origin: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Arrival Point</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="e.g. Dubai" className="form-input-brand shadow-none"
                                        value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">When will it Takeoff?</Form.Label>
                            <Form.Control
                                type="datetime-local" className="form-input-brand shadow-none"
                                value={formData.departureTime} onChange={e => setFormData({ ...formData, departureTime: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Seat Capacity</Form.Label>
                                    <Form.Control
                                        type="number" className="form-input-brand shadow-none"
                                        value={formData.totalSeats} onChange={e => setFormData({ ...formData, totalSeats: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Fares ($)</Form.Label>
                                    <Form.Control
                                        type="number" step="0.01" className="form-input-brand shadow-none"
                                        value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="text-end mt-4">
                            <Button variant="link" className="text-muted text-decoration-none me-3" onClick={() => setShowModal(false)}>CANCEL</Button>
                            <button type="submit" className="btn-brand" disabled={loading}>
                                {loading ? 'SAVING...' : 'CONFIRM ROUTE'}
                            </button>
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
        </div>
    );
};

export default Flights;
