package com.preethi.smartcampus.dto;

public class RoomEnergyEfficiencyResponse {

    private Long roomId;
    private long totalDevices;
    private long activeDevices;
    private double activePower;
    private double efficiencyPercentage;
public RoomEnergyEfficiencyResponse(
        Long roomId,
        long totalDevices,
        long activeDevices,
        double activePower,
        double efficiencyPercentage) {

            this.efficiencyPercentage = efficiencyPercentage;
        this.roomId = roomId;
        this.totalDevices = totalDevices;
        this.activeDevices = activeDevices;
        this.activePower = activePower;
    }

    public Long getRoomId() {
        return roomId;
    }

    public long getTotalDevices() {
        return totalDevices;
    }

    public long getActiveDevices() {
        return activeDevices;
    }

    public double getActivePower() {
        return activePower;
    }
    public double getEfficiencyPercentage() {
    return efficiencyPercentage;
}
}