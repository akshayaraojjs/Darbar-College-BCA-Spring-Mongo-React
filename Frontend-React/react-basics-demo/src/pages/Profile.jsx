import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Profile = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Get person data from state (passed via Link)
    const person = location.state?.person;

    if (!person) {
        return (
            <div className="container py-5 mt-5 text-center">
                <h2 className="display-4 fw-bold">Profile Not Found</h2>
                <p className="lead text-muted">The requested profile data is unavailable.</p>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/people')}>
                    Back to Directory
                </button>
            </div>
        );
    }

    const breadcrumbPaths = [
        { name: 'Directory', url: '/people' },
        { name: person.name, url: `/profile/${id}` }
    ];

    return (
        <div className="container py-5 mt-4">
            <Breadcrumbs paths={breadcrumbPaths} />

            <div className="row g-4">
                {/* Left Column - Profile Card */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="bg-primary py-5 text-center position-relative">
                            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-n5">
                                <img
                                    src={person.avatar}
                                    className="rounded-circle border border-5 border-white shadow-lg"
                                    alt={person.name}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <div className="card-body pt-5 mt-4 text-center">
                            <h3 className="fw-bold mb-1">{person.name}</h3>
                            <p className="text-primary fw-semibold mb-3">{person.qualification}</p>
                            <div className="d-flex justify-content-center gap-2 mb-4">
                                <button className="btn btn-primary btn-sm rounded-pill px-4 shadow-sm">Follow</button>
                                <button className="btn btn-outline-secondary btn-sm rounded-pill px-4 shadow-sm">Message</button>
                            </div>
                            <hr className="opacity-10" />
                            <div className="text-start px-2">
                                <div className="mb-3 d-flex align-items-center">
                                    <div className="bg-light rounded-circle p-2 me-3">
                                        <i className="bi bi-building text-primary"></i>
                                    </div>
                                    <div>
                                        <div className="small text-muted">Company</div>
                                        <div className="fw-bold">{person.company}</div>
                                    </div>
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <div className="bg-light rounded-circle p-2 me-3">
                                        <i className="bi bi-globe text-primary"></i>
                                    </div>
                                    <div>
                                        <div className="small text-muted">Website</div>
                                        <div className="fw-bold text-truncate" style={{ maxWidth: '150px' }}>{person.website.replace('https://', '')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold mb-0">Biography</h4>
                            <span className="badge bg-success-subtle text-success border border-success-subtle">Verified Account</span>
                        </div>
                        <p className="text-secondary lh-lg mb-0">{person.bio}</p>
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h4 className="fw-bold mb-4">Contact Information</h4>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3 h-100 border border-opacity-10">
                                    <div className="small text-muted mb-1">Email Address</div>
                                    <div className="fw-bold text-dark">{person.email}</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3 h-100 border border-opacity-10">
                                    <div className="small text-muted mb-1">Phone Number</div>
                                    <div className="fw-bold text-dark">{person.phone}</div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="p-3 bg-light rounded-3 border border-opacity-10">
                                    <div className="small text-muted mb-1">Mailing Address</div>
                                    <div className="fw-bold text-dark">
                                        <i className="bi bi-geo-alt me-2 text-primary"></i>
                                        {person.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-end">
                        <button className="btn btn-link text-decoration-none text-muted p-0" onClick={() => navigate('/people')}>
                            <i className="bi bi-arrow-left me-2"></i>Close and Return to Directory
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
