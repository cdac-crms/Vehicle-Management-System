package com.vms.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vms.entities.enums.AvailabilityStatus;
import com.vms.entities.Vehicle;

public interface VehicleDao  extends JpaRepository<Vehicle , Long>{

	boolean existsByRegistrationNumber(String name);
	Optional<Vehicle> findByRegistrationNumber(String registrationNumber);
	
	List<Vehicle> findByAvailabilityStatus(AvailabilityStatus status);

    @Query("SELECT v FROM Vehicle v WHERE v.availabilityStatus = 'AVAILABLE' AND " +
           "(LOWER(v.variant.name) LIKE %:search% OR " +
           "LOWER(v.variant.company.name) LIKE %:search% OR " +
           "LOWER(v.variant.fuelType) LIKE %:search% OR " +
           "STR(v.variant.seatingCapacity) LIKE %:search%)")
    List<Vehicle> searchAvailableVehicles(@Param("search") String search);

}
