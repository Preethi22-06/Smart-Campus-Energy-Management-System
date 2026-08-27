package com.preethi.smartcampus.service;

import com.preethi.smartcampus.entity.Building;
import com.preethi.smartcampus.exception.ResourceNotFoundException;
import com.preethi.smartcampus.repository.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingService {

    @Autowired
    private BuildingRepository buildingRepository;

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public Building getBuildingById(Long id) {

        return buildingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Building not found with id: " + id
                        )
                );
    }  
      public Building saveBuilding(Building building) {

    if (building.getBuildingName() == null ||
        building.getBuildingName().trim().isEmpty()) {

        throw new IllegalArgumentException(
                "Building name cannot be empty"
        );
    }

    if (building.getNumberOfFloors() <= 0) {

        throw new IllegalArgumentException(
                "Number of floors must be greater than 0"
        );
    }
    if (buildingRepository.existsByBuildingName(
        building.getBuildingName())) {

    throw new IllegalArgumentException(
            "Building name already exists"
    );
}

    return buildingRepository.save(building);
}

 public Building updateBuilding(
        Long id,
        Building updatedBuilding) {

    if (!buildingRepository.existsById(id)) {
        throw new ResourceNotFoundException(
                "Building not found with id: " + id
        );
    }

    if (updatedBuilding.getBuildingName() == null ||
        updatedBuilding.getBuildingName().trim().isEmpty()) {

        throw new IllegalArgumentException(
                "Building name cannot be empty"
        );
    }

    if (updatedBuilding.getNumberOfFloors() <= 0) {

        throw new IllegalArgumentException(
                "Number of floors must be greater than 0"
        );
    }

    updatedBuilding.setId(id);

    return buildingRepository.save(updatedBuilding);
}

    public void deleteBuilding(Long id) {

        if (!buildingRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Building not found with id: " + id
            );
        }

        buildingRepository.deleteById(id);
    }
}