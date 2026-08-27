package com.preethi.smartcampus.controller;
import com.preethi.smartcampus.dto.RoomAlertResponse;
import com.preethi.smartcampus.dto.RoomDeviceSummaryResponse;
import com.preethi.smartcampus.dto.CampusDeviceSummaryResponse;
import com.preethi.smartcampus.entity.Device;
import com.preethi.smartcampus.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.preethi.smartcampus.dto.HighestPowerRoomResponse;
import com.preethi.smartcampus.dto.CampusAlertSummaryResponse;
import com.preethi.smartcampus.dto.ActivePowerResponse;
import com.preethi.smartcampus.dto.RoomActivePowerResponse;
import com.preethi.smartcampus.dto.CampusStatisticsResponse;
import com.preethi.smartcampus.dto.RoomEnergyEfficiencyResponse;
import com.preethi.smartcampus.dto.CampusEnergyEfficiencyResponse;
import com.preethi.smartcampus.dto.CampusFloorStatisticsResponse;
import com.preethi.smartcampus.dto.EnergyResponse;
import com.preethi.smartcampus.dto.HighPowerDeviceSummaryResponse;
import com.preethi.smartcampus.dto.CostResponse;



import java.util.List;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @PostMapping
    public Device saveDevice(@RequestBody Device device) {
        return deviceService.saveDevice(device);
    }
    @PutMapping("/{id}/on")
public Device turnOnDevice(@PathVariable Long id) {
    return deviceService.updateDeviceStatus(id, "ON");
}

@PutMapping("/{id}/off")
public Device turnOffDevice(@PathVariable Long id) {
    return deviceService.updateDeviceStatus(id, "OFF");
}
@GetMapping("/{id}")
public Device getDeviceById(@PathVariable Long id) {
    return deviceService.getDeviceById(id);
}
@GetMapping("/room/{roomId}")
public List<Device> getDevicesByRoom(@PathVariable Long roomId) {
    return deviceService.getDevicesByRoomId(roomId);
}
@GetMapping("/count/on")
public long countOnDevices() {
    return deviceService.countOnDevices();
}

