package com.vms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vms.dto.request.AddVariantDto;
import com.vms.services.VariantService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/variant")
@RequiredArgsConstructor
public class VariantController {

	private final VariantService variantService;
	
	@CrossOrigin(origins = "http://localhost:5174")
	@PostMapping("/addVariant")
	public ResponseEntity<?> addVariant(@RequestBody @Valid AddVariantDto addVariantDto )
	{
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(variantService.addVariant(addVariantDto));
	}
	
	@CrossOrigin(origins = "http://localhost:5174")
	  @GetMapping("/getAllVariants")
	    public ResponseEntity<?> getAllVariants() {
	        return ResponseEntity.ok(variantService.getAllVariants());
	    }
	  
	  
	@CrossOrigin(origins = "http://localhost:5174")
	    @GetMapping("/getVariant/{variantId}")
	    public ResponseEntity<?> getVariantById(@PathVariable Long variantId) {
	        return ResponseEntity.ok(variantService.getVariantById(variantId));
	    }
	
}
