package com.vms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vms.dto.request.AddCompanyDto;
import com.vms.services.CompanyService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/add-company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;
	
	@PostMapping("/")
	public ResponseEntity<?> addCompany(@RequestBody @Valid AddCompanyDto addCompanyDto )
	{
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(companyService.addCompany(addCompanyDto));
	}

	
	@GetMapping("/getAllCompanies")
	public ResponseEntity<?> getAllCompanies() {
	    return ResponseEntity.ok(companyService.getAllCompanies());
	}

	
}
