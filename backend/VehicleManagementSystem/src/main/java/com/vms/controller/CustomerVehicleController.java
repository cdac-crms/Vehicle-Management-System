package com.vms.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vms.dto.request.VehicleDashboardDto;
import com.vms.dto.request.VehicleDetailsDto;
import com.vms.services.VehicleService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@AllArgsConstructor
public class CustomerVehicleController {
	
	 private final VehicleService vehicleService;

	    // List and search vehicles for the dashboard
	    @GetMapping
	    public ResponseEntity<List<VehicleDashboardDto>> getVehicles(
	        @RequestParam(name = "search", required = false) String search) {
	        List<VehicleDashboardDto> result = (search == null || search.isBlank())
	            ? vehicleService.findAllAvailableVehicles()
	            : vehicleService.searchVehicles(search);
	        return ResponseEntity.ok(result);
	    }

   
	    // Get vehicle details for a card
	    @GetMapping("/{id}")
	    public ResponseEntity<VehicleDetailsDto> getVehicleDetails(@PathVariable Long id) {
	        VehicleDetailsDto dto = vehicleService.findVehicleDetails(id);
	        return ResponseEntity.ok(dto);
	    }

	   
	   
	

}
