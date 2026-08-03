package com.preethi.smartcampus.controller;

import com.preethi.smartcampus.entity.Device;
import com.preethi.smartcampus.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @PostMapping
    public Device saveDevice(@RequestBody Device device) {
        return deviceService.saveDevice(device);
    }
    @PutMapping("/{id}/on")
public Device turnOnDevice(@PathVariable Long id) {
    return deviceService.updateDeviceStatus(id, "ON");
}

@PutMapping("/{id}/off")
public Device turnOffDevice(@PathVariable Long id) {
    return deviceService.updateDeviceStatus(id, "OFF");
}
@GetMapping("/{id}")
public Device getDeviceById(@PathVariable Long id) {
    return deviceService.getDeviceById(id);
}
@GetMapping("/room/{roomId}")
public List<Device> getDevicesByRoom(@PathVariable Long roomId) {
    return deviceService.getDevicesByRoomId(roomId);
}
@GetMapping("/count/on")
public long countOnDevices() {
    return deviceService.countOnDevices();
}

@GetMapping("/count/off")
public long countOffDevices() {
    return deviceService.countOffDevices();
}
@PutMapping("/{id}/power")
public Device updatePowerRating(
        @PathVariable Long id,
        @RequestParam double powerRating) {

    return deviceService.updatePowerRating(id, powerRating);
}
@GetMapping("/{id}/energy")
public double calculateEnergyConsumption(
        @PathVariable Long id,
        @RequestParam double hours) {

    return deviceService.calculateEnergyConsumption(id, hours);
}
@GetMapping("/{id}/cost")
public double calculateEnergyCost(
        @PathVariable Long id,
        @RequestParam double hours,
        @RequestParam double rate) {

    return deviceService.calculateEnergyCost(id, hours, rate);
}
}