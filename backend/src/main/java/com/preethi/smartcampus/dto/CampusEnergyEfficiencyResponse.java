package com.preethi.smartcampus.dto;

public class CampusEnergyEfficiencyResponse {

    private long totalDevices;
    private long activeDevices;
    private double activePower;
    private double efficiencyPercentage;

    public CampusEnergyEfficiencyResponse(
        long totalDevices,
        long activeDevices,
        double activePower,
        double efficiencyPercentage) {

        this.totalDevices = totalDevices;
        this.activeDevices = activeDevices;
        this.activePower = activePower;
        this.efficiencyPercentage = efficiencyPercentage;
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