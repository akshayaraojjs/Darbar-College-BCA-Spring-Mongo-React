import { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { slotService, carService } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalSlots: 0,
        availableSlots: 0,
        totalCars: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [slotsRes, carsRes] = await Promise.all([
                    slotService.getAvailableSlots(),
                    carService.getAllCars()
                ]);

                setStats({
                    availableSlots: slotsRes.data?.length || 0,
                    totalCars: carsRes.data?.length || 0,
                    totalSlots: '?'
                });
                setError(null);
            } catch (err) {
                console.error("Error fetching dashboard stats", err);
                setError("Failed to connect to backend server. Please ensure the API is running.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Available Slots', value: stats.availableSlots, icon: 'bi-p-circle', color: 'text-primary' },
        { title: 'Registered Vehicles', value: stats.totalCars, icon: 'bi-car-front-fill', color: 'text-info' },
        { title: 'Active Bookings', value: 'Live', icon: 'bi-clock-history', color: 'text-success' },
    ];

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <header className="mb-5">
                <h1 className="fw-bold mb-2">Parking Dashboard</h1>
                <p className="text-light">Real-time overview of your parking facility</p>
            </header>

            {error && (
                <div className="alert alert-danger glass-card border-0 text-white mb-5 animate-fade-in">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                </div>
            )}

            <Row className="g-4 mb-5">
                {statCards.map((stat, idx) => (
                    <Col md={4} key={idx}>
                        <Card className="glass-card h-100 border-0">
                            <Card.Body className="stats-card">
                                <i className={`bi ${stat.icon} stats-icon ${stat.color}`}></i>
                                <h3 className="fw-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-light mb-0">{stat.title}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="g-4">
                <Col lg={8}>
                    <Card className="glass-card p-4 h-100 border-0">
                        <h4 className="fw-bold text-light mb-4"><i className="bi bi-graph-up me-2 text-primary"></i>Recent Activity</h4>
                        <div className="text-center py-5 text-light">
                            <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                            <p>Activity logs will appear here once you start processing bookings.</p>
                        </div>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="glass-card p-4 h-100 border-0">
                        <h4 className="fw-bold text-light mb-4"><i className="bi bi-lightning-charge me-2 text-warning"></i>Quick Actions</h4>
                        <div className="d-grid gap-3">
                            <button className="btn-primary-custom w-100" onClick={() => navigate('/bookings')}>
                                <i className="bi bi-plus-lg me-2"></i> Register Entry
                            </button>
                            <button className="btn btn-outline-light border-white border-opacity-10 py-2 rounded-3" onClick={() => navigate('/bookings')}>
                                <i className="bi bi-box-arrow-right me-2"></i> Register Exit
                            </button>
                            <button className="btn btn-outline-light border-white border-opacity-10 py-2 rounded-3" onClick={() => navigate('/slots')}>
                                <i className="bi bi-plus-circle me-2"></i> Add New Slot
                            </button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
