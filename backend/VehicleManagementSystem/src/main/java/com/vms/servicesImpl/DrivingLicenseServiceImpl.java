package com.vms.servicesImpl;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.vms.dao.DrivingLicenseDao;
import com.vms.dao.UserDao;
import com.vms.dto.request.DrivingLicenseRequest;
import com.vms.dto.response.DrivingLicenseResponse;
import com.vms.entities.DrivingLicense;
import com.vms.entities.User;
import com.vms.services.DrivingLicenseService;
import com.vms.utils.CloudinaryService;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class DrivingLicenseServiceImpl implements DrivingLicenseService{
	

    private final UserDao userDao;
    private final DrivingLicenseDao drivingLicenseDao;
    private final CloudinaryService cloudinaryService;
    private final ModelMapper modelMapper;


    public DrivingLicenseResponse createLicense(DrivingLicenseRequest licenseRequest, MultipartFile imageFile) throws IOException {
        if (licenseRequest.getUserId() == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }

        // Corrected: check if license already exists for this user
        Optional<DrivingLicense> existing = drivingLicenseDao.findByUserId(licenseRequest.getUserId());
        if (existing.isPresent()) {
            throw new IllegalStateException("Driving license already exists for user " + licenseRequest.getUserId());
        }

        // Fetch user entity
        User user = userDao.findById(licenseRequest.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Upload image to Cloudinary
        String imageUrl = cloudinaryService.uploadFile(imageFile);

        // Map fields from DTO to Entity
        DrivingLicense drivingLicense = modelMapper.map(licenseRequest, DrivingLicense.class);
        drivingLicense.setUser(user);
        drivingLicense.setLicenseImage(imageUrl);

        // Persist to DB
        drivingLicenseDao.save(drivingLicense);

        // Return DTO response
        return modelMapper.map(drivingLicense, DrivingLicenseResponse.class);
    }

   
    
    public DrivingLicenseResponse updateLicense(Long licenseId, DrivingLicenseRequest licenseRequest, MultipartFile imageFile) throws IOException {
        // Fetch existing license entity
        DrivingLicense license = drivingLicenseDao.findById(licenseId)
            .orElseThrow(() -> new RuntimeException("License not found"));

        // Partial update: set only fields present (manual to avoid accidental null overwrite)
        if (licenseRequest.getLicenseNumber() != null && !licenseRequest.getLicenseNumber().trim().isEmpty()) {
            try {
                license.setLicenseNumber(Long.parseLong(licenseRequest.getLicenseNumber().trim()));
            } catch (NumberFormatException e) {
                throw new RuntimeException("Invalid license number format");
            }
        }

        if (licenseRequest.getExpiryDate() != null) {
            license.setExpiryDate(licenseRequest.getExpiryDate());
        }

        // If new image provided, upload to Cloudinary & update
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(imageFile);
			license.setLicenseImage(imageUrl);
        }

        DrivingLicense savedLicense = drivingLicenseDao.save(license);

        return modelMapper.map(savedLicense, DrivingLicenseResponse.class);
    }

  
    public Optional<DrivingLicenseResponse> getLicenseByUserId(Long userId) {
        return drivingLicenseDao.findByUserId(userId)
            .map(entity -> modelMapper.map(entity, DrivingLicenseResponse.class));
    }
}
