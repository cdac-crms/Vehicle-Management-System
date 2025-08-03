package com.vms.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vms.entities.Vehicle;

public interface VehicleDao  extends JpaRepository<Vehicle , Long>{

	boolean existsByRegistrationNumber(String name);

}
