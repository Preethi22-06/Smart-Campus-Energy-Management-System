package com.preethi.smartcampus.dto;

public class CampusAlertSummaryResponse {

    private long totalDevices;
    private long onDevices;
    private long offDevices;
    private double activePower;
    private boolean alert;
    private String message;

    public CampusAlertSummaryResponse(
            long totalDevices,
            long onDevices,
            long offDevices,
            double activePower,
            boolean alert,
            String message) {

        this.totalDevices = totalDevices;
        this.onDevices = onDevices;
        this.offDevices = offDevices;
        this.activePower = activePower;
        this.alert = alert;
        this.message = message;
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

    public boolean isAlert() {
        return alert;
    }

    public String getMessage() {
        return message;
    }
}