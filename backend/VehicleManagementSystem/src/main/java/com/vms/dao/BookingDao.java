package com.vms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vms.entities.Booking;

public interface BookingDao extends JpaRepository<Booking, Long>{

	
}