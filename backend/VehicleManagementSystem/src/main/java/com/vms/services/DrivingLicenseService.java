package com.vms.services;

import java.io.IOException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vms.dto.request.DrivingLicenseRequest;
import com.vms.dto.response.DrivingLicenseResponse;



@Service
public interface DrivingLicenseService {

	DrivingLicenseResponse createLicense(DrivingLicenseRequest license, MultipartFile imageFile)
			throws IOException;

	DrivingLicenseResponse updateLicense(Long licenseId, DrivingLicenseRequest licenseRequest, MultipartFile imageFile)
			throws IOException;

	Optional<DrivingLicenseResponse> getLicenseByUserId(Long userId);
	
	

}