@GetMapping("/count/off")
public long countOffDevices() {
    return deviceService.countOffDevices();
}
@PutMapping("/{id}/power")
public Device updatePowerRating(
        @PathVariable Long id,
        @RequestParam double powerRating) {

    return deviceService.updatePowerRating(id, powerRating);
}
@GetMapping("/{id}/energy")
public EnergyResponse calculateEnergyConsumption(
        @PathVariable Long id,
        @RequestParam double hours) {

    double energy = deviceService.calculateEnergyConsumption(id, hours);

    return new EnergyResponse(energy);
}
@GetMapping("/{id}/cost")
public CostResponse calculateEnergyCost(
        @PathVariable Long id,
        @RequestParam double hours,
        @RequestParam double rate) {

    double cost = deviceService.calculateEnergyCost(id, hours, rate);

    return new CostResponse(cost);
}
@GetMapping("/count")
public long countAllDevices() {
    return deviceService.countAllDevices();
}
@GetMapping("/energy/total")
public double calculateTotalEnergy(@RequestParam double hours) {
    return deviceService.calculateTotalEnergy(hours);
}
@GetMapping("/cost/total")
public double calculateTotalCost(
        @RequestParam double hours,
        @RequestParam double rate) {

    return deviceService.calculateTotalCost(hours, rate);
}
@GetMapping("/{id}/energy-summary")
public String getDeviceEnergySummary(
        @PathVariable Long id,
        @RequestParam double hours,
        @RequestParam double rate) {

    return deviceService.getDeviceEnergySummary(id, hours, rate);
}
@GetMapping("/status/{status}")
public List<Device> getDevicesByStatus(@PathVariable String status) {
    return deviceService.getDevicesByStatus(status);
}
@GetMapping("/room/{roomId}/status/{status}")
public List<Device> getDevicesByRoomAndStatus(
        @PathVariable Long roomId,
        @PathVariable String status) {

    return deviceService.getDevicesByRoomAndStatus(roomId, status);
}
@GetMapping("/{id}/alert")
public String getDeviceAlert(@PathVariable Long id) {
    return deviceService.getDeviceAlert(id);
}
@GetMapping("/room/{roomId}/energy")
public double calculateRoomEnergy(
        @PathVariable Long roomId,
        @RequestParam double hours) {

    return deviceService.calculateRoomEnergy(roomId, hours);
}
@GetMapping("/room/{roomId}/cost")
public double calculateRoomCost(
        @PathVariable Long roomId,
        @RequestParam double hours,
        @RequestParam double rate) {

    return deviceService.calculateRoomCost(roomId, hours, rate);
}
@GetMapping("/highest-power")
public Device getHighestPowerDevice() {
    return deviceService.getHighestPowerDevice();
}
@GetMapping("/room/{roomId}/highest-power")
public Device getHighestPowerDeviceByRoom(@PathVariable Long roomId) {
    return deviceService.getHighestPowerDeviceByRoom(roomId);
}
@GetMapping("/power/total")
public double calculateTotalPower() {
    return deviceService.calculateTotalPower();
}
@GetMapping("/room/{roomId}/power")
public double calculateRoomPower(@PathVariable Long roomId) {
    return deviceService.calculateRoomPower(roomId);
}
@GetMapping("/room/{roomId}/power/active")
public double calculateActiveRoomPower(@PathVariable Long roomId) {
    return deviceService.calculateActiveRoomPower(roomId);
}
@GetMapping("/room/{roomId}/count/on")
public long countOnDevicesByRoom(@PathVariable Long roomId) {
    return deviceService.countOnDevicesByRoom(roomId);
}
@GetMapping("/room/{roomId}/count/off")
public long countOffDevicesByRoom(@PathVariable Long roomId) {
    return deviceService.countOffDevicesByRoom(roomId);
}
@GetMapping("/room/{roomId}/count")
public long countDevicesByRoom(@PathVariable Long roomId) {
    return deviceService.countDevicesByRoom(roomId);
}
@GetMapping("/room/{roomId}/alert")
public String getRoomAlert(@PathVariable Long roomId) {
    return deviceService.getRoomAlert(roomId);
}
@GetMapping("/room/{roomId}/alert-summary")
public RoomAlertResponse getRoomAlertSummary(@PathVariable Long roomId) {
    return deviceService.getRoomAlertSummary(roomId);
}
@GetMapping("/on")
public List<Device> getOnDevices() {
    return deviceService.getOnDevices();
}
@GetMapping("/off")
public List<Device> getOffDevices() {
    return deviceService.getOffDevices();
}
@GetMapping("/active/count")
public long countActiveDevices() {
    return deviceService.countActiveDevices();
}
@GetMapping("/room/{roomId}/on")
public List<Device> getOnDevicesByRoom(@PathVariable Long roomId) {
    return deviceService.getDevicesByRoomAndStatus(roomId, "ON");
}
@GetMapping("/room/{roomId}/summary")
public RoomDeviceSummaryResponse getRoomDeviceSummary(@PathVariable Long roomId) {
    return deviceService.getRoomDeviceSummary(roomId);
}
@GetMapping("/summary")
public CampusDeviceSummaryResponse getCampusDeviceSummary(
        @RequestParam double hours,
        @RequestParam double rate) {

    return deviceService.getCampusDeviceSummary(hours, rate);
}
@GetMapping("/{id}/energy/active")
public double calculateActiveEnergyConsumption(
        @PathVariable Long id,
        @RequestParam double hours) {

    return deviceService.calculateActiveEnergyConsumption(id, hours);
}
@GetMapping("/room/{roomId}/energy/active")
public double calculateActiveRoomEnergy(
        @PathVariable Long roomId,
        @RequestParam double hours) {

    return deviceService.calculateActiveRoomEnergy(roomId, hours);
}
@GetMapping("/room/{roomId}/cost/active")
public double calculateActiveRoomCost(
        @PathVariable Long roomId,
        @RequestParam double hours,
        @RequestParam double rate) {

    return deviceService.calculateActiveRoomCost(roomId, hours, rate);
}
@GetMapping("/highest-power/active")
public Device getHighestPowerActiveDevice() {
    return deviceService.getHighestPowerActiveDevice();
}
@GetMapping("/highest-power/room")
public HighestPowerRoomResponse getHighestPowerRoom() {
    return deviceService.getHighestPowerRoom();
}
@GetMapping("/alert-summary")
public CampusAlertSummaryResponse getCampusAlertSummary() {
    return deviceService.getCampusAlertSummary();
}
@GetMapping("/active-power")
public ActivePowerResponse getActivePower() {
    return deviceService.getActivePower();
}
@GetMapping("/room/{roomId}/active-power")
public RoomActivePowerResponse getRoomActivePower(@PathVariable Long roomId) {
    return deviceService.getRoomActivePower(roomId);
}
@GetMapping("/statistics")
public CampusStatisticsResponse getCampusStatistics() {
    return deviceService.getCampusStatistics();
}
@GetMapping("/high-power")
public List<Device> getHighPowerDevices(@RequestParam double threshold) {
    return deviceService.getHighPowerDevices(threshold);
}
@GetMapping("/room/{roomId}/high-power")
public List<Device> getHighPowerDevicesByRoom(
        @PathVariable Long roomId,
        @RequestParam double threshold) {

    return deviceService.getHighPowerDevicesByRoom(roomId, threshold);
}
@GetMapping("/active-high-power")
public List<Device> getActiveHighPowerDevices(
        @RequestParam double threshold) {

    return deviceService.getActiveHighPowerDevices(threshold);
}
@GetMapping("/room/{roomId}/energy-efficiency")
public RoomEnergyEfficiencyResponse getRoomEnergyEfficiency(
        @PathVariable Long roomId) {

    return deviceService.getRoomEnergyEfficiency(roomId);
}
@GetMapping("/energy-efficiency")
public CampusEnergyEfficiencyResponse getCampusEnergyEfficiency() {
    return deviceService.getCampusEnergyEfficiency();
}
@GetMapping("/high-power/summary")
public HighPowerDeviceSummaryResponse getHighPowerDeviceSummary(
        @RequestParam double threshold) {

    return deviceService.getHighPowerDeviceSummary(threshold);
}
@GetMapping("/floor/{floorId}")
public List<Device> getDevicesByFloorId(
        @PathVariable Long floorId) {

    return deviceService.getDevicesByFloorId(floorId);
}
@GetMapping("/floor/{floorId}/statistics")
public CampusFloorStatisticsResponse getFloorStatistics(
        @PathVariable Long floorId) {

    return deviceService.getFloorStatistics(floorId);
}
@GetMapping("/floor/{floorId}/on")
public List<Device> getOnDevicesByFloor(
        @PathVariable Long floorId) {

    return deviceService.getOnDevicesByFloor(floorId);
}
@GetMapping("/floor/{floorId}/off")
public List<Device> getOffDevicesByFloor(
        @PathVariable Long floorId) {

    return deviceService.getOffDevicesByFloor(floorId);
}
@GetMapping("/floor/{floorId}/active-power")
public double getActivePowerByFloor(
        @PathVariable Long floorId) {

    return deviceService.getActivePowerByFloor(floorId);
}
@GetMapping("/high-power/on")
public List<Device> getHighPowerOnDevices(
        @RequestParam double threshold) {

    return deviceService.getHighPowerOnDevices(threshold);
}
@GetMapping("/floor/{floorId}/total-power")
public double getTotalPowerByFloor(
        @PathVariable Long floorId) {

    return deviceService.getTotalPowerByFloor(floorId);
}
@GetMapping("/floor/{floorId}/high-power")
public List<Device> getHighPowerDevicesByFloor(
        @PathVariable Long floorId,
        @RequestParam double threshold) {

    return deviceService.getHighPowerDevicesByFloor(
            floorId,
            threshold
    );
}
}