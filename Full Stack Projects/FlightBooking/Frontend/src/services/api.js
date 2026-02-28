import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const customerService = {
    register: (data) => api.post('/customers/register', data),
    getAll: () => api.get('/customers/all'),
};

export const flightService = {
    add: (data) => api.post('/flights/add', data),
    getAll: () => api.get('/flights/all'),
};

export const bookingService = {
    book: (data) => api.post('/bookings/book', data),
    cancel: (id) => api.post(`/bookings/cancel/${id}`),
    getAll: () => api.get('/bookings/all'),
    getStats: (flightId) => api.get(`/bookings/stats/${flightId}`),
};
