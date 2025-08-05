package com.vms.services;


import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.vms.dto.request.VehicleRequestDto;
import com.vms.dto.response.ApiResponse;
import com.vms.dto.response.VehicleResponseDto;

public interface VehicleService {

//	Api to addVehicle with cloudinary support
    ApiResponse addVehicle(VehicleRequestDto dto, MultipartFile imageFile);
	List<VehicleResponseDto> getAllVehicles();
	VehicleResponseDto getVehicleById(Long vehicleId);
	ApiResponse updateVehicle(Long vehicleId, VehicleRequestDto dto, MultipartFile imageFile);
	ApiResponse deleteVehicle(Long vehicleId);

}
