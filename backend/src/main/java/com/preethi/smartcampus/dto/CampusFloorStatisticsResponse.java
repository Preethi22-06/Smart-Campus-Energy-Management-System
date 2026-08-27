package com.preethi.smartcampus.dto;

public class CampusFloorStatisticsResponse {

    private Long floorId;
    private long totalDevices;
    private long onDevices;
    private long offDevices;
    private double activePower;

    public CampusFloorStatisticsResponse(
            Long floorId,
            long totalDevices,
            long onDevices,
            long offDevices,
            double activePower) {

        this.floorId = floorId;
        this.totalDevices = totalDevices;
        this.onDevices = onDevices;
        this.offDevices = offDevices;
        this.activePower = activePower;
    }

    public Long getFloorId() {
        return floorId;
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