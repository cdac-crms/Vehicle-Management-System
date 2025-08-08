package com.vms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vms.entities.DrivingLicense;



public interface DrivingLicenseDao extends JpaRepository<DrivingLicense, Long> {
	
	Optional<DrivingLicense> findByUserId(Long userId);


}