package com.vms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vms.entities.Vehicle;

public interface VehicleDao  extends JpaRepository<Vehicle , Long>{

	boolean existsByRegistrationNumber(String name);
	Optional<Vehicle> findByRegistrationNumber(String registrationNumber);

}
