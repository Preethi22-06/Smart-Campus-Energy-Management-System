package com.preethi.smartcampus.service;

import com.preethi.smartcampus.entity.Room;
import com.preethi.smartcampus.repository.RoomRepository;
import com.preethi.smartcampus.repository.FloorRepository;
import com.preethi.smartcampus.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private FloorRepository floorRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room saveRoom(Room room) {

        // 1. Check room number
        if (room.getRoomNumber() == null ||
            room.getRoomNumber().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Room number cannot be empty"
            );
        }

        // 2. Check floor is provided
        if (room.getFloor() == null) {

            throw new IllegalArgumentException(
                    "Room must belong to a floor"
            );
        }

        // 3. Check floor actually exists
        Long floorId = room.getFloor().getId();

        floorRepository.findById(floorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Floor not found with id: " + floorId
                        )
                );

        // 4. Save room
        return roomRepository.save(room);
    }
}