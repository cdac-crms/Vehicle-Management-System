package com.vms.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.vms.entities.Booking;
import com.vms.entities.enums.BookingStatus;

public interface BookingDao extends JpaRepository<Booking, Long>{

	

	List<Booking> findByUserId(Long userId);
	
	List<Booking> findByVehicleIdAndBookingStatus(Long vehicleId, BookingStatus bookingStatus);
	
	
	@Query("SELECT b FROM Booking b WHERE b.vehicle.id = :vehicleId " +
		       "AND b.bookingStatus IN :statuses " +
		       "AND (b.startDate <= :endDate AND b.endDate >= :startDate)")
		List<Booking> findOverlappingBookings(
		    @Param("vehicleId") Long vehicleId,
		    @Param("startDate") LocalDate startDate,
		    @Param("endDate") LocalDate endDate,
		    @Param("statuses") List<BookingStatus> statuses
		);
	
	
}