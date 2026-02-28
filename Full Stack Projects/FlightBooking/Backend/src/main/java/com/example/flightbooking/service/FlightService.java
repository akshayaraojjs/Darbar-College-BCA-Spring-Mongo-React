package com.example.flightbooking.service;

import com.example.flightbooking.exception.DuplicateResourceException;
import com.example.flightbooking.exception.ResourceNotFoundException;
import com.example.flightbooking.model.Flight;
import com.example.flightbooking.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FlightService {
    @Autowired
    private FlightRepository flightRepository;

    public Flight addFlight(Flight flight) {
        if (flightRepository.findByFlightNumber(flight.getFlightNumber()).isPresent()) {
            throw new DuplicateResourceException("Flight " + flight.getFlightNumber() + " already exists");
        }
        flight.setAvailableSeats(flight.getTotalSeats());
        return flightRepository.save(flight);
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight getFlightByNumber(String flightNumber) {
        return flightRepository.findByFlightNumber(flightNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found: " + flightNumber));
    }

    public Flight updateAvailableSeats(String id, int change) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with id: " + id));
        flight.setAvailableSeats(flight.getAvailableSeats() + change);
        return flightRepository.save(flight);
    }
}
