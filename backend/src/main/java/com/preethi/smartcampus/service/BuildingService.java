package com.preethi.smartcampus.service;
import java.util.Optional;
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
     public Optional<Building> getBuildingById(Long id) {
    return buildingRepository.findById(id);
}

    public Building saveBuilding(Building building) {
        return buildingRepository.save(building);
    }
    public Building updateBuilding(Long id, Building updatedBuilding) {
    updatedBuilding.setId(id);
    return buildingRepository.save(updatedBuilding);
}
public void deleteBuilding(Long id) {
    buildingRepository.deleteById(id);
}
}
