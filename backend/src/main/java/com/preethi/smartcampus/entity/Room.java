package com.preethi.smartcampus.entity;
import java.util.List;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomNumber;
    @JsonBackReference
@ManyToOne
@JoinColumn(name = "floor_id")
private Floor floor;
    
@JsonManagedReference
@OneToMany(mappedBy = "room")
private List<Device> devices;
    public Room() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
    this.id = id;
}
    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Floor getFloor() {
        return floor;
    }

    public void setFloor(Floor floor) {
        this.floor = floor;
    }

    public List<Device> getDevices() {
    return devices;
}

public void setDevices(List<Device> devices) {
    this.devices = devices;
}
}