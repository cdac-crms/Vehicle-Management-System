
package com.vms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vms.entities.Booking;
import com.vms.entities.Payment;

public interface PaymentDao extends JpaRepository<Payment, Long> {
	
	Optional<Payment> findByBooking(Booking booking);
	
}
