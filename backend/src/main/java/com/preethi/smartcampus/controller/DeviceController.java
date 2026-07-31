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
}