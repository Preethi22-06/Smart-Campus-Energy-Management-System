HEAD:README.md.txt
# Smart Campus Energy Management System

A backend system for monitoring and managing electricity usage across campus
buildings, floors, rooms, and devices.

## Features

- Building, floor, room, and device management
- Device ON/OFF status monitoring
- Room-wise device monitoring
- Floor-wise device monitoring
- Energy consumption calculation
- Energy cost calculation
- Active energy monitoring
- Total power monitoring
- Highest-power device detection
- Room-wise and floor-wise power monitoring
- High-power device detection
- Room and floor alert summaries
- Campus-level device statistics
- Energy efficiency monitoring
- Device energy summaries
- Input validation and exception handling
- REST API documentation using Swagger/OpenAPI
- Unit testing for service-layer functionality

## System Structure

The system follows a hierarchical structure:

Campus
→ Buildings
→ Floors
→ Rooms
→ Devices

Each device contains information such as:

- Device name
- Device type
- Power rating
- ON/OFF status
- Associated room

## Tech Stack

- Java 25
- Spring Boot
- Spring Data JPA
- MySQL
- Maven
- REST API
- Swagger / OpenAPI
- JUnit
- Mockito
- Postman
- Git & GitHub

## Project Architecture

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
=======
# Smart Campus Energy Management System

A backend system for monitoring and managing electricity usage across campus buildings, rooms, and devices.

## Features

- Device management
- Device ON/OFF status monitoring
- Room-wise device monitoring
- Energy consumption calculation
- Energy cost calculation
- Total power monitoring
- Highest-power device detection
- Room-wise power monitoring
- Room alerts for devices left ON
- Structured room alert summaries

## Tech Stack

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Maven
- REST API
- Postman
- Git & GitHub

## Current Progress

The backend currently supports device-level and room-level energy monitoring, power calculations, and alert functionality.

More features, frontend integration, testing, documentation, and deployment will be added as development continues.

## Example API

### Room Alert Summary

```text
GET /devices/room/{roomId}/alert-summary

