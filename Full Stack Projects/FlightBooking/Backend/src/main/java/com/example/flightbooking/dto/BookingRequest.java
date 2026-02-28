package com.example.flightbooking.dto;

import jakarta.validation.constraints.NotBlank;

public class BookingRequest {
    @NotBlank(message = "Customer ID is mandatory")
    private String customerId;

    @NotBlank(message = "Flight Number is mandatory")
    private String flightNumber;

    @NotBlank(message = "Passenger Name is mandatory")
    private String passengerName;

    public BookingRequest() {
    }

    public BookingRequest(String customerId, String flightNumber, String passengerName) {
        this.customerId = customerId;
        this.flightNumber = flightNumber;
        this.passengerName = passengerName;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }
}
