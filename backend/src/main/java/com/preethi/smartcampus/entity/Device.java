package com.preethi.smartcampus.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceName;

    private String deviceType;

    private String status;

    private double powerRating;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    public Device() {
    }

    public Long getId() {
        return id;
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

    public Room getRoom() {
        return room;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPowerRating(double powerRating) {
        this.powerRating = powerRating;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}