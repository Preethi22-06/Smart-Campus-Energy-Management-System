package com.preethi.smartcampus.dto;

public class RoomDeviceSummaryResponse {
 private Long roomId;
private long totalDevices;
private long onDevices;
private long offDevices;
private double activePower;
public RoomDeviceSummaryResponse(
        Long roomId,
        long totalDevices,
        long onDevices,
        long offDevices,
        double activePower) {

    this.roomId = roomId;
    this.totalDevices = totalDevices;
    this.onDevices = onDevices;
    this.offDevices = offDevices;
    this.activePower = activePower;
}
public Long getRoomId() {
    return roomId;
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
