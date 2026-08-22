package com.preethi.smartcampus.service;

import com.preethi.smartcampus.entity.Floor;
import com.preethi.smartcampus.exception.ResourceNotFoundException;
import com.preethi.smartcampus.repository.FloorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FloorService {

    @Autowired
    private FloorRepository floorRepository;

    public List<Floor> getAllFloors() {
        return floorRepository.findAll();
    }

    public Floor getFloorById(Long id) {

        return floorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Floor not found with id: " + id
                        )
                );
    }

    public Floor saveFloor(Floor floor) {
        return floorRepository.save(floor);
    }

    public Floor updateFloor(Long id, Floor updatedFloor) {

        if (!floorRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Floor not found with id: " + id
            );
        }

        updatedFloor.setId(id);
        return floorRepository.save(updatedFloor);
    }

    public void deleteFloor(Long id) {

        if (!floorRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Floor not found with id: " + id
            );
        }

        floorRepository.deleteById(id);
    }
}