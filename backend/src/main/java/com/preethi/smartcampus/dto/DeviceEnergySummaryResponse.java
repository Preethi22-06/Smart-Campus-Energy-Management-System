package com.preethi.smartcampus.dto;

public class DeviceEnergySummaryResponse {

    private Long deviceId;
    private String deviceName;
    private String deviceType;
    private String status;
    private double powerRating;
    private double energy;
    private double estimatedCost;
    private double hours;
    private double rate;

    private String powerUnit;
    private String energyUnit;
    private String currency;

    public DeviceEnergySummaryResponse(
            Long deviceId,
            String deviceName,
            String deviceType,
            String status,
            double powerRating,
            double energy,
            double estimatedCost,
            double hours,
            double rate) {

        this.deviceId = deviceId;
        this.deviceName = deviceName;
        this.deviceType = deviceType;
        this.status = status;
        this.powerRating = powerRating;
        this.energy = energy;
        this.estimatedCost = estimatedCost;
        this.hours = hours;
        this.rate = rate;

        this.powerUnit = "W";
        this.energyUnit = "kWh";
        this.currency = "INR";
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public String getStatus() {
        return status;
    }

    public double getPowerRating() {
        return powerRating;
    }

    public double getEnergy() {
        return energy;
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
}