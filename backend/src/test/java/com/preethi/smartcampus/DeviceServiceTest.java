package com.preethi.smartcampus;

import com.preethi.smartcampus.entity.Device;
import com.preethi.smartcampus.repository.DeviceRepository;
import com.preethi.smartcampus.service.DeviceService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DeviceServiceTest {

    @Mock
    private DeviceRepository deviceRepository;

    @InjectMocks
    private DeviceService deviceService;

    @Test
    void getDeviceById_shouldReturnDevice() {

        Device device = new Device();
        device.setId(2L);
        device.setDeviceName("Light 1");
        device.setDeviceType("LIGHT");
        device.setPowerRating(40.0);
        device.setStatus("ON");

        when(deviceRepository.findById(2L))
                .thenReturn(Optional.of(device));

        Device result = deviceService.getDeviceById(2L);

        assertEquals(2L, result.getId());
        assertEquals("Light 1", result.getDeviceName());
        assertEquals("LIGHT", result.getDeviceType());
        assertEquals(40.0, result.getPowerRating());
        assertEquals("ON", result.getStatus());
    }
    @Test
void calculateEnergyConsumption_shouldRejectZeroHours() {

    IllegalArgumentException exception = org.junit.jupiter.api.Assertions.assertThrows(
            IllegalArgumentException.class,
            () -> deviceService.calculateEnergyConsumption(2L, 0)
    );

    assertEquals("Hours must be greater than 0", exception.getMessage());
}

@Test
void calculateEnergyConsumption_shouldRejectMoreThan24Hours() {

    IllegalArgumentException exception = org.junit.jupiter.api.Assertions.assertThrows(
            IllegalArgumentException.class,
            () -> deviceService.calculateEnergyConsumption(2L, 25)
    );

    assertEquals("Hours cannot exceed 24", exception.getMessage());
}
}