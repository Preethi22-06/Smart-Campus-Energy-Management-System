package com.preethi.smartcampus.controller;

import com.preethi.smartcampus.entity.Room;
import com.preethi.smartcampus.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @PostMapping
    public Room saveRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }
    @GetMapping("/{id}")
public Room getRoomById(@PathVariable Long id) {
    return roomService.getRoomById(id);
}
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {

    roomService.deleteRoom(id);

    return ResponseEntity.noContent().build();
}
@GetMapping("/floor/{floorId}/count")
public long getRoomCountByFloor(@PathVariable Long floorId) {

    return roomService.getRoomCountByFloor(floorId);
}
@PutMapping("/{id}")
public Room updateRoom(
        @PathVariable Long id,
        @RequestBody Room room) {

    return roomService.updateRoom(id, room);
}
}