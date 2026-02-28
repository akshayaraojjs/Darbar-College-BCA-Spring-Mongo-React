import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { flightService, customerService, bookingService } from '../services/api';

const Dashboard = () => {
    const [counts, setCounts] = useState({ flights: 0, customers: 0, bookings: 0 });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [f, c, b] = await Promise.all([
                    flightService.getAll(),
                    customerService.getAll(),
                    bookingService.getAll()
                ]);
                setCounts({
                    flights: f.data.data.length,
                    customers: c.data.data.length,
                    bookings: b.data.data.length
                });
            } catch (err) { console.error(err); }
        };
        fetchCounts();
    }, []);

    const cards = [
        { label: 'Flights', value: counts.flights, icon: 'bi-airplane-engines', color: '#6366f1' },
        { label: 'Customers', value: counts.customers, icon: 'bi-people', color: '#8b5cf6' },
        { label: 'Reservations', value: counts.bookings, icon: 'bi-journal-check', color: '#ec4899' }
    ];

    return (
        <div className="animate-up">
            <header className="mb-5 d-flex align-items-center justify-content-between">
                <div>
                    <h2 className="fw-bold mb-1">Hub Overview</h2>
                    <p className="text-muted small">Real-time status of your flight operations</p>
                </div>
                <div className="d-flex gap-2">
                    <div className="p-2 bg-white rounded shadow-sm text-center" style={{ width: '100px' }}>
                        <h6 className="small text-muted mb-0">Uptime</h6>
                        <span className="fw-bold text-success">99.9%</span>
                    </div>
                </div>
            </header>

            <Row className="g-4 mb-5">
                {cards.map((card, i) => (
                    <Col md={4} key={i}>
                        <Card className="stat-card border-0 h-100">
                            <div className="d-flex align-items-center gap-4">
                                <div className="p-3 rounded-pill bg-light d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
                                    <i className={`bi ${card.icon} fs-3`} style={{ color: card.color }}></i>
                                </div>
                                <div className="text-start">
                                    <h3 className="fw-bold mb-0">{card.value}</h3>
                                    <p className="text-muted small m-0 text-uppercase tracking-wider">{card.label}</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Col lg={12}>
                <Card className="stat-card border-0 shadow-lg" style={{ background: 'var(--accent-gradient)', color: 'white' }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h4 className="fw-bold mb-2">Welcome to your Portal!</h4>
                            <p className="mb-0 text-white-50 small">Take complete control over passenger bookings and schedules.</p>
                        </div>
                        <i className="bi bi-rocket-takeoff d-none d-md-block" style={{ fontSize: '5rem', opacity: '0.2' }}></i>
                    </div>
                </Card>
            </Col>
        </div>
    );
};

export default Dashboard;
