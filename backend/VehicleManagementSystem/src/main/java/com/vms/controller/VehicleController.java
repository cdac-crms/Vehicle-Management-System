package com.vms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vms.dto.request.VehicleRequestDto;
import com.vms.services.VariantService;
import com.vms.services.VehicleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/vehicle")
@RequiredArgsConstructor
public class VehicleController {

	private final VehicleService vehicleService;
	
	@PostMapping("/add-vehicle")
	public ResponseEntity<?>addVehicle(@RequestBody @Valid VehicleRequestDto addVehicleDto )
	{
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(vehicleService.addVehicle(addVehicleDto));
	}
	
		@GetMapping("/get-all")
		public ResponseEntity<?> getAllVehicles() {
			return ResponseEntity.ok(vehicleService.getAllVehicles());
		}

		@GetMapping("/{vehicleId}")
		public ResponseEntity<?> getVehicleById(@PathVariable Long vehicleId) {
			return ResponseEntity.ok(vehicleService.getVehicleById(vehicleId));
		}

		@PutMapping("/update/{vehicleId}")
		public ResponseEntity<?> updateVehicle(@PathVariable Long vehicleId,
											   @RequestBody @Valid VehicleRequestDto vehicleRequestDto) {
			return ResponseEntity.ok(vehicleService.updateVehicle(vehicleId, vehicleRequestDto));
		}

		@DeleteMapping("/delete/{vehicleId}")
		public ResponseEntity<?> deleteVehicle(@PathVariable Long vehicleId) {
			return ResponseEntity.ok(vehicleService.deleteVehicle(vehicleId));
		}
	
	
	
}


