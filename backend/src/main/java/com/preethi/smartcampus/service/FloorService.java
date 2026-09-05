package com.preethi.smartcampus.service;

import com.preethi.smartcampus.entity.Floor;
import com.preethi.smartcampus.exception.ResourceNotFoundException;
import com.preethi.smartcampus.repository.BuildingRepository;
import com.preethi.smartcampus.repository.FloorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FloorService {

    @Autowired
    private FloorRepository floorRepository;

    @Autowired
    private BuildingRepository buildingRepository;

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

    if (floor == null) {
        throw new IllegalArgumentException(
                "Floor details cannot be empty"
        );
    }

    if (floor.getFloorNumber() <= 0) {
        throw new IllegalArgumentException(
                "Floor number must be greater than 0"
        );
    }

    if (floor.getBuilding() == null) {
        throw new IllegalArgumentException(
                "Floor must belong to a building"
        );
    }

    Long buildingId = floor.getBuilding().getId();

    if (buildingId == null ||
        !buildingRepository.existsById(buildingId)) {

        throw new ResourceNotFoundException(
                "Building not found with id: " + buildingId
        );
    }

    return floorRepository.save(floor);
}
public Floor updateFloor(
        Long id,
        Floor updatedFloor) {

    if (!floorRepository.existsById(id)) {
        throw new ResourceNotFoundException(
                "Floor not found with id: " + id
        );
    }

    if (updatedFloor.getFloorNumber() <= 0) {
        throw new IllegalArgumentException(
                "Floor number must be greater than 0"
        );
    }

    if (updatedFloor.getBuilding() == null) {
        throw new IllegalArgumentException(
                "Floor must belong to a building"
        );
    }

    Long buildingId =
            updatedFloor.getBuilding().getId();

    if (buildingId == null ||
        !buildingRepository.existsById(buildingId)) {

        throw new ResourceNotFoundException(
                "Building not found with id: " + buildingId
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
    public List<Floor> getFloorsByBuilding(Long buildingId) {
    return floorRepository.findByBuildingId(buildingId);
}
}