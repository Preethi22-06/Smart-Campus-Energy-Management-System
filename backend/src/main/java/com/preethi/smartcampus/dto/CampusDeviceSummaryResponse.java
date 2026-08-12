package com.preethi.smartcampus.dto;

public class CampusDeviceSummaryResponse {
   private long totalDevices;
private long onDevices;
private long offDevices;
private double activePower;
public CampusDeviceSummaryResponse(
        long totalDevices,
        long onDevices,
        long offDevices,
        double activePower) {

    this.totalDevices = totalDevices;
    this.onDevices = onDevices;
    this.offDevices = offDevices;
    this.activePower = activePower;
}
public long getTotalDevices() {
    return totalDevices;
}

public long getOnDevices() {
    return onDevices;
}

public long getOffDevices() {
    return offDevices;
}

public double getActivePower() {
    return activePower;
}
}
