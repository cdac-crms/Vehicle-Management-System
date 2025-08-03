package com.vms.services;


import java.util.List;

import com.vms.dto.request.VehicleRequestDto;
import com.vms.dto.response.ApiResponse;
import com.vms.dto.response.VehicleResponseDto;

public interface VehicleService {

	ApiResponse addVehicle(VehicleRequestDto addVehicleDto );
	List<VehicleResponseDto> getAllVehicles();
	VehicleResponseDto getVehicleById(Long vehicleId);
	ApiResponse updateVehicle(Long vehicleId, VehicleRequestDto dto);
	ApiResponse deleteVehicle(Long vehicleId);

}
