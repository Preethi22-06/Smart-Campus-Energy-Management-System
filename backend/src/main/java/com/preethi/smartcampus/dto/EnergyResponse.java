package com.preethi.smartcampus.dto;

public class EnergyResponse {

    private double energy;
    private String unit;

    public EnergyResponse(double energy) {
        this.energy = energy;
        this.unit = "kWh";
    }

    public double getEnergy() {
        return energy;
    }

    public String getUnit() {
        return unit;
    }
}