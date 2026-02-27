import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect Hook: Used for side effects like data fetching, subscriptions, or DOM manipulation
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Data fetch failed');
                const data = await response.json();
                setUsers(data.slice(0, 5)); // Just take first 5
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        // Simulate network delay for demo
        const timer = setTimeout(() => {
            fetchUsers();
        }, 1000);

        return () => clearTimeout(timer); // Cleanup function
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="card shadow-sm border-0 mb-4 h-100">
            <div className="card-body p-4">
                <h3 className="card-title fw-bold mb-4 text-center">
                    <i className="bi bi-cloud-download me-2 text-warning"></i>
                    useEffect Demo
                </h3>
                <p className="text-muted small mb-4 text-center">
                    The <code>useEffect</code> hook handles side-effects. Here, we fetch sample user data from an external API.
                </p>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2 text-muted">Fetching data...</p>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                ) : (
                    <ul className="list-group list-group-flush">
                        {users.map(user => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0">
                                <div>
                                    <div className="fw-bold">{user.name}</div>
                                    <div className="text-muted small">{user.email}</div>
                                </div>
                                <span className="badge bg-primary rounded-pill">ID: {user.id}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DataFetcher;
