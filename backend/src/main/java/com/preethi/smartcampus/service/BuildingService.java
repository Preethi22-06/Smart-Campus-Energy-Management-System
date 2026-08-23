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