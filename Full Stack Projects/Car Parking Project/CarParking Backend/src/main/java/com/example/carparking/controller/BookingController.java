package com.example.carparking.controller;

import com.example.carparking.dto.BookingRequest;
import com.example.carparking.dto.BookingResponse;
import com.example.carparking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/entry")
    public ResponseEntity<BookingResponse> bookSlot(@RequestBody BookingRequest request) {
        return ResponseEntity.ok(bookingService.bookSlot(request));
    }

    @PostMapping("/exit/{carNumber}")
    public ResponseEntity<BookingResponse> exitParking(@PathVariable String carNumber) {
        return ResponseEntity.ok(bookingService.exitParking(carNumber));
    }
}
