package com.preethi.smartcampus.controller;

import com.preethi.smartcampus.entity.Floor;
import com.preethi.smartcampus.service.FloorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/floors")
public class FloorController {

    @Autowired
    private FloorService floorService;

    @GetMapping
    public List<Floor> getAllFloors() {
        return floorService.getAllFloors();
    }

    @GetMapping("/{id}")
    public Optional<Floor> getFloorById(@PathVariable Long id) {
        return floorService.getFloorById(id);
    }

    @PostMapping
    public Floor addFloor(@RequestBody Floor floor) {
        return floorService.saveFloor(floor);
    }

    @PutMapping("/{id}")
    public Floor updateFloor(@PathVariable Long id, @RequestBody Floor floor) {
        return floorService.updateFloor(id, floor);
    }

    @DeleteMapping("/{id}")
    public void deleteFloor(@PathVariable Long id) {
        floorService.deleteFloor(id);
    }
}