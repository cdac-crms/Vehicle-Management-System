package com.vms.servicesImpl;


import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.vms.custom_exceptions.ApiException;
import com.vms.custom_exceptions.ResourceNotFoundException;
import com.vms.dao.VariantDao;
import com.vms.dao.VehicleDao;
import com.vms.dto.request.VehicleRequestDto;
import com.vms.dto.response.ApiResponse;
import com.vms.dto.response.VehicleResponseDto;
import com.vms.entities.Variant;
import com.vms.entities.Vehicle;
import com.vms.services.VehicleService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class VehicleServiceImpl  implements VehicleService{

	private final VehicleDao vehicleDao;
	private final ModelMapper modelMapper;
	private final VariantDao variantDao;

	
	@Override
	public ApiResponse addVehicle(VehicleRequestDto addVehicleDto) {
		 
		 if(vehicleDao.existsByRegistrationNumber(addVehicleDto.getRegistrationNumber()))
		 {
			 throw new ApiException("Vehicle with this Registeration number already Exist.");
		 }
		 
		  Variant variant = variantDao.findById(addVehicleDto.getVariant())
		            .orElseThrow(() -> new ApiException("Invalid Variant ID: " + addVehicleDto.getVariant()));

		 
		 Vehicle vehicle = modelMapper.map(addVehicleDto , Vehicle.class);
	     
		    vehicle.setVariant(variant);

		 vehicleDao.save(vehicle); 
 
		 return  new ApiResponse("Vehicle Added Succesfully"); 
	}
	
    @Override
    public List<VehicleResponseDto> getAllVehicles() {
        return vehicleDao.findAll().stream().map(vehicle -> {
            VehicleResponseDto dto = modelMapper.map(vehicle, VehicleResponseDto.class);
            dto.setVariantName(vehicle.getVariant().getName());
            dto.setCompanyName(vehicle.getVariant().getCompany().getName());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public VehicleResponseDto getVehicleById(Long vehicleId) {
        Vehicle vehicle = vehicleDao.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("VehicleId " + vehicleId));

        VehicleResponseDto dto = modelMapper.map(vehicle, VehicleResponseDto.class);
        dto.setVariantName(vehicle.getVariant().getName());
        dto.setCompanyName(vehicle.getVariant().getCompany().getName());
        
        return dto;
    }

    @Override
    public ApiResponse updateVehicle(Long vehicleId, VehicleRequestDto dto) {
        Vehicle vehicle = vehicleDao.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("VehicleId "+ vehicleId));

        Variant variant = variantDao.findById(dto.getVariant())
                .orElseThrow(() -> new ResourceNotFoundException("VariantId" + dto.getVariant()));

        vehicle.setVariant(variant);
        vehicle.setRegistrationNumber(dto.getRegistrationNumber());
        vehicle.setColor(dto.getColor());
        vehicle.setImage(dto.getImage());
        vehicle.setAvailabilityStatus(dto.getAvailabilityStatus());
        vehicle.setPricePerDay(dto.getPricePerDay());
        vehicle.setMileage(dto.getMileage());
       
        vehicleDao.save(vehicle);

        return new ApiResponse("Vehicle updated successfully.");
    }

    @Override
    public ApiResponse deleteVehicle(Long vehicleId) {
        Vehicle vehicle = vehicleDao.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("VehicleId " + vehicleId));

        vehicleDao.delete(vehicle);
        return new ApiResponse("Vehicle deleted successfully.");
    }
	
	
	
}
