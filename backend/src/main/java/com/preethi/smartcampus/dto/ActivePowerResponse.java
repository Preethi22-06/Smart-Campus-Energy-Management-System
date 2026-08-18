package com.preethi.smartcampus.dto;

public class ActivePowerResponse {

    private double activePower;
    private String unit;

    public ActivePowerResponse(double activePower) {
        this.activePower = activePower;
        this.unit = "W";
    }

    public double getActivePower() {
        return activePower;
    }

    public String getUnit() {
        return unit;
    }
}