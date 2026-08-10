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
