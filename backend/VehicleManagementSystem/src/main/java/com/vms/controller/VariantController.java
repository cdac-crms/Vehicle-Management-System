package com.vms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	
	@PostMapping("/add-variant")
	public ResponseEntity<?> addVariant(@RequestBody @Valid AddVariantDto addVariantDto )
	{
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(variantService.addVariant(addVariantDto));
	}
	
}
