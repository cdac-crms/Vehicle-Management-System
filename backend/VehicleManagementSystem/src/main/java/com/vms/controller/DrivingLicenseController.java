package com.vms.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vms.dto.request.DrivingLicenseRequest;
import com.vms.dto.response.DrivingLicenseResponse;
import com.vms.services.DrivingLicenseService;

import io.swagger.v3.oas.annotations.Parameter;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/customer/drivingLicense")
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@AllArgsConstructor
public class DrivingLicenseController {

    private final DrivingLicenseService drivingLicenseService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DrivingLicenseResponse> createLicense(
        @ModelAttribute("license") DrivingLicenseRequest license,
        @Parameter(description = "Driving license image file")
        @RequestParam("imageFile") MultipartFile file
    ) throws IOException {
        Long userId = license.getUserId();
        // Check if a license already exists for this user
        Optional<DrivingLicenseResponse> existing = drivingLicenseService.getLicenseByUserId(userId);
        if (existing.isPresent()) {
            // Conflict: License already exists for this user
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        DrivingLicenseResponse resp = drivingLicenseService.createLicense(license, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PutMapping(value = "/{licenseId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DrivingLicenseResponse> updateLicense(
        @PathVariable Long licenseId,
        @ModelAttribute("license") DrivingLicenseRequest license,
        @Parameter(description = "Driving license image file")
        @RequestPart(required = false, value = "imageFile") MultipartFile file
    ) throws IOException {
        DrivingLicenseResponse resp = drivingLicenseService.updateLicense(licenseId, license, file);
        return ResponseEntity.ok(resp);
    }

    /**
     * Get driving license by userId path variable
     * Example: GET /customer/drivingLicense/user/123
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<DrivingLicenseResponse> getDrivingLicenseByUserId(@PathVariable Long userId) {
        Optional<DrivingLicenseResponse> licenseOpt = drivingLicenseService.getLicenseByUserId(userId);
        return licenseOpt
            .map(license -> new ResponseEntity<>(license, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
