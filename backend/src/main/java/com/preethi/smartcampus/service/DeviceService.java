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
public Device getDeviceById(Long id) {
    return deviceRepository.findById(id).orElse(null);
}
public List<Device> getDevicesByRoomId(Long roomId) {
    return deviceRepository.findByRoomId(roomId);
}
public long countOnDevices() {
    return deviceRepository.countByStatus("ON");
}

public long countOffDevices() {
    return deviceRepository.countByStatus("OFF");
}
public Device updatePowerRating(Long id, double powerRating) {

    Device device = deviceRepository.findById(id).orElse(null);

    if (device != null) {
        device.setPowerRating(powerRating);
        return deviceRepository.save(device);
    }

    return null;
}
public double calculateEnergyConsumption(Long id, double hours) {

    Device device = deviceRepository.findById(id).orElse(null);

    if (device != null) {
        return (device.getPowerRating() * hours) / 1000;
    }

    return 0;
}
public double calculateEnergyCost(Long id, double hours, double rate) {

    double energy = calculateEnergyConsumption(id, hours);

    return energy * rate;
}
public long countAllDevices() {
    return deviceRepository.count();
}
public double calculateTotalEnergy(double hours) {

    List<Device> devices = deviceRepository.findAll();

    double totalEnergy = 0;

    for (Device device : devices) {
        totalEnergy += (device.getPowerRating() * hours) / 1000;
    }

    return totalEnergy;
}
public double calculateTotalCost(double hours, double rate) {

    double totalEnergy = calculateTotalEnergy(hours);

    return totalEnergy * rate;
}
public String getDeviceEnergySummary(Long id, double hours, double rate) {

    Device device = deviceRepository.findById(id).orElse(null);

    if (device != null) {

        double energy = (device.getPowerRating() * hours) / 1000;
        double cost = energy * rate;

        return "Device: " + device.getDeviceName()
                + ", Energy: " + energy + " kWh"
                + ", Cost: ₹" + cost;
    }

    return "Device not found";
}
}