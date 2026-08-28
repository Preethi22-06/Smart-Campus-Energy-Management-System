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

    if (room == null) {
        throw new IllegalArgumentException(
                "Room details cannot be empty"
        );
    }

    if (room.getRoomNumber() == null ||
        room.getRoomNumber().trim().isEmpty()) {

        throw new IllegalArgumentException(
                "Room number cannot be empty"
        );
    }

    if (room.getFloor() == null) {

        throw new IllegalArgumentException(
                "Room must belong to a floor"
        );
    }

    Long floorId = room.getFloor().getId();

    if (floorId == null ||
        !floorRepository.existsById(floorId)) {

        throw new ResourceNotFoundException(
                "Floor not found with id: " + floorId
        );
    }

    boolean exists =
            roomRepository.existsByRoomNumberAndFloorId(
                    room.getRoomNumber(),
                    floorId
            );

    if (exists) {

        throw new IllegalArgumentException(
                "Room number already exists on this floor"
        );
    }

    return roomRepository.save(room);
}
    public Room getRoomById(Long id) {

    return roomRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Room not found with id: " + id
                    )
            );
}
public Room updateRoom(
        Long id,
        Room updatedRoom) {

    if (!roomRepository.existsById(id)) {
        throw new ResourceNotFoundException(
                "Room not found with id: " + id
        );
    }

    if (updatedRoom.getRoomNumber() == null ||
        updatedRoom.getRoomNumber().trim().isEmpty()) {

        throw new IllegalArgumentException(
                "Room number cannot be empty"
        );
    }

    if (updatedRoom.getFloor() == null) {
        throw new IllegalArgumentException(
                "Room must belong to a floor"
        );
    }

    Long floorId = updatedRoom.getFloor().getId();

    if (floorId == null ||
        !floorRepository.existsById(floorId)) {

        throw new ResourceNotFoundException(
                "Floor not found with id: " + floorId
        );
    }

    boolean exists =
            roomRepository.existsByRoomNumberAndFloorId(
                    updatedRoom.getRoomNumber(),
                    floorId
            );

    if (exists) {
        throw new IllegalArgumentException(
                "Room number already exists on this floor"
        );
    }

    updatedRoom.setId(id);

    return roomRepository.save(updatedRoom);
}
public void deleteRoom(Long id) {

    if (!roomRepository.existsById(id)) {
        throw new ResourceNotFoundException(
                "Room not found with id: " + id
        );
    }

    roomRepository.deleteById(id);
}
public long getRoomCountByFloor(Long floorId) {

    if (!floorRepository.existsById(floorId)) {
        throw new ResourceNotFoundException(
                "Floor not found with id: " + floorId
        );
    }

    return roomRepository.countByFloorId(floorId);
}
}