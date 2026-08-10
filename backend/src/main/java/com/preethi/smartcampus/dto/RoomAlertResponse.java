package com.preethi.smartcampus.dto;

public class RoomAlertResponse {

    private Long roomId;
    private long onDevices;
    private boolean alert;
    private String message;

    public RoomAlertResponse(Long roomId, long onDevices, boolean alert, String message) {
        this.roomId = roomId;
        this.onDevices = onDevices;
        this.alert = alert;
        this.message = message;
    }

    public Long getRoomId() {
        return roomId;
    }

    public long getOnDevices() {
        return onDevices;
    }

    public boolean isAlert() {
        return alert;
    }

    public String getMessage() {
        return message;
    }
}