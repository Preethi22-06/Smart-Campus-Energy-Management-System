package com.preethi.smartcampus.dto;

public class RoomActivePowerResponse {

    private Long roomId;
    private double activePower;
    private String unit;

    public RoomActivePowerResponse(Long roomId, double activePower) {
        this.roomId = roomId;
        this.activePower = activePower;
        this.unit = "W";
    }

    public Long getRoomId() {
        return roomId;
    }

    public double getActivePower() {
        return activePower;
    }

    public String getUnit() {
        return unit;
    }
}