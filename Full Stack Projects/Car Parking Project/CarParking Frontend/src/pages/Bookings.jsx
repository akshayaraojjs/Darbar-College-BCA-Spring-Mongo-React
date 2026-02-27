import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Alert, Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { bookingService, slotService, carService } from '../services/api';

const Bookings = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [cars, setCars] = useState([]);
    const [bookingData, setBookingData] = useState({ carNumber: '', slotId: '' });
    const [exitCarNumber, setExitCarNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    // Receipt Modal State
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const [slotsRes, carsRes] = await Promise.all([
                slotService.getAvailableSlots(),
                carService.getAllCars()
            ]);
            setAvailableSlots(slotsRes.data || []);
            setCars(carsRes.data || []);
        } catch (err) {
            console.error("Error loading data", err);
            setStatusMsg({ type: 'danger', text: "Failed to load vehicle or slot data." });
        } finally {
            setInitialLoading(false);
        }
    };

    const handleEntry = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMsg({ type: '', text: '' });
        try {
            await bookingService.registerEntry(bookingData);
            setStatusMsg({ type: 'success', text: `Check-in successful! Car ${bookingData.carNumber} is now parked.` });
            setBookingData({ carNumber: '', slotId: '' });
            await loadInitialData();
        } catch (err) {
            setStatusMsg({ type: 'danger', text: err.response?.data?.message || "Error processing entry. Car might already be parked." });
        } finally {
            setLoading(false);
        }
    };

    const handleExit = async (e) => {
        e.preventDefault();
        if (!exitCarNumber) return;
        setLoading(true);
        setStatusMsg({ type: '', text: '' });
        try {
            const res = await bookingService.registerExit(exitCarNumber);
            setReceiptData(res.data);
            setShowReceipt(true);
            setExitCarNumber('');
            await loadInitialData();
        } catch (err) {
            setStatusMsg({ type: 'danger', text: err.response?.data?.message || "Error processing exit. Ensure car number is correct and has an active booking." });
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h2 className="fw-bold mb-4">Parking Operations</h2>

            {statusMsg.text && (
                <Alert variant={statusMsg.type} className="border-0 glass-card text-white mb-4 py-3 dismissible" onClose={() => setStatusMsg({ type: '', text: '' })} dismissible>
                    {statusMsg.text}
                </Alert>
            )}

            <Row className="g-4">
                {/* Check-In Column */}
                <Col md={6}>
                    <Card className="glass-card p-4 h-100 border-0">
                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                                <i className="bi bi-box-arrow-in-right text-primary fs-3"></i>
                            </div>
                            <div className='text-light'>
                                <h4 className="fw-bold mb-0">Vehicle Check-In</h4>
                                <p className="text-light small mb-0">Assign a vehicle to an available slot</p>
                            </div>
                        </div>

                        <Form onSubmit={handleEntry}>
                            <Form.Group className="mb-4">
                                <Form.Label className="text-light small fw-bold text-uppercase">Select Vehicle</Form.Label>
                                <Form.Select
                                    className="bg-white bg-opacity-10 border-white border-opacity-10 text-white shadow-none"
                                    value={bookingData.carNumber}
                                    onChange={e => setBookingData({ ...bookingData, carNumber: e.target.value })}
                                    required
                                >
                                    <option value="" className="bg-dark">Choose vehicle...</option>
                                    {cars.map(car => (
                                        <option key={car.id} value={car.carNumber} className="bg-dark">
                                            {car.carNumber} ({car.ownerName})
                                        </option>
                                    ))}
                                </Form.Select>
                                {cars.length === 0 && (
                                    <Form.Text className="text-info mt-2 d-block">
                                        <i className="bi bi-info-circle me-1"></i>
                                        No vehicles registered. <Link to="/cars" className="text-primary text-decoration-none">Register one here</Link>.
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-light small fw-bold text-uppercase">Select Available Slot</Form.Label>
                                <Form.Select
                                    className="bg-white bg-opacity-10 border-white border-opacity-10 text-white shadow-none"
                                    value={bookingData.slotId}
                                    onChange={e => setBookingData({ ...bookingData, slotId: e.target.value })}
                                    required
                                >
                                    <option value="" className="bg-dark">Select a spot...</option>
                                    {availableSlots.map(slot => (
                                        <option key={slot.id} value={slot.id} className="bg-dark">
                                            {slot.slotNumber} - {slot.type} (${slot.hourlyRate}/hr)
                                        </option>
                                    ))}
                                </Form.Select>
                                {availableSlots.length === 0 && (
                                    <Form.Text className="text-warning mt-2 d-block">
                                        <i className="bi bi-exclamation-triangle me-1"></i>
                                        No slots available! <Link to="/slots" className="text-primary text-decoration-none">Add more slots</Link>.
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <button type="submit" className="btn-primary-custom w-100 py-3" disabled={loading || availableSlots.length === 0 || cars.length === 0}>
                                {loading ? 'Processing...' : 'Complete Entry'}
                            </button>
                        </Form>
                    </Card>
                </Col>

                {/* Check-Out Column */}
                <Col md={6}>
                    <Card className="glass-card p-4 h-100 border-0">
                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-danger bg-opacity-10 p-3 rounded-3 me-3">
                                <i className="bi bi-box-arrow-left text-danger fs-3"></i>
                            </div>
                            <div className='text-light'>
                                <h4 className="fw-bold mb-0">Vehicle Check-Out</h4>
                                <p className="text-light small mb-0">Calculate fees and free parking spot</p>
                            </div>
                        </div>

                        <Form onSubmit={handleExit}>
                            <Form.Group className="mb-4">
                                <Form.Label className="text-light small fw-bold text-uppercase">Enter Car Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. KA-01-HH-1234"
                                    className="bg-white bg-opacity-10 border-white border-opacity-10 text-white py-3 fs-5"
                                    value={exitCarNumber}
                                    onChange={e => setExitCarNumber(e.target.value.toUpperCase())}
                                    required
                                />
                                <Form.Text className="text-light">Enter the registered license plate number to proceed with payment.</Form.Text>
                            </Form.Group>

                            <button type="submit" className="btn btn-outline-danger w-100 py-3 fw-bold border-2 rounded-3" disabled={loading}>
                                {loading ? 'Computing...' : 'Process Exit & Payment'}
                            </button>
                        </Form>

                        <div className="mt-5 p-3 rounded-4 bg-white bg-opacity-5 border border-white border-opacity-10">
                            <h6 className="fw-bold text-danger small text-uppercase mb-2">Recent Checkout Policy</h6>
                            <ul className="small text-dark ps-3 mb-0">
                                <li>Ensure total fee is collected before vehicle release.</li>
                                <li>Receipt will be generated automatically upon success.</li>
                                <li>Slot will be marked as available immediately.</li>
                            </ul>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Receipt Modal */}
            <Modal show={showReceipt} onHide={() => setShowReceipt(false)} centered contentClassName="glass-card text-white border-0">
                <Modal.Body className="p-5 text-center">
                    <div className="bg-success bg-opacity-20 rounded-circle d-inline-block p-3 mb-4">
                        <i className="bi bi-check2-circle text-success fs-1"></i>
                    </div>
                    <h3 className="fw-bold mb-1">Check-out Complete</h3>
                    <p className="text-light mb-4">Payment processed successfully</p>

                    <div className="text-start bg-white bg-opacity-5 p-4 rounded-4 mb-4 border border-white border-opacity-10">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-light">Vehicle:</span>
                            <span className="fw-bold">{receiptData?.carNumber}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-light">Slot:</span>
                            <span className="fw-bold">{receiptData?.slotNumber}</span>
                        </div>
                        <hr className="border-white border-opacity-10" />
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-light">In Time:</span>
                            <span className="small">{receiptData?.entryTime ? new Date(receiptData.entryTime).toLocaleString() : 'N/A'}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-light">Out Time:</span>
                            <span className="small">{receiptData?.exitTime ? new Date(receiptData.exitTime).toLocaleString() : 'N/A'}</span>
                        </div>
                        <hr className="border-white border-opacity-10" />
                        <div className="d-flex justify-content-between">
                            <span className="fs-5 fw-bold">Total Fee:</span>
                            <span className="fs-5 fw-bold text-success">${receiptData?.totalFee?.toFixed(2) || '0.00'}</span>
                        </div>
                    </div>

                    <button className="btn-primary-custom w-100" onClick={() => setShowReceipt(false)}>
                        Dismiss & Done
                    </button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Bookings;
