package com.VehicleManagementSystem.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;


	public class Vehicle extends BaseEntity {

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "variant_id", nullable = false)
	    private Variant variant;

	    @Column(name = "registration_number", length = 50, unique = true, nullable = false)
	    private String registrationNumber;

	    @Column(length = 50)
	    private String color;

	    @Lob
	    private String image;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "availability_status", length = 20)
	    private AvailabilityStatus availabilityStatus = AvailabilityStatus.AVAILABLE;

	    @Column(name = "price_per_day", precision = 10, scale = 2)
	    private BigDecimal pricePerDay;

	    @Column(name = "mileage",nullable = false)
	    private int mileage;
	    
	    
	    @UpdateTimestamp
		@Column(name="updated_on")
		private LocalDate updatedOn;
		
	    
	    private String x1;
	    private String x2;
	}


