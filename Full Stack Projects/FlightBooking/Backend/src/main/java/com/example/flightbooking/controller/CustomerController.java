package com.example.flightbooking.controller;

import com.example.flightbooking.dto.ApiResponse;
import com.example.flightbooking.model.Customer;
import com.example.flightbooking.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Customer>> register(@Valid @RequestBody Customer customer) {
        Customer saved = customerService.registerCustomer(customer);
        return ResponseEntity.ok(ApiResponse.success("Customer registered successfully", saved));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Customer>>> getAll() {
        List<Customer> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(ApiResponse.success("Fetched all customers", customers));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Customer>> getById(@PathVariable String id) {
        Customer customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(ApiResponse.success("Fetched customer successfully", customer));
    }
}