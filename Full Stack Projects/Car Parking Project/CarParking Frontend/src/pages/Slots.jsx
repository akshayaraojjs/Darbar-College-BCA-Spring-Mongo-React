import { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Modal, Form, Button } from 'react-bootstrap';
import { slotService } from '../services/api';

const Slots = () => {
    const [slots, setSlots] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ slotNumber: '', type: 'CAR_SMALL', hourlyRate: 40.0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const res = await slotService.getAvailableSlots();
            setSlots(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await slotService.addSlot(formData);
            setShowModal(false);
            setFormData({ slotNumber: '', type: 'CAR_SMALL', hourlyRate: 40.0 });
            fetchSlots();
        } catch (err) {
            alert("Error adding slot");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Parking Slots</h2>
                <button className="btn-primary-custom" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus-lg me-2"></i> Add New Slot
                </button>
            </div>

            <Row className="g-4">
                {slots.length > 0 ? slots.map(slot => (
                    <Col md={3} key={slot.id}>
                        <Card className="glass-card h-100 border-0 p-3">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <Badge bg="success" className="px-3 py-2 rounded-3">AVAILABLE</Badge>
                                <span className="text-light small">ID: {slot.id?.substring(0, 8)}...</span>
                            </div>
                            <h3 className="fw-bold text-white mb-2">{slot.slotNumber}</h3>
                            <div className="d-flex flex-column gap-2">
                                <span className="text-light small">
                                    <i className="bi bi-box me-2 text-primary"></i>
                                    {slot.type.replace('_', ' ')}
                                </span>
                                <span className="text-light small">
                                    <i className="bi bi-cash-stack me-2 text-success"></i>
                                    ${slot.hourlyRate}/hour
                                </span>
                            </div>
                        </Card>
                    </Col>
                )) : (
                    <Col xs={12}>
                        <div className="glass-card p-5 text-center text-light">
                            <i className="bi bi-building fs-1 d-block mb-3"></i>
                            <p>No slots found or all slots are occupied. Check Bookings for active sessions.</p>
                        </div>
                    </Col>
                )}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="glass-card text-white border-0">
                <Modal.Header closeButton closeVariant="white" className="border-bottom border-white border-opacity-10">
                    <Modal.Title className="fw-bold">Add Parking Slot</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="p-4">
                        <Form.Group className="mb-4">
                            <Form.Label className="text-light small fw-bold text-uppercase">Slot Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. A-101"
                                className="bg-white bg-opacity-10 border-white border-opacity-10 text-white"
                                value={formData.slotNumber}
                                onChange={e => setFormData({ ...formData, slotNumber: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="text-light small fw-bold text-uppercase">Vehicle Type</Form.Label>
                            <Form.Select
                                className="bg-white bg-opacity-10 border-white border-opacity-10 text-white shadow-none"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                            >
                                <option value="CAR_SMALL" className="bg-dark">Small Car</option>
                                <option value="CAR_MEDIUM" className="bg-dark">Medium Car</option>
                                <option value="CAR_LARGE" className="bg-dark">Large Car / SUV</option>
                                <option value="BIKE" className="bg-dark">Motorcycle</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-0">
                            <Form.Label className="text-light small fw-bold text-uppercase">Hourly Rate ($)</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                className="bg-white bg-opacity-10 border-white border-opacity-10 text-white"
                                value={formData.hourlyRate}
                                onChange={e => setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="border-top border-white border-opacity-10 p-4">
                        <Button variant="link" className="text-light" onClick={() => setShowModal(false)}>Cancel</Button>
                        <button type="submit" className="btn-primary-custom" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Slot'}
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default Slots;
