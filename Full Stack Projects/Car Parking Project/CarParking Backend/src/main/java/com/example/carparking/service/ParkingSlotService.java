package com.example.carparking.service;

import com.example.carparking.dto.ParkingSlotRequest;
import com.example.carparking.dto.ParkingSlotResponse;
import com.example.carparking.model.ParkingSlot;
import com.example.carparking.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParkingSlotService {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    public ParkingSlotResponse addSlot(ParkingSlotRequest request) {
        ParkingSlot slot = new ParkingSlot(
                request.getSlotNumber(),
                true,
                request.getType(),
                request.getHourlyRate());
        ParkingSlot savedSlot = parkingSlotRepository.save(slot);
        return mapToResponse(savedSlot);
    }

    public List<ParkingSlotResponse> getAllAvailableSlots() {
        return parkingSlotRepository.findByAvailable(true)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ParkingSlotResponse mapToResponse(ParkingSlot slot) {
        ParkingSlotResponse response = new ParkingSlotResponse();
        response.setId(slot.getId());
        response.setSlotNumber(slot.getSlotNumber());
        response.setAvailable(slot.isAvailable());
        response.setType(slot.getType());
        response.setHourlyRate(slot.getHourlyRate());
        return response;
    }
}
