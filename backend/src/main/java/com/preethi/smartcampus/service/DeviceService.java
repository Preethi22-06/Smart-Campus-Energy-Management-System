package com.preethi.smartcampus.service;
import com.preethi.smartcampus.dto.CampusDeviceSummaryResponse;
import com.preethi.smartcampus.dto.RoomAlertResponse;
import com.preethi.smartcampus.dto.RoomDeviceSummaryResponse;
import com.preethi.smartcampus.entity.Device;
import com.preethi.smartcampus.repository.DeviceRepository;
import com.preethi.smartcampus.repository.FloorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.preethi.smartcampus.dto.HighestPowerRoomResponse;
import com.preethi.smartcampus.dto.CampusAlertSummaryResponse;
import com.preethi.smartcampus.dto.ActivePowerResponse;
import com.preethi.smartcampus.dto.RoomActivePowerResponse;
import com.preethi.smartcampus.dto.CampusStatisticsResponse;
import com.preethi.smartcampus.dto.RoomEnergyEfficiencyResponse;
import com.preethi.smartcampus.dto.CampusEnergyEfficiencyResponse;
import com.preethi.smartcampus.dto.CampusFloorStatisticsResponse;
import com.preethi.smartcampus.exception.ResourceNotFoundException;
import com.preethi.smartcampus.dto.HighPowerDeviceSummaryResponse;
import com.preethi.smartcampus.repository.RoomRepository;


import java.util.List;

@Service
public class DeviceService {
    @Autowired
private RoomRepository roomRepository;

    @Autowired
    private DeviceRepository deviceRepository;
    
    @Autowired
private FloorRepository floorRepository;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

   public Device saveDevice(Device device) {

    if (device.getDeviceName() == null ||
        device.getDeviceName().trim().isEmpty()) {

        throw new IllegalArgumentException(
                "Device name cannot be empty"
        );
    }

    if (device.getDeviceType() == null ||
        device.getDeviceType().trim().isEmpty()) {

        throw new IllegalArgumentException(
                "Device type cannot be empty"
        );
    }

    if (device.getPowerRating() < 0) {

        throw new IllegalArgumentException(
                "Power rating cannot be negative"
        );
    }

    if (device.getStatus() == null ||
        (!device.getStatus().equalsIgnoreCase("ON") &&
         !device.getStatus().equalsIgnoreCase("OFF"))) {

        throw new IllegalArgumentException(
                "Device status must be ON or OFF"
        );
    }

    if (device.getRoom() == null) {

        throw new IllegalArgumentException(
                "Device must belong to a room"
        );
    }

    Long roomId = device.getRoom().getId();

    if (roomId == null ||
        !roomRepository.existsById(roomId)) {

        throw new ResourceNotFoundException(
                "Room not found with id: " + roomId
        );
    }
    boolean exists = deviceRepository
        .existsByDeviceNameAndRoomId(
                device.getDeviceName(),
                roomId
        );

if (exists) {
    throw new IllegalArgumentException(
            "Device name already exists in this room"
    );
}

    return deviceRepository.save(device);
}
public Device updateDeviceStatus(Long id, String status) {

    Device device = deviceRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Device not found with id: " + id
                    )
            );

    if (status == null ||
        (!status.equalsIgnoreCase("ON") &&
         !status.equalsIgnoreCase("OFF"))) {

        throw new IllegalArgumentException(
                "Device status must be ON or OFF"
        );
    }

    device.setStatus(status.toUpperCase());

    return deviceRepository.save(device);
}
public Device getDeviceById(Long id) {
    return deviceRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Device not found with id: " + id
                    )
            );
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

    if (powerRating <= 0) {
    throw new IllegalArgumentException(
            "Power rating must be greater than 0"
    );
}

    Device device = deviceRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Device not found with id: " + id
                    )
            );

    device.setPowerRating(powerRating);

    return deviceRepository.save(device);
}
public double calculateEnergyConsumption(Long id, double hours) {

    if (hours <= 0) {
        throw new IllegalArgumentException(
                "Hours must be greater than 0"
        );
    }

    Device device = deviceRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Device not found with id: " + id
                    )
            );

    return (device.getPowerRating() * hours) / 1000;
}
public double calculateEnergyCost(Long id, double hours, double rate) {

    if (rate < 0) {
        throw new IllegalArgumentException(
                "Rate cannot be negative"
        );
    }

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

    double activeEnergy = activePower / 1000;
    double estimatedCost = activeEnergy * 10;

    return new RoomDeviceSummaryResponse(
            roomId,
            totalDevices,
            onDevices,
            offDevices,
            activePower,
            activeEnergy,
            estimatedCost
    );
}
public CampusDeviceSummaryResponse getCampusDeviceSummary(
        double hours,
        double rate) {

    if (hours <= 0) {
        throw new IllegalArgumentException(
                "Hours must be greater than 0"
        );
    }

    if (hours > 24) {
    throw new IllegalArgumentException(
            "Hours cannot exceed 24"
    );
}

    if (rate < 0) {
        throw new IllegalArgumentException(
                "Rate cannot be negative"
        );
    }
    if (rate > 100) {
    throw new IllegalArgumentException(
            "Rate cannot exceed 100"
    );
}

    long totalDevices = deviceRepository.count();
    long onDevices = deviceRepository.countByStatus("ON");
    long offDevices = deviceRepository.countByStatus("OFF");

    double activePower = 0;

    List<Device> devices = deviceRepository.findByStatus("ON");

    for (Device device : devices) {
        activePower += device.getPowerRating();
    }

    double activeEnergy = (activePower / 1000) * hours;

    double estimatedCost = activeEnergy * rate;

   return new CampusDeviceSummaryResponse(
        totalDevices,
        onDevices,
        offDevices,
        activePower,
        activeEnergy,
        estimatedCost,
        hours,
        rate
);
}

