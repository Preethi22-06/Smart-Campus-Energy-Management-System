package com.preethi.smartcampus.repository;
import java.util.List;
import com.preethi.smartcampus.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
List<Device> findByRoomId(Long roomId);
long countByStatus(String status);
}