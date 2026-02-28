package com.example.flightbooking.controller;

import com.example.flightbooking.dto.ApiResponse;
import com.example.flightbooking.dto.BookingRequest;
import com.example.flightbooking.model.Booking;
import com.example.flightbooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<ApiResponse<Booking>> book(@Valid @RequestBody BookingRequest request) {
        Booking booking = bookingService.bookFlight(request);
        return ResponseEntity.ok(ApiResponse.success("Flight booked successfully", booking));
    }

    @PostMapping("/cancel/{bookingId}")
    public ResponseEntity<ApiResponse<Booking>> cancel(@PathVariable String bookingId) {
        Booking cancelled = bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", cancelled));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Booking>>> getAll() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(ApiResponse.success("Fetched all bookings", bookings));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ApiResponse<List<Booking>>> getByCustomer(@PathVariable String customerId) {
        List<Booking> bookings = bookingService.getBookingsByCustomer(customerId);
        return ResponseEntity.ok(ApiResponse.success("Fetched customer bookings", bookings));
    }

    @GetMapping("/stats/{flightId}")
    public ResponseEntity<ApiResponse<List<Booking>>> getStats(@PathVariable String flightId) {
        List<Booking> bookings = bookingService.getBookingsByFlight(flightId);
        return ResponseEntity.ok(ApiResponse.success("Fetched flight booking details", bookings));
    }
}