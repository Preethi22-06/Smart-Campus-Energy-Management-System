package com.preethi.smartcampus.dto;

public class RoomActivePowerResponse {

    private Long roomId;
    private double activePower;

    public RoomActivePowerResponse(Long roomId, double activePower) {
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