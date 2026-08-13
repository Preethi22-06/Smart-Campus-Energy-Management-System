package com.preethi.smartcampus.dto;

public class HighestPowerRoomResponse {

    private Long roomId;
    private double activePower;

    public HighestPowerRoomResponse(Long roomId, double activePower) {
        this.roomId = roomId;
        this.activePower = activePower;
    }

    public Long getRoomId() {
        return roomId;
    }

    public double getActivePower() {
        return activePower;
    }
}