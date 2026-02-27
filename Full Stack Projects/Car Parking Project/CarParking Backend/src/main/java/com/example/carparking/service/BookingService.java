package com.example.carparking.service;

import com.example.carparking.dto.BookingRequest;
import com.example.carparking.dto.BookingResponse;
import com.example.carparking.exception.ResourceNotFoundException;
import com.example.carparking.model.Booking;
import com.example.carparking.model.ParkingSlot;
import com.example.carparking.repository.BookingRepository;
import com.example.carparking.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    public BookingResponse bookSlot(BookingRequest request) {
        ParkingSlot slot = parkingSlotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found with id: " + request.getSlotId()));

        if (!slot.isAvailable()) {
            throw new RuntimeException("Slot is already occupied");
        }

        // Update slot availability
        slot.setAvailable(false);
        parkingSlotRepository.save(slot);

        // Create booking
        Booking booking = new Booking(
                request.getCarNumber(),
                request.getSlotId(),
                LocalDateTime.now(),
                "ACTIVE");
        Booking savedBooking = bookingRepository.save(booking);

        return mapToResponse(savedBooking, slot.getSlotNumber());
    }

    public BookingResponse exitParking(String carNumber) {
        Booking booking = bookingRepository.findByCarNumberAndStatus(carNumber, "ACTIVE")
                .orElseThrow(() -> new ResourceNotFoundException("No active booking found for car: " + carNumber));

        ParkingSlot slot = parkingSlotRepository.findById(booking.getSlotId())
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found for this booking"));

        // Calculate Fee (MOCK: 1 minute = 1 hour for testing)
        LocalDateTime exitTime = LocalDateTime.now();
        long minutes = Duration.between(booking.getEntryTime(), exitTime).toMinutes();
        if (minutes == 0)
            minutes = 1; // Minimum 1 unit
        long hours = minutes; // 1 min = 1 hour mapping
        double totalFee = hours * slot.getHourlyRate();

        // Update Booking
        booking.setExitTime(exitTime);
        booking.setTotalFee(totalFee);
        booking.setStatus("COMPLETED");
        bookingRepository.save(booking);

        // Free the slot
        slot.setAvailable(true);
        parkingSlotRepository.save(slot);

        return mapToResponse(booking, slot.getSlotNumber());
    }

    private BookingResponse mapToResponse(Booking booking, String slotNumber) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setCarNumber(booking.getCarNumber());
        response.setSlotNumber(slotNumber);
        response.setEntryTime(booking.getEntryTime());
        response.setExitTime(booking.getExitTime());
        response.setTotalFee(booking.getTotalFee());
        response.setStatus(booking.getStatus());
        return response;
    }
}
