package com.preethi.smartcampus.dto;

public class HighestPowerRoomResponse {

    private Long roomId;
    private double activePower;
    private long activeDevices;

    public HighestPowerRoomResponse(
            Long roomId,
            double activePower,
            long activeDevices) {

        this.roomId = roomId;
        this.activePower = activePower;
        this.activeDevices = activeDevices;
    }

    public Long getRoomId() {
        return roomId;
    }

    public double getActivePower() {
        return activePower;
    }

    public long getActiveDevices() {
        return activeDevices;
    }
}