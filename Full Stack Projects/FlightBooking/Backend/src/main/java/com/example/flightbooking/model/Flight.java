package com.example.flightbooking.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.time.LocalDateTime;

@Document(collection = "flights")
public class Flight {
    @Id
    private String id;

    @NotBlank(message = "Flight number is mandatory")
    @Indexed(unique = true)
    private String flightNumber;

    @NotBlank(message = "Origin is mandatory")
    private String origin;

    @NotBlank(message = "Destination is mandatory")
    private String destination;

    @NotNull(message = "Departure time is mandatory")
    private LocalDateTime departureTime;

    @Min(value = 0, message = "Total seats cannot be negative")
    private int totalSeats;

    @Min(value = 0, message = "Available seats cannot be negative")
    private int availableSeats;

    @Min(value = 0, message = "Price cannot be negative")
    private double price;

    public Flight() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(int totalSeats) {
        this.totalSeats = totalSeats;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
