import React, { useRef, useState } from 'react';

const RefExample = () => {
    const inputRef = useRef(null);
    const [submittedValue, setSubmittedValue] = useState('');

    const handleFocus = () => {
        // Accessing the DOM element directly via ref
        inputRef.current.focus();
        inputRef.current.classList.add('border-primary', 'shadow-sm');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedValue(inputRef.current.value);
    };

    return (
        <div className="card shadow-sm border-0 mb-4 h-100">
            <div className="card-body p-4">
                <h3 className="card-title fw-bold mb-4 text-center">
                    <i className="bi bi-cursor-fill me-2 text-success"></i>
                    useRef Demo
                </h3>
                <p className="text-muted small mb-4 text-center">
                    The <code>useRef</code> hook provides a way to persist values between renders without triggering re-renders, and gives direct access to DOM nodes.
                </p>

                <form onSubmit={handleSubmit} className="mb-3">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            ref={inputRef}
                            className="form-control"
                            placeholder="Type something..."
                        />
                        <button className="btn btn-primary" type="submit">
                            Display
                        </button>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-info btn-sm w-100"
                        onClick={handleFocus}
                    >
                        Ref Focus Example
                    </button>
                </form>

                {submittedValue && (
                    <div className="alert alert-info py-2">
                        <strong>Value from Ref:</strong> {submittedValue}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RefExample;
