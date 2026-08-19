package com.preethi.smartcampus.dto;

public class CampusStatisticsResponse {

    private long totalDevices;
    private long activeDevices;
    private long inactiveDevices;
    private double activePower;

    public CampusStatisticsResponse(
            long totalDevices,
            long activeDevices,
            long inactiveDevices,
            double activePower) {

        this.totalDevices = totalDevices;
        this.activeDevices = activeDevices;
        this.inactiveDevices = inactiveDevices;
        this.activePower = activePower;
    }

    public long getTotalDevices() {
        return totalDevices;
    }

    public long getActiveDevices() {
        return activeDevices;
    }

    public long getInactiveDevices() {
        return inactiveDevices;
    }

    public double getActivePower() {
        return activePower;
    }
}