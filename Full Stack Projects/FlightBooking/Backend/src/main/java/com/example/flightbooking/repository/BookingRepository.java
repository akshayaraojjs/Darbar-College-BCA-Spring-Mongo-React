package com.example.flightbooking.repository;

import com.example.flightbooking.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByCustomerId(String customerId);

    List<Booking> findByFlightId(String flightId);
}
