package com.preethi.smartcampus.service;

import com.preethi.smartcampus.entity.Building;
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

    public Building saveBuilding(Building building) {
        return buildingRepository.save(building);
    }
}
