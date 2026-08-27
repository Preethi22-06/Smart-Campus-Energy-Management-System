package com.preethi.smartcampus.dto;

public class CampusDeviceSummaryResponse {

    private long totalDevices;
    private long onDevices;
    private long offDevices;
    private double activePower;
    private double activeEnergy;
    private double estimatedCost;
    private double hours;
    private double rate;

    private String powerUnit;
    private String energyUnit;
    private String currency;
    private String energyStatus;

    public CampusDeviceSummaryResponse(
            long totalDevices,
            long onDevices,
            long offDevices,
            double activePower,
            double activeEnergy,
            double estimatedCost,
            double hours,
            double rate) {

        this.totalDevices = totalDevices;
        this.onDevices = onDevices;
        this.offDevices = offDevices;
        this.activePower = activePower;
        this.activeEnergy = activeEnergy;
        this.estimatedCost = estimatedCost;
        this.hours = hours;
        this.rate = rate;

        this.powerUnit = "W";
        this.energyUnit = "kWh";
        this.currency = "INR";
        if (activePower > 500) {
    this.energyStatus = "HIGH";
} else {
    this.energyStatus = "NORMAL";
}

        if (activePower > 500) {
            this.energyStatus = "HIGH";
        } else {
            this.energyStatus = "NORMAL";
        }
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

    public double getHours() {
        return hours;
    }

    public double getRate() {
        return rate;
    }

    public String getPowerUnit() {
        return powerUnit;
    }

    public String getEnergyUnit() {
        return energyUnit;
    }

    public String getCurrency() {
        return currency;
    }

    public String getEnergyStatus() {
        return energyStatus;
    }
    
}