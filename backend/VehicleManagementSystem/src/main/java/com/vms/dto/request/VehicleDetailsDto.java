package com.vms.dto.request;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDetailsDto {

	private Long id;
    private String name;
    private String company;
    private String image;
    private BigDecimal pricePerDay;
    private String fuel;
    private Integer capacity;
    private double rating;
    private String registrationNumber;
    private String color;
    private int mileage;
    private String description;
	
}
