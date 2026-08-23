package com.preethi.smartcampus.controller;

import com.preethi.smartcampus.entity.Building;
import com.preethi.smartcampus.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buildings")
public class BuildingController {

    @Autowired
    private BuildingService buildingService;

    @GetMapping
    public List<Building> getAllBuildings() {
        return buildingService.getAllBuildings();
    }
    
  @GetMapping("/{id}")
public Building getBuildingById(@PathVariable Long id) {
    return buildingService.getBuildingById(id);
}

    @PostMapping
    public Building addBuilding(@RequestBody Building building) {
        return buildingService.saveBuilding(building);
    }
    @PutMapping("/{id}")
public Building updateBuilding(@PathVariable Long id, @RequestBody Building building) {
    return buildingService.updateBuilding(id, building);
}
@DeleteMapping("/{id}")
public void deleteBuilding(@PathVariable Long id) {
    buildingService.deleteBuilding(id);
}
}