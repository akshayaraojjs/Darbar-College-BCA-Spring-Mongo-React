package com.example.flightbooking.controller;

import com.example.flightbooking.dto.ApiResponse;
import com.example.flightbooking.model.Flight;
import com.example.flightbooking.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*")
public class FlightController {
    @Autowired
    private FlightService flightService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Flight>> add(@Valid @RequestBody Flight flight) {
        Flight saved = flightService.addFlight(flight);
        return ResponseEntity.ok(ApiResponse.success("Flight added successfully", saved));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Flight>>> getAll() {
        List<Flight> flights = flightService.getAllFlights();
        return ResponseEntity.ok(ApiResponse.success("Fetched all flights", flights));
    }

    @GetMapping("/{flightNumber}")
    public ResponseEntity<ApiResponse<Flight>> getByNumber(@PathVariable String flightNumber) {
        Flight flight = flightService.getFlightByNumber(flightNumber);
        return ResponseEntity.ok(ApiResponse.success("Fetched flight successfully", flight));
    }
}