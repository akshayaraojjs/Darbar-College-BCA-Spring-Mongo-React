package com.example.flightbooking.service;

import com.example.flightbooking.dto.BookingRequest;
import com.example.flightbooking.exception.InsufficientSeatsException;
import com.example.flightbooking.exception.ResourceNotFoundException;
import com.example.flightbooking.model.Booking;
import com.example.flightbooking.model.Customer;
import com.example.flightbooking.model.Flight;
import com.example.flightbooking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private FlightService flightService;
    @Autowired
    private CustomerService customerService;

    public Booking bookFlight(BookingRequest request) {
        Customer customer = customerService.getCustomerById(request.getCustomerId());
        Flight flight = flightService.getFlightByNumber(request.getFlightNumber());

        if (flight.getAvailableSeats() <= 0) {
            throw new InsufficientSeatsException("No seats available for flight: " + flight.getFlightNumber());
        }

        // Calculate seat number
        int seatNum = flight.getTotalSeats() - flight.getAvailableSeats() + 1;

        // Create booking
        Booking booking = new Booking();
        booking.setCustomerId(customer.getId());
        booking.setFlightId(flight.getId());
        booking.setFlightNumber(flight.getFlightNumber());
        booking.setSeatNumber("S-" + seatNum);
        booking.setBookingTime(LocalDateTime.now());
        booking.setStatus("CONFIRMED");
        booking.setTotalAmount(flight.getPrice());
        booking.setPassengerName(request.getPassengerName());

        // Update seats
        flightService.updateAvailableSeats(flight.getId(), -1);

        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));

        if ("CANCELLED".equals(booking.getStatus())) {
            throw new RuntimeException("Booking is already cancelled");
        }

        booking.setStatus("CANCELLED");
        // Free seat
        flightService.updateAvailableSeats(booking.getFlightId(), 1);

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByCustomer(String customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    public List<Booking> getBookingsByFlight(String flightId) {
        return bookingRepository.findByFlightId(flightId);
    }
}
