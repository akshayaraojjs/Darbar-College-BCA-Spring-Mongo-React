package com.example.carparking.controller;

import com.example.carparking.dto.ParkingSlotRequest;
import com.example.carparking.dto.ParkingSlotResponse;
import com.example.carparking.service.ParkingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "*")
public class ParkingSlotController {

    @Autowired
    private ParkingSlotService parkingSlotService;

    @PostMapping("/add")
    public ResponseEntity<ParkingSlotResponse> addSlot(@RequestBody ParkingSlotRequest request) {
        return ResponseEntity.ok(parkingSlotService.addSlot(request));
    }

    @GetMapping("/available")
    public ResponseEntity<List<ParkingSlotResponse>> getAvailableSlots() {
        return ResponseEntity.ok(parkingSlotService.getAllAvailableSlots());
    }
}
