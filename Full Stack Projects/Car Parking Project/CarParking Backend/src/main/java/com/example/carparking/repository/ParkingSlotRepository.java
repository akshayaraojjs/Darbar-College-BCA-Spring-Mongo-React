package com.example.carparking.repository;

import com.example.carparking.model.ParkingSlot;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ParkingSlotRepository extends MongoRepository<ParkingSlot, String> {
    List<ParkingSlot> findByAvailable(boolean available);
}
