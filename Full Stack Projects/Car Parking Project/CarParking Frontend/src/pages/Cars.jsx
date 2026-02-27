import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card, Spinner, Row, Col } from 'react-bootstrap';
import { carService } from '../services/api';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ carNumber: '', ownerName: '', color: '', model: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const res = await carService.getAllCars();
            setCars(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setInitialLoading(false);
        }
    };

    const handleOpenModal = (car = null) => {
        if (car) {
            setIsEditing(true);
            setEditingId(car.id);
            setFormData({
                carNumber: car.carNumber,
                ownerName: car.ownerName,
                color: car.color,
                model: car.model
            });
        } else {
            setIsEditing(false);
            setEditingId(null);
            setFormData({ carNumber: '', ownerName: '', color: '', model: '' });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                await carService.updateCar(editingId, formData);
            } else {
                await carService.addCar(formData);
            }
            setShowModal(false);
            setFormData({ carNumber: '', ownerName: '', color: '', model: '' });
            fetchCars();
        } catch (err) {
            alert("Error saving car: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) {
            try {
                await carService.deleteCar(id);
                fetchCars();
            } catch (err) {
                alert("Error deleting car");
            }
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className='text-light'>
                    <h2 className="fw-bold mb-0">Vehicle Registry</h2>
                    <p className="text-light small mb-0">Total <span className="text-primary fw-bold">{cars.length}</span> registered vehicles</p>
                </div>
                <button className="btn-primary-custom" onClick={() => handleOpenModal()}>
                    <i className="bi bi-plus-lg me-2"></i> Register New Vehicle
                </button>
            </div>

            <Card className="glass-card overflow-hidden border-0">
                <Table responsive className="table-custom mb-0 align-middle">
                    <thead>
                        <tr>
                            <th><i className="bi bi-hash me-2 text-primary"></i>Car Number</th>
                            <th><i className="bi bi-person me-2 text-primary"></i>Owner</th>
                            <th><i className="bi bi-car-front me-2 text-primary"></i>Model</th>
                            <th><i className="bi bi-palette me-2 text-primary"></i>Color</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.length > 0 ? cars.map(car => (
                            <tr key={car.id}>
                                <td className="fw-bold"><span className="text-primary">#</span> {car.carNumber}</td>
                                <td className="text-dark">{car.ownerName}</td>
                                <td className="text-dark">{car.model}</td>
                                <td>
                                    <span className="badge rounded-pill fw-normal" style={{
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        border: `1px solid ${car.color.toLowerCase() === 'white' ? 'white' : car.color}`,
                                        color: car.color.toLowerCase() === 'white' ? 'white' : car.color
                                    }}>
                                        <i className="bi bi-circle-fill me-2" style={{ color: car.color }}></i>
                                        {car.color}
                                    </span>
                                </td>
                                <td className="text-end">
                                    <Button variant="link" className="text-info p-0 me-3 fs-5" title="Edit Vehicle" onClick={() => handleOpenModal(car)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="link" className="text-danger p-0 fs-5" title="Delete Vehicle" onClick={() => handleDelete(car.id)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center py-5 text-light">
                                    <i className="bi bi-inbox fs-1 d-block mb-3 opacity-25"></i>
                                    No vehicles registered yet. Click "Register New Vehicle" to begin.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="glass-card text-white border-0">
                <Modal.Header closeButton closeVariant="white" className="border-bottom border-white border-opacity-10">
                    <Modal.Title className="fw-bold">
                        {isEditing ? 'Update Vehicle Details' : 'Register Vehicle'}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="p-4">
                        <Form.Group className="mb-3">
                            <Form.Label className="text-light small fw-bold text-uppercase">Car Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. KA-01-HH-1234"
                                className="bg-white bg-opacity-10 border-white border-opacity-10 text-white"
                                value={formData.carNumber}
                                onChange={e => setFormData({ ...formData, carNumber: e.target.value.toUpperCase() })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-light small fw-bold text-uppercase">Owner Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter full name"
                                className="bg-white bg-opacity-10 border-white border-opacity-10 text-white"
                                value={formData.ownerName}
                                onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-light small fw-bold text-uppercase">Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Toyota"
                                        className="bg-white bg-opacity-10 border-white border-opacity-10 text-white"
                                        value={formData.model}
                                        onChange={e => setFormData({ ...formData, model: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-light small fw-bold text-uppercase">Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Black"
                                        className="bg-white bg-opacity-10 border-white border-opacity-10 text-white"
                                        value={formData.color}
                                        onChange={e => setFormData({ ...formData, color: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="border-top border-white border-opacity-10 p-4">
                        <Button variant="link" className="text-light" onClick={() => setShowModal(false)}>Cancel</Button>
                        <button type="submit" className="btn-primary-custom" disabled={loading}>
                            {loading ? 'Saving...' : (isEditing ? 'Update Vehicle' : 'Register Vehicle')}
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default Cars;
