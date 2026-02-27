import React, { useState, useMemo, useEffect } from 'react';
import { fakerEN_IN as faker } from '@faker-js/faker';
import { Link, useLocation } from 'react-router-dom';

// Function to generate fake Indian people data
const generatePeople = (count) => {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
        qualification: faker.helpers.arrayElement(['B.Tech', 'M.Tech', 'MBA', 'PhD', 'BCA', 'MCA', 'B.Sc', 'M.Sc']),
        address: `${faker.location.city()}, ${faker.location.state()}`,
        avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`, // Using stable avatars for better UX
        bio: faker.lorem.paragraph(),
        company: faker.company.name(),
        website: faker.internet.url().toLowerCase()
    }));
};

const People = () => {
    const [dataCount, setDataCount] = useState(20);
    const [peopleData, setPeopleData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Initialize and handle data regeneration
    useEffect(() => {
        setPeopleData(generatePeople(dataCount));
        setCurrentPage(1);
    }, [dataCount]);

    // Filter functionality
    const filteredPeople = useMemo(() => {
        return peopleData.filter(person =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.qualification.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, peopleData]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
    const paginatedPeople = filteredPeople.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container py-5 mt-4">
            <div className="row mb-5 align-items-center g-4">
                <div className="col-lg-5">
                    <h2 className="fw-bold mb-1">Indian Talent Directory</h2>
                    <p className="text-secondary mb-0">Browsing {peopleData.length} profiles generated specifically with Indian locales.</p>
                </div>

                <div className="col-lg-3">
                    <div className="d-flex align-items-center bg-white border rounded-3 p-1 shadow-sm">
                        <span className="small text-muted px-2 border-end fw-medium">Load:</span>
                        <select
                            className="form-select border-0 shadow-none py-1"
                            value={dataCount}
                            onChange={(e) => setDataCount(Number(e.target.value))}
                        >
                            {[10, 20, 30, 40, 50].map(val => (
                                <option key={val} value={val}>{val} Profiles</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 py-2"
                            placeholder="Search talent..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3 border-0">Member</th>
                                <th className="py-3 border-0">Contact</th>
                                <th className="py-3 border-0">Qualification</th>
                                <th className="py-3 border-0">Address</th>
                                <th className="px-4 py-3 border-0 text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPeople.length > 0 ? (
                                paginatedPeople.map(person => (
                                    <tr key={person.id}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={person.avatar}
                                                    className="rounded-circle me-3 border border-2 border-primary-subtle"
                                                    alt={person.name}
                                                    style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                                />
                                                <div>
                                                    <div className="fw-bold text-dark">{person.name}</div>
                                                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{person.company}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <div className="text-muted small">
                                                <i className="bi bi-envelope me-2 text-primary"></i>{person.email}
                                            </div>
                                            <div className="text-muted small">
                                                <i className="bi bi-telephone me-2 text-primary"></i>{person.phone}
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
                                                {person.qualification}
                                            </span>
                                        </td>
                                        <td className="py-3 text-muted small">
                                            <i className="bi bi-geo-alt me-1"></i>{person.address}
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <Link
                                                to={`/profile/${person.id}`}
                                                state={{ person }}
                                                className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm"
                                            >
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <div className="py-4">
                                            <i className="bi bi-emoji-frown display-4 text-muted mb-3 d-block"></i>
                                            <div className="text-muted">No profiles found matching your criteria.</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="card-footer bg-white border-top-0 px-4 py-3 d-flex justify-content-between align-items-center">
                        <div className="small text-muted fw-medium">
                            Page {currentPage} of {totalPages} ({filteredPeople.length} total)
                        </div>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link shadow-none" onClick={() => setCurrentPage(prev => prev - 1)}>
                                        <i className="bi bi-chevron-left"></i>
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link shadow-none" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link shadow-none" onClick={() => setCurrentPage(prev => prev + 1)}>
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default People;
