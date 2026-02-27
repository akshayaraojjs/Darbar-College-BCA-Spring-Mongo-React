package com.example.carparking.service;

import com.example.carparking.model.Car;
import com.example.carparking.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(String id) {
        return carRepository.findById(id);
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car updateCar(String id, Car carDetails) {
        Optional<Car> carOptional = carRepository.findById(id);
        if (carOptional.isPresent()) {
            Car car = carOptional.get();
            car.setCarNumber(carDetails.getCarNumber());
            car.setOwnerName(carDetails.getOwnerName());
            car.setColor(carDetails.getColor());
            car.setModel(carDetails.getModel());
            return carRepository.save(car);
        }
        return null;
    }

    public void deleteCar(String id) {
        carRepository.deleteById(id);
    }
}
