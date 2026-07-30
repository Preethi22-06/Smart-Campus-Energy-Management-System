package com.preethi.smartcampus.service;

import com.preethi.smartcampus.entity.Floor;
import com.preethi.smartcampus.repository.FloorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FloorService {

    @Autowired
    private FloorRepository floorRepository;

    public List<Floor> getAllFloors() {
        return floorRepository.findAll();
    }

    public Optional<Floor> getFloorById(Long id) {
        return floorRepository.findById(id);
    }

    public Floor saveFloor(Floor floor) {
        return floorRepository.save(floor);
    }

    public Floor updateFloor(Long id, Floor updatedFloor) {
        updatedFloor.setId(id);
        return floorRepository.save(updatedFloor);
    }

    public void deleteFloor(Long id) {
        floorRepository.deleteById(id);
    }
}