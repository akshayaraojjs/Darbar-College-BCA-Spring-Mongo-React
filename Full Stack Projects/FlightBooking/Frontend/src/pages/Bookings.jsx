import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Alert, Table, Badge, Button, Spinner } from 'react-bootstrap';
import { bookingService, flightService, customerService } from '../services/api';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [flights, setFlights] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filters, setFilters] = useState({ flightId: '', customerId: '' });
    const [formData, setFormData] = useState({ customerId: '', flightNumber: '', passengerName: '' });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        refreshData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, bookings]);

    const refreshData = async () => {
        try {
            const [bRes, fRes, cRes] = await Promise.all([
                bookingService.getAll(),
                flightService.getAll(),
                customerService.getAll()
            ]);
            setBookings(bRes.data.data || []);
            setFlights(fRes.data.data || []);
            setCustomers(cRes.data.data || []);
        } catch (err) { console.error(err); }
        finally { setInitialLoading(false); }
    };

    const applyFilters = () => {
        let filtered = [...bookings];
        if (filters.flightId) {
            filtered = filtered.filter(b => b.flightId === filters.flightId);
        }
        if (filters.customerId) {
            filtered = filtered.filter(b => b.customerId === filters.customerId);
        }
        setFilteredBookings(filtered);
    };

    const handleBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await bookingService.book(formData);
            setSuccess("Reservation completed successfully!");
            setFormData({ customerId: '', flightNumber: '', passengerName: '' });
            refreshData();
        } catch (err) { setError(err.response?.data?.message || err.message); }
        finally { setLoading(false); }
    };

    const handleCancel = async (id) => {
        if (window.confirm("Confirm permanent cancellation of this selected record?")) {
            try {
                await bookingService.cancel(id);
                refreshData();
            } catch (err) { alert("Action failed"); }
        }
    };

    if (initialLoading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    );

    return (
        <div className="animate-up">
            <header className="mb-5">
                <h2 className="fw-bold mb-1">Reservation Center</h2>
                <p className="text-muted small">Process bookings and handle seat cancellations</p>
            </header>

            <Row className="g-4">
                <Col lg={4}>
                    <Card className="border-0 shadow-sm p-4" style={{ borderRadius: '25px', position: 'sticky', top: '2rem' }}>
                        <h5 className="fw-bold mb-4">Book New Ticket</h5>
                        <Form onSubmit={handleBook}>
                            {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                            {success && <Alert variant="success" className="py-2 small">{success}</Alert>}

                            <Form.Group className="mb-3">
                                <Form.Label className="text-muted small fw-bold text-uppercase">Associated Account</Form.Label>
                                <Form.Select
                                    className="form-input-brand shadow-none" required
                                    value={formData.customerId} onChange={e => setFormData({ ...formData, customerId: e.target.value })}
                                >
                                    <option value="">Choose Passenger Account</option>
                                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="text-muted small fw-bold text-uppercase">Scheduled Flight</Form.Label>
                                <Form.Select
                                    className="form-input-brand shadow-none" required
                                    value={formData.flightNumber} onChange={e => setFormData({ ...formData, flightNumber: e.target.value })}
                                >
                                    <option value="">Choose Available Route</option>
                                    {flights.map(f => <option key={f.id} value={f.flightNumber}>{f.flightNumber} ({f.origin} to {f.destination})</option>)}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-muted small fw-bold text-uppercase">Direct Traveler Name</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Enter traveler name" className="form-input-brand shadow-none"
                                    value={formData.passengerName} onChange={e => setFormData({ ...formData, passengerName: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <button type="submit" className="btn-brand w-100 py-3" disabled={loading}>
                                {loading ? 'CONFIRMING...' : 'CONFIRM RESERVATION'}
                            </button>
                        </Form>
                    </Card>
                </Col>

                <Col lg={8}>
                    <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '25px' }}>
                        <div className="p-4 bg-white border-bottom">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="fw-bold mb-0">Registry Log</h5>
                                <i className="bi bi-funnel text-muted"></i>
                            </div>
                            <Row className="g-2">
                                <Col md={5}>
                                    <Form.Select
                                        size="sm" className="form-input-brand shadow-none"
                                        value={filters.flightId} onChange={e => setFilters({ ...filters, flightId: e.target.value })}
                                    >
                                        <option value="">All Flights</option>
                                        {flights.map(f => <option key={f.id} value={f.id}>{f.flightNumber} ({f.origin}-{f.destination})</option>)}
                                    </Form.Select>
                                </Col>
                                <Col md={5}>
                                    <Form.Select
                                        size="sm" className="form-input-brand shadow-none"
                                        value={filters.customerId} onChange={e => setFilters({ ...filters, customerId: e.target.value })}
                                    >
                                        <option value="">All Customers</option>
                                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </Form.Select>
                                </Col>
                                <Col md={2}>
                                    <Button variant="outline-secondary" size="sm" className="w-100" onClick={() => setFilters({ flightId: '', customerId: '' })}>
                                        Clear
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <Table responsive className="table-brand mb-0 align-middle">
                            <thead>
                                <tr>
                                    <th>TRAVELER</th>
                                    <th>FLIGHT CODE</th>
                                    <th>SEAT</th>
                                    <th>STATUS</th>
                                    <th>BILLING</th>
                                    <th className="text-end">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.length > 0 ? filteredBookings.map(b => (
                                    <tr key={b.id}>
                                        <td className="fw-bold text-dark">{b.passengerName}</td>
                                        <td className="small text-muted font-monospace">{b.flightNumber}</td>
                                        <td className="fw-bold text-primary">{b.seatNumber || 'TBD'}</td>
                                        <td>
                                            <span className={`status-badge ${b.status === 'CONFIRMED' ? 'badge-confirm' : 'badge-cancel'}`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="text-dark fw-bold">${b.totalAmount}</td>
                                        <td className="text-end">
                                            {b.status === 'CONFIRMED' && (
                                                <Button variant="link" className="text-danger p-0" title="VOID" onClick={() => handleCancel(b.id)}>
                                                    <i className="bi bi-x-circle-fill fs-5"></i>
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted small">No recent reservation records.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Bookings;
