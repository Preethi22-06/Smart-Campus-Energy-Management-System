package com.preethi.smartcampus.repository;

import com.preethi.smartcampus.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
 
    boolean existsByRoomNumberAndFloorId(String roomNumber, Long floorId);
    long countByFloorId(Long floorId);
}