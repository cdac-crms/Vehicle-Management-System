package com.vms.servicesImpl;


import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.vms.custom_exceptions.ApiException;
import com.vms.custom_exceptions.ResourceNotFoundException;
import com.vms.dao.VariantDao;
import com.vms.dao.VehicleDao;
import com.vms.dto.request.VehicleDashboardDto;
import com.vms.dto.request.VehicleDetailsDto;
import com.vms.dto.request.VehicleRequestDto;
import com.vms.dto.response.ApiResponse;
import com.vms.dto.response.VehicleResponseDto;
import com.vms.entities.Variant;
import com.vms.entities.Vehicle;
import com.vms.entities.enums.AvailabilityStatus;
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
    private final Cloudinary cloudinary;

	
    @Override
    public List<VehicleDashboardDto> findAllAvailableVehicles() {
        return vehicleDao.findByAvailabilityStatus(AvailabilityStatus.AVAILABLE)
                .stream()
                .map(this::toDashboardDto)
                .toList();
    }
    
    @Override
    public List<VehicleDashboardDto> searchVehicles(String search) {
        return vehicleDao.searchAvailableVehicles(search.toLowerCase())
                .stream()
                .map(this::toDashboardDto)
                .toList();
    }
    
    @Override
    public VehicleDetailsDto findVehicleDetails(Long vehicleId) {
        Vehicle vehicle = vehicleDao.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        VehicleDetailsDto dto = modelMapper.map(vehicle, VehicleDetailsDto.class);
        dto.setName(vehicle.getVariant().getName());
        dto.setCompany(vehicle.getVariant().getCompany().getName());
        dto.setFuel(vehicle.getVariant().getFuelType().toString());
        dto.setCapacity(vehicle.getVariant().getSeatingCapacity());
        // Set rating (implement average rating logic)
        dto.setRating(0.0);
        // Image is now a Cloudinary URL
        dto.setImage(vehicle.getImage());
        return dto;
    }

 // Helper to fill in card details
    private VehicleDashboardDto toDashboardDto(Vehicle v) {
        VehicleDashboardDto dto = modelMapper.map(v, VehicleDashboardDto.class);
        dto.setName(v.getVariant().getName());
        dto.setCompany(v.getVariant().getCompany().getName());
        dto.setFuel(v.getVariant().getFuelType().toString());
        dto.setCapacity(v.getVariant().getSeatingCapacity());
        // Set rating (implement average rating logic)
        dto.setRating(0.0);
        // Image is now a Cloudinary URL
        dto.setImage(v.getImage());
        return dto;
    }
    
    
    
    
    @Override
    public ApiResponse addVehicle(VehicleRequestDto dto, MultipartFile imageFile) {

        // Check for duplicate registration number
        if (vehicleDao.existsByRegistrationNumber(dto.getRegistrationNumber())) {
            throw new ApiException("Vehicle with this registration number already exists.");
        }

        // Find Variant
        Variant variant = variantDao.findById(dto.getVariant())
                .orElseThrow(() -> new ResourceNotFoundException("Variant not found"));

        // Upload image to Cloudinary
        String imageUrl = null;
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(imageFile.getBytes(),
                    Map.of("folder", "vehicle_images"));
            imageUrl = uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new ApiException("Image upload failed: " + e.getMessage());
        }

        // Map DTO to Entity
        Vehicle vehicle = modelMapper.map(dto, Vehicle.class);
        vehicle.setImage(imageUrl);
        vehicle.setVariant(variant);

        vehicleDao.save(vehicle);

        return new ApiResponse("Vehicle added successfully");
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
    public ApiResponse updateVehicle(Long vehicleId, VehicleRequestDto dto, MultipartFile imageFile) {
        Vehicle vehicle = vehicleDao.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("VehicleId " + vehicleId));

        Variant variant = variantDao.findById(dto.getVariant())
                .orElseThrow(() -> new ResourceNotFoundException("VariantId " + dto.getVariant()));

        // Check if registration number already exists in another vehicle
        Optional<Vehicle> vehicleWithRegNum = vehicleDao.findByRegistrationNumber(dto.getRegistrationNumber());
        if (vehicleWithRegNum.isPresent() && !vehicleWithRegNum.get().getId().equals(vehicleId)) {
            throw new IllegalArgumentException("Registration number already exists for another vehicle.");
        }

        // Update variant and other vehicle fields
        vehicle.setVariant(variant);
        vehicle.setRegistrationNumber(dto.getRegistrationNumber());
        vehicle.setColor(dto.getColor());
        vehicle.setAvailabilityStatus(dto.getAvailabilityStatus());
        vehicle.setPricePerDay(dto.getPricePerDay());
        vehicle.setMileage(dto.getMileage());

        // If imageFile is present and not empty, upload new image and update vehicle image URL
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                Map<?, ?> uploadResult = cloudinary.uploader().upload(imageFile.getBytes(),
                        Map.of("folder", "vehicle_images"));
                String imageUrl = uploadResult.get("secure_url").toString();
                vehicle.setImage(imageUrl);
            } catch (IOException e) {
                throw new ApiException("Image upload failed: " + e.getMessage());
            }
        }

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
