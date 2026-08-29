package com.preethi.smartcampus.repository;

import java.util.List;

import com.preethi.smartcampus.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

    // Devices by Room
    List<Device> findByRoomId(Long roomId);

    // Devices by Floor
    List<Device> findByRoomFloorId(Long floorId);
    List<Device> findByDeviceNameContainingIgnoreCase(String deviceName);
    List<Device> findByDeviceTypeIgnoreCase(String deviceType);
    long countByDeviceTypeIgnoreCase(String deviceType);
    

    // Devices by Floor and Status
    List<Device> findByRoomFloorIdAndStatus(
            Long floorId,
            String status
    );

    // Device counts
    long countByStatus(String status);

    long countByRoomId(Long roomId);

    long countByRoomIdAndStatus(
            Long roomId,
            String status
    );

    // Device search by status
    List<Device> findByStatus(String status);

    List<Device> findByRoomIdAndStatus(
            Long roomId,
            String status
    );

    // High-power devices
    List<Device> findByPowerRatingGreaterThan(
            double powerRating
    );

    List<Device> findByRoomIdAndPowerRatingGreaterThan(
            Long roomId,
            double powerRating
    );

    List<Device> findByStatusAndPowerRatingGreaterThan(
            String status,
            double powerRating
    );

    // Duplicate device validation
    boolean existsByDeviceNameAndRoomId(
            String deviceName,
            Long roomId
    );

    // Floor statistics
    long countByRoomFloorId(Long floorId);

    long countByRoomFloorIdAndStatus(
            Long floorId,
            String status
    );
    List<Device> findByRoomFloorIdAndPowerRatingGreaterThan(
        Long floorId,
        double powerRating
);
List<Device> findByStatusAndDeviceTypeIgnoreCase(
        String status,
        String deviceType
);
   long countByStatusAndDeviceTypeIgnoreCase(
        String status,
        String deviceType
);
@Query("""
    SELECT COALESCE(SUM(d.powerRating), 0)
    FROM Device d
    WHERE LOWER(d.deviceType) = LOWER(:deviceType)
""")
double sumPowerRatingByDeviceTypeIgnoreCase(
        @Param("deviceType") String deviceType
);
}