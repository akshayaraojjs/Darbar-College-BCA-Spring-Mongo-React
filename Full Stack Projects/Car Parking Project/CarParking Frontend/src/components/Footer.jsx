import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="py-4 mt-auto border-top border-white border-opacity-10">
            <Container>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="mb-3 mb-md-0">
                        <span className="text-muted small">© 2026 ParkEase System. Developed with modern React & Bootstrap.</span>
                    </div>
                    <div className="d-flex gap-3">
                        <a href="#" className="text-muted"><i className="bi bi-github"></i></a>
                        <a href="#" className="text-muted"><i className="bi bi-twitter-x"></i></a>
                        <a href="#" className="text-muted"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
