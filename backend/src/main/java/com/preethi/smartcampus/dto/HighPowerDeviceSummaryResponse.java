package com.preethi.smartcampus.dto;

public class HighPowerDeviceSummaryResponse {

    private long totalHighPowerDevices;
    private long activeHighPowerDevices;
    private double activeHighPower;
    private double threshold;

    public HighPowerDeviceSummaryResponse(
            long totalHighPowerDevices,
            long activeHighPowerDevices,
            double activeHighPower,
            double threshold) {

        this.totalHighPowerDevices = totalHighPowerDevices;
        this.activeHighPowerDevices = activeHighPowerDevices;
        this.activeHighPower = activeHighPower;
        this.threshold = threshold;
    }

    public long getTotalHighPowerDevices() {
        return totalHighPowerDevices;
    }

    public long getActiveHighPowerDevices() {
        return activeHighPowerDevices;
    }

    public double getActiveHighPower() {
        return activeHighPower;
    }

    public double getThreshold() {
        return threshold;
    }
}