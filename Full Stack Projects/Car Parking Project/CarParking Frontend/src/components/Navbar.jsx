import { Link, useLocation } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = () => {
    const location = useLocation();

    return (
        <BsNavbar expand="lg" variant="dark" className="navbar-custom sticky-top">
            <Container>
                <BsNavbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center">
                    <i className="bi bi-p-square-fill me-2 fs-3 text-primary"></i>
                    <span>PARK<span className="text-primary">EASE</span></span>
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
                            <i className="bi bi-speedometer2 me-1"></i> Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/bookings" active={location.pathname === '/bookings'}>
                            <i className="bi bi-journal-check me-1"></i> Bookings
                        </Nav.Link>
                        <Nav.Link as={Link} to="/slots" active={location.pathname === '/slots'}>
                            <i className="bi bi-building me-1"></i> Slots
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cars" active={location.pathname === '/cars'}>
                            <i className="bi bi-car-front me-1"></i> Vehicles
                        </Nav.Link>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
