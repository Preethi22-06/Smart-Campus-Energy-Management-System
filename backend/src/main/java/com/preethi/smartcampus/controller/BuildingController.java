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

    @PostMapping
    public Building addBuilding(@RequestBody Building building) {
        return buildingService.saveBuilding(building);
    }
}