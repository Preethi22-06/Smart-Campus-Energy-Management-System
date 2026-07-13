package com.preethi.smartcampus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class SmartCampusEnergyManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartCampusEnergyManagementApplication.class, args);
	}

}
