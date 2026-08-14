package com.preethi.smartcampus.dto;

public class CampusStatisticsResponse {

    private long totalDevices;
    private long activeDevices;
    private double activePower;

    public CampusStatisticsResponse(
            long totalDevices,
            long activeDevices,
            double activePower) {

        this.totalDevices = totalDevices;
        this.activeDevices = activeDevices;
        this.activePower = activePower;
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
}