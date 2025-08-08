package com.vms.dto.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DrivingLicenseRequest {
	
	
	    private String licenseNumber;
	    private LocalDate expiryDate;
	    private Long userId;
	   
	


}
