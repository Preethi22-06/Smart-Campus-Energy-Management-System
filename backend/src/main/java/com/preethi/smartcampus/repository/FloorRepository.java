package com.preethi.smartcampus.repository;

import com.preethi.smartcampus.entity.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FloorRepository extends JpaRepository<Floor, Long> {
   boolean existsByFloorNumberAndBuildingId(
        int floorNumber,
        Long buildingId
);
List<Floor> findByBuildingId(Long buildingId);
}