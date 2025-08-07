package com.vms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vms.dto.request.VehicleRequestDto;
import com.vms.dto.response.ApiResponse;
import com.vms.services.VariantService;
import com.vms.services.VehicleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/admin/vehicle")
@RequiredArgsConstructor
public class VehicleController {

	private final VehicleService vehicleService;
	
	@PostMapping(value = "/addVehicle", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> addVehicle(
	    @RequestParam("data") String data,
	    @RequestPart("image") MultipartFile imageFile
	) {
	    try {
	        ObjectMapper mapper = new ObjectMapper();
	        VehicleRequestDto dto = mapper.readValue(data, VehicleRequestDto.class);

	        // Delegate to service
	        ApiResponse response = vehicleService.addVehicle(dto, imageFile);

	        return ResponseEntity.status(HttpStatus.CREATED).body(response);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error: " + e.getMessage());
	    }
	}
	
		@GetMapping("/getAllVehicles")
		public ResponseEntity<?> getAllVehicles() {
			return ResponseEntity.ok(vehicleService.getAllVehicles());
		}

		@GetMapping("/{vehicleId}")
		public ResponseEntity<?> getVehicleById(@PathVariable Long vehicleId) {
			return ResponseEntity.ok(vehicleService.getVehicleById(vehicleId));
		}

		@PutMapping(value = "/update/{vehicleId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
		public ResponseEntity<?> updateVehicle(
			    @PathVariable Long vehicleId,
			    @RequestParam("data") String data,
			    @RequestPart(value = "image", required = false) MultipartFile imageFile
			) {
			    try {
			        ObjectMapper mapper = new ObjectMapper();
			        VehicleRequestDto dto = mapper.readValue(data, VehicleRequestDto.class);

			        // Delegate to service
			        ApiResponse response = vehicleService.updateVehicle(vehicleId, dto, imageFile);

			        return ResponseEntity.ok(response);
			    } catch (Exception e) {
			        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
			                .body("Error: " + e.getMessage());
			    }
			}

		@DeleteMapping("/delete/{vehicleId}")
		public ResponseEntity<?> deleteVehicle(@PathVariable Long vehicleId) {
			return ResponseEntity.ok(vehicleService.deleteVehicle(vehicleId));
		}
	
	
	
}


