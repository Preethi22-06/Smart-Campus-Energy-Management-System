package com.preethi.smartcampus.repository;
import java.util.List;
import com.preethi.smartcampus.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
List<Device> findByRoomId(Long roomId);
List<Device> findByRoomFloorId(Long floorId);


long countByStatus(String status);
List<Device> findByStatus(String status);
List<Device> findByRoomIdAndStatus(Long roomId, String status);
long countByRoomIdAndStatus(Long roomId, String status);
long countByRoomId(Long roomId);
List<Device> findByPowerRatingGreaterThan(double powerRating);
List<Device> findByRoomIdAndPowerRatingGreaterThan(
        Long roomId,
        double powerRating
);
List<Device> findByStatusAndPowerRatingGreaterThan(
        String status,
        double powerRating
);
 boolean existsByDeviceNameAndRoomId(String deviceName, Long roomId);
}