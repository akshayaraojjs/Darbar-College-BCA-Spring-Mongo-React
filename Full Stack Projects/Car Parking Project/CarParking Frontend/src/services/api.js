import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const carService = {
    getAllCars: () => api.get('/cars'),
    getCarById: (id) => api.get(`/cars/${id}`),
    addCar: (car) => api.post('/cars', car),
    updateCar: (id, car) => api.put(`/cars/${id}`, car),
    deleteCar: (id) => api.delete(`/cars/${id}`),
};

export const slotService = {
    addSlot: (slot) => api.post('/slots/add', slot),
    getAvailableSlots: () => api.get('/slots/available'),
};

export const bookingService = {
    registerEntry: (bookingData) => api.post('/bookings/entry', bookingData),
    registerExit: (carNumber) => api.post(`/bookings/exit/${carNumber}`),
};

export default api;
