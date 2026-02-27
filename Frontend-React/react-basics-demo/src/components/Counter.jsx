import React, { useState } from 'react';

const Counter = () => {
    // useState Hook: [stateValue, updaterFunction] = useState(initialValue)
    const [count, setCount] = useState(0);

    return (
        <div className="card shadow-sm border-0 mb-4 h-100">
            <div className="card-body text-center p-4">
                <h3 className="card-title fw-bold mb-4">
                    <i className="bi bi-plus-slash-minus me-2 text-info"></i>
                    useState Demo
                </h3>
                <p className="text-muted small mb-4">
                    The <code>useState</code> hook allows us to create reactive variables that trigger a re-render when they change.
                </p>

                <div className="display-3 fw-bold text-primary mb-4">{count}</div>

                <div className="d-flex justify-content-center gap-2">
                    <button
                        className="btn btn-outline-danger btn-lg"
                        onClick={() => setCount(prev => prev - 1)}
                    >
                        <i className="bi bi-dash-lg"></i>
                    </button>
                    <button
                        className="btn btn-secondary btn-lg"
                        onClick={() => setCount(0)}
                    >
                        Reset
                    </button>
                    <button
                        className="btn btn-outline-success btn-lg"
                        onClick={() => setCount(prev => prev + 1)}
                    >
                        <i className="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Counter;
