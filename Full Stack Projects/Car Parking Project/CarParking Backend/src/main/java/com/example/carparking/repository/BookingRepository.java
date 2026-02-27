package com.example.carparking.repository;

import com.example.carparking.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface BookingRepository extends MongoRepository<Booking, String> {
    Optional<Booking> findByCarNumberAndStatus(String carNumber, String status);
}
