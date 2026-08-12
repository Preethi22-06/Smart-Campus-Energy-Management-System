package com.preethi.smartcampus.service;
import com.preethi.smartcampus.dto.CampusDeviceSummaryResponse;
import com.preethi.smartcampus.dto.RoomAlertResponse;
import com.preethi.smartcampus.dto.RoomDeviceSummaryResponse;
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
public List<Device> getDevicesByStatus(String status) {
    return deviceRepository.findByStatus(status);
}
public List<Device> getDevicesByRoomAndStatus(Long roomId, String status) {
    return deviceRepository.findByRoomIdAndStatus(roomId, status);
}
public String getDeviceAlert(Long id) {

    Device device = deviceRepository.findById(id).orElse(null);

    if (device == null) {
        return "Device not found";
    }

    if ("ON".equals(device.getStatus())) {
        return "⚠️ Device " + device.getDeviceName()
                + " is currently ON. Please check if it should be switched off.";
    }

    return "✅ Device " + device.getDeviceName()
            + " is OFF. No action required.";
}
public double calculateRoomEnergy(Long roomId, double hours) {

    List<Device> devices = deviceRepository.findByRoomId(roomId);

    double totalEnergy = 0;

    for (Device device : devices) {
        totalEnergy += (device.getPowerRating() * hours) / 1000;
    }

    return totalEnergy;
}
public double calculateRoomCost(Long roomId, double hours, double rate) {

    double totalEnergy = calculateRoomEnergy(roomId, hours);

    return totalEnergy * rate;
}
public Device getHighestPowerDevice() {

    List<Device> devices = deviceRepository.findAll();

    if (devices.isEmpty()) {
        return null;
    }

    Device highest = devices.get(0);

    for (Device device : devices) {
        if (device.getPowerRating() > highest.getPowerRating()) {
            highest = device;
        }
    }

    return highest;
}
public Device getHighestPowerDeviceByRoom(Long roomId) {

    List<Device> devices = deviceRepository.findByRoomId(roomId);

    if (devices.isEmpty()) {
        return null;
    }

    Device highest = devices.get(0);

    for (Device device : devices) {
        if (device.getPowerRating() > highest.getPowerRating()) {
            highest = device;
        }
    }

    return highest;
}
public double calculateTotalPower() {

    List<Device> devices = deviceRepository.findAll();

    double totalPower = 0;

    for (Device device : devices) {
        totalPower += device.getPowerRating();
    }

    return totalPower;
}
public double calculateRoomPower(Long roomId) {

    List<Device> devices = deviceRepository.findByRoomId(roomId);

    double totalPower = 0;

    for (Device device : devices) {
        totalPower += device.getPowerRating();
    }

    return totalPower;
}
public double calculateActiveRoomPower(Long roomId) {

    List<Device> devices = deviceRepository.findByRoomIdAndStatus(roomId, "ON");

    double totalPower = 0;

    for (Device device : devices) {
        totalPower += device.getPowerRating();
    }

    return totalPower;
}
public long countOnDevicesByRoom(Long roomId) {

    return deviceRepository.countByRoomIdAndStatus(roomId, "ON");
}
public long countOffDevicesByRoom(Long roomId) {

    return deviceRepository.countByRoomIdAndStatus(roomId, "OFF");
}
public long countDevicesByRoom(Long roomId) {

    return deviceRepository.countByRoomId(roomId);
}
public String getRoomAlert(Long roomId) {

    long onDevices = deviceRepository.countByRoomIdAndStatus(roomId, "ON");

    if (onDevices > 0) {
        return "⚠️ Attention required: " + onDevices
                + " device(s) are currently ON in this room.";
    }

    return "✅ No action required: All devices are OFF.";
}
public RoomAlertResponse getRoomAlertSummary(Long roomId) {

    long onDevices = deviceRepository.countByRoomIdAndStatus(roomId, "ON");

    if (onDevices > 0) {
        return new RoomAlertResponse(
                roomId,
                onDevices,
                true,
                "Attention required"
        );
    }

    return new RoomAlertResponse(
            roomId,
            0,
            false,
            "No action required"
    );
}
public List<Device> getOnDevices() {
    return deviceRepository.findByStatus("ON");
}
public List<Device> getOffDevices() {
    return deviceRepository.findByStatus("OFF");
}
public long countActiveDevices() {
    return deviceRepository.countByStatus("ON");
}
public RoomDeviceSummaryResponse getRoomDeviceSummary(Long roomId) {

    long totalDevices = deviceRepository.countByRoomId(roomId);
    long onDevices = deviceRepository.countByRoomIdAndStatus(roomId, "ON");
    long offDevices = deviceRepository.countByRoomIdAndStatus(roomId, "OFF");
    double activePower = calculateActiveRoomPower(roomId);

    return new RoomDeviceSummaryResponse(
            roomId,
            totalDevices,
            onDevices,
            offDevices,
            activePower
    );
}
public CampusDeviceSummaryResponse getCampusDeviceSummary() {

    long totalDevices = deviceRepository.count();
    long onDevices = deviceRepository.countByStatus("ON");
    long offDevices = deviceRepository.countByStatus("OFF");
    double activePower = 0;

    List<Device> devices = deviceRepository.findByStatus("ON");

    for (Device device : devices) {
        activePower += device.getPowerRating();
    }

    return new CampusDeviceSummaryResponse(
            totalDevices,
            onDevices,
            offDevices,
            activePower
    );
}
}