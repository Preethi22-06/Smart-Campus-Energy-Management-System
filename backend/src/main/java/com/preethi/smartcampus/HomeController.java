package com.preethi.smartcampus;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Smart Campus Energy Management System!";
    }

    @GetMapping("/health")
    public String health() {
        return "Backend is running successfully!";
    }
}

