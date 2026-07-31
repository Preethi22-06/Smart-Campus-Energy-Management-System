package com.preethi.smartcampus.service;

import com.preethi.smartcampus.entity.Device;
import com.preethi.smartcampus.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Device saveDevice(Device device) {
        return deviceRepository.save(device);
    }
}