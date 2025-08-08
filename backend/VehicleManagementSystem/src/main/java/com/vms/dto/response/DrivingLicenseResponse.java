package com.vms.dto.response;

import java.time.LocalDate;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.vms.entities.DrivingLicense;

import jakarta.persistence.SecondaryTables;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DrivingLicenseResponse {
	
	private Long licenseId;
	private Long licenseNumber;
	private LocalDate expiryDate;
	private Long userId;
	private String licenseImage;
	   
	    // Constructor that maps DrivingLicense entity to DTO
	    public DrivingLicenseResponse(DrivingLicense license) {
	        this.licenseImage = license.getLicenseImage();
	        this.licenseNumber = license.getLicenseNumber();
	        this.expiryDate = license.getExpiryDate();
	        // add this:
	       this.userId =  license.getUser().getId();
	       this.licenseId = license.getId();
	    }

	   
	

}
