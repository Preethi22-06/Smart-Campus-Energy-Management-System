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
        double activePower,
        double activeEnergy,
        double estimatedCost) {

    this.totalDevices = totalDevices;
    this.onDevices = onDevices;
    this.offDevices = offDevices;
    this.activePower = activePower;
    this.activeEnergy = activeEnergy;
    this.estimatedCost = estimatedCost;
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
public double getActiveEnergy() {
    return activeEnergy;
}

public double getEstimatedCost() {
    return estimatedCost;
}
private double activeEnergy;
private double estimatedCost;
}
