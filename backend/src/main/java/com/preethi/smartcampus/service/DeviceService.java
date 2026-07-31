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
    public Device updateDeviceStatus(Long id, String status) {
    Device device = deviceRepository.findById(id).orElse(null);

    if (device != null) {
        device.setStatus(status);
        return deviceRepository.save(device);
    }

    return null;
}
}