public double calculateActiveEnergyConsumption(Long id, double hours) {

    Device device = deviceRepository.findById(id).orElse(null);

    if (device != null && "ON".equals(device.getStatus())) {
        return (device.getPowerRating() * hours) / 1000;
    }

    return 0;
}
public double calculateActiveRoomEnergy(Long roomId, double hours) {

    List<Device> devices =
            deviceRepository.findByRoomIdAndStatus(roomId, "ON");

    double totalEnergy = 0;

    for (Device device : devices) {
        totalEnergy += (device.getPowerRating() * hours) / 1000;
    }

    return totalEnergy;
}
public double calculateActiveRoomCost(Long roomId, double hours, double rate) {

    double activeEnergy = calculateActiveRoomEnergy(roomId, hours);

    return activeEnergy * rate;
}
public Device getHighestPowerActiveDevice() {

    List<Device> devices = deviceRepository.findByStatus("ON");

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

public HighestPowerRoomResponse getHighestPowerRoom() {

    List<Device> devices = deviceRepository.findAll();

    if (devices.isEmpty()) {
        return null;
    }

    Long highestRoomId = null;
    double highestPower = 0;
    long highestActiveDevices = 0;

    for (Device device : devices) {

        if (device.getRoom() != null) {

            Long roomId = device.getRoom().getId();

            double roomPower =
                    calculateActiveRoomPower(roomId);

            long activeDevices =
                    deviceRepository.countByRoomIdAndStatus(
                            roomId,
                            "ON"
                    );

            if (roomPower > highestPower) {

                highestPower = roomPower;
                highestRoomId = roomId;
                highestActiveDevices = activeDevices;
            }
        }
    }

    if (highestRoomId == null) {
        return null;
    }

    return new HighestPowerRoomResponse(
            highestRoomId,
            highestPower,
            highestActiveDevices
    );
}
public CampusAlertSummaryResponse getCampusAlertSummary() {

    long totalDevices = deviceRepository.count();
    long onDevices = deviceRepository.countByStatus("ON");
    long offDevices = deviceRepository.countByStatus("OFF");

    double activePower = 0;

    List<Device> devices = deviceRepository.findByStatus("ON");

    for (Device device : devices) {
        activePower += device.getPowerRating();
    }

    boolean alert = activePower > 500;

    String message;

    if (alert) {
        message = "High power consumption detected: "
                + activePower + " W currently active.";
    } else if (onDevices > 0) {
        message = "Campus power usage is normal. "
                + onDevices + " device(s) are currently ON.";
    } else {
        message = "No action required: All devices are OFF.";
    }

    return new CampusAlertSummaryResponse(
            totalDevices,
            onDevices,
            offDevices,
            activePower,
            alert,
            message
    );
}
public ActivePowerResponse getActivePower() {

    List<Device> devices = deviceRepository.findByStatus("ON");

    double activePower = 0;

    for (Device device : devices) {
        activePower += device.getPowerRating();
    }

    return new ActivePowerResponse(activePower);
}
public RoomActivePowerResponse getRoomActivePower(Long roomId) {

    double activePower = calculateActiveRoomPower(roomId);

    return new RoomActivePowerResponse(
            roomId,
            activePower
    );
}
public CampusStatisticsResponse getCampusStatistics() {

    long totalDevices = deviceRepository.count();

    long activeDevices = deviceRepository.countByStatus("ON");

    long inactiveDevices = deviceRepository.countByStatus("OFF");

    double activePower = 0;

    List<Device> devices = deviceRepository.findByStatus("ON");

    for (Device device : devices) {
        activePower += device.getPowerRating();
    }

    return new CampusStatisticsResponse(
            totalDevices,
            activeDevices,
            inactiveDevices,
            activePower
    );
}
public List<Device> getHighPowerDevices(double threshold) {
    return deviceRepository.findByPowerRatingGreaterThan(threshold);
}
public List<Device> getHighPowerDevicesByRoom(Long roomId, double threshold) {
    return deviceRepository.findByRoomIdAndPowerRatingGreaterThan(
            roomId,
            threshold
    );
    
}
public List<Device> getHighPowerDevicesByFloor(
        Long floorId,
        double threshold) {

    if (!floorRepository.existsById(floorId)) {
        throw new ResourceNotFoundException(
                "Floor not found with id: " + floorId
        );
    }

    if (threshold <= 0) {
        throw new IllegalArgumentException(
                "Power threshold must be greater than 0"
        );
    }

    return deviceRepository.findByRoomFloorIdAndPowerRatingGreaterThan(
            floorId,
            threshold
    );
}
public List<Device> getActiveHighPowerDevices(double threshold) {
    return deviceRepository.findByStatusAndPowerRatingGreaterThan(
            "ON",
            threshold
    );
}
public RoomEnergyEfficiencyResponse getRoomEnergyEfficiency(Long roomId) {

    long totalDevices = deviceRepository.countByRoomId(roomId);
    long activeDevices = deviceRepository.countByRoomIdAndStatus(roomId, "ON");

    double activePower = calculateActiveRoomPower(roomId);

    long offDevices = totalDevices - activeDevices;

    double efficiencyPercentage = 0;

    if (totalDevices > 0) {
        efficiencyPercentage =
                ((double) offDevices / totalDevices) * 100;
    }

    return new RoomEnergyEfficiencyResponse(
            roomId,
            totalDevices,
            activeDevices,
            activePower,
            efficiencyPercentage
    );
}
public CampusEnergyEfficiencyResponse getCampusEnergyEfficiency() {

    long totalDevices = deviceRepository.count();
    long activeDevices = deviceRepository.countByStatus("ON");

    double activePower = 0;

    List<Device> devices = deviceRepository.findByStatus("ON");

    for (Device device : devices) {
        activePower += device.getPowerRating();
    }

    long offDevices = totalDevices - activeDevices;

    double efficiencyPercentage = 0;

    if (totalDevices > 0) {
        efficiencyPercentage =
                ((double) offDevices / totalDevices) * 100;
    }

    return new CampusEnergyEfficiencyResponse(
            totalDevices,
            activeDevices,
            activePower,
            efficiencyPercentage
    );
}
public HighPowerDeviceSummaryResponse getHighPowerDeviceSummary(
        double threshold) {

    if (threshold < 0) {
        throw new IllegalArgumentException(
                "Threshold cannot be negative"
        );
    }

    List<Device> devices =
            deviceRepository.findByPowerRatingGreaterThan(threshold);

    long totalHighPowerDevices = devices.size();

    long activeHighPowerDevices = 0;

    double activeHighPower = 0;

    for (Device device : devices) {

        if ("ON".equalsIgnoreCase(device.getStatus())) {

            activeHighPowerDevices++;

            activeHighPower += device.getPowerRating();
        }
    }

    return new HighPowerDeviceSummaryResponse(
            totalHighPowerDevices,
            activeHighPowerDevices,
            activeHighPower,
            threshold
    );
}
public List<Device> getDevicesByFloorId(Long floorId) {

    return deviceRepository.findByRoomFloorId(floorId);
} 
public CampusFloorStatisticsResponse getFloorStatistics(Long floorId) {

    long totalDevices =
            deviceRepository.countByRoomFloorId(floorId);

    long onDevices =
            deviceRepository.countByRoomFloorIdAndStatus(
                    floorId,
                    "ON"
            );

    long offDevices =
            deviceRepository.countByRoomFloorIdAndStatus(
                    floorId,
                    "OFF"
            );

    double activePower = 0;

    List<Device> devices =
            deviceRepository.findByRoomFloorIdAndStatus(
                    floorId,
                    "ON"
            );

    for (Device device : devices) {
        activePower += device.getPowerRating();
    }

    return new CampusFloorStatisticsResponse(
            floorId,
            totalDevices,
            onDevices,
            offDevices,
            activePower
    );
    
}
public List<Device> getOnDevicesByFloor(Long floorId) {

    return deviceRepository.findByRoomFloorIdAndStatus(
            floorId,
            "ON"
    );
}
public List<Device> getOffDevicesByFloor(Long floorId) {

    return deviceRepository.findByRoomFloorIdAndStatus(
            floorId,
            "OFF"
    );
}
public double getActivePowerByFloor(Long floorId) {

    List<Device> devices =
            deviceRepository.findByRoomFloorIdAndStatus(
                    floorId,
                    "ON"
            );

    double activePower = 0;

    for (Device device : devices) {
        activePower += device.getPowerRating();
    }

    return activePower;
}
public List<Device> getHighPowerOnDevices(double threshold) {

    return deviceRepository
            .findByStatusAndPowerRatingGreaterThan(
                    "ON",
                    threshold
            );
}
public double getTotalPowerByFloor(Long floorId) {

    List<Device> devices =
            deviceRepository.findByRoomFloorId(floorId);

    double totalPower = 0;

    for (Device device : devices) {
        totalPower += device.getPowerRating();
    }

    return totalPower;
}
public Device updateDevice(
        Long id,
        Device updatedDevice) {

    Device existingDevice = deviceRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Device not found with id: " + id
                    )
            );

    if (updatedDevice.getDeviceName() == null ||
        updatedDevice.getDeviceName().trim().isEmpty()) {

        throw new IllegalArgumentException(
                "Device name cannot be empty"
        );
    }

    if (updatedDevice.getDeviceType() == null ||
        updatedDevice.getDeviceType().trim().isEmpty()) {

        throw new IllegalArgumentException(
                "Device type cannot be empty"
        );
    }

    if (updatedDevice.getPowerRating() < 0) {
        throw new IllegalArgumentException(
                "Power rating cannot be negative"
        );
    }

    if (updatedDevice.getStatus() == null ||
        (!updatedDevice.getStatus().equalsIgnoreCase("ON") &&
         !updatedDevice.getStatus().equalsIgnoreCase("OFF"))) {

        throw new IllegalArgumentException(
                "Device status must be ON or OFF"
        );
    }

    if (updatedDevice.getRoom() == null) {
        throw new IllegalArgumentException(
                "Device must belong to a room"
        );
    }

    Long roomId = updatedDevice.getRoom().getId();

    if (roomId == null ||
        !roomRepository.existsById(roomId)) {

        throw new ResourceNotFoundException(
                "Room not found with id: " + roomId
        );
    }

    existingDevice.setDeviceName(
            updatedDevice.getDeviceName()
    );

    existingDevice.setDeviceType(
            updatedDevice.getDeviceType()
    );

    existingDevice.setPowerRating(
            updatedDevice.getPowerRating()
    );

    existingDevice.setStatus(
            updatedDevice.getStatus().toUpperCase()
    );

    existingDevice.setRoom(
            updatedDevice.getRoom()
    );

    return deviceRepository.save(existingDevice);
}


}