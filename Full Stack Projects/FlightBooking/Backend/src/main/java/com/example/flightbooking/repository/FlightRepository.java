package com.example.flightbooking.repository;

import com.example.flightbooking.model.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface FlightRepository extends MongoRepository<Flight, String> {
    Optional<Flight> findByFlightNumber(String flightNumber);
}
