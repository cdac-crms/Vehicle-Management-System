package com.vms.controller;

import com.vms.dto.response.AllBookingDto;
import com.vms.dto.response.OneBookingDto;
import com.vms.entities.enums.BookingStatus;
import com.vms.services.BookingService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {

	private final BookingService bookingService;

	@GetMapping("/getAllBookings")
	public ResponseEntity<List<AllBookingDto>> getAllBookings() {
		return ResponseEntity.ok(bookingService.getAllBookings());
	}

	@GetMapping("/getBooking/{id}")
	public ResponseEntity<OneBookingDto> getBookingById(@PathVariable Long id) {
		return ResponseEntity.ok(bookingService.getBookingById(id));
	}
	

	@PutMapping("/updateBookingStatus/{id}")
	public ResponseEntity<String> updateBookingStatus(
	        @PathVariable Long id,
	        @RequestParam BookingStatus status) {
	    return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
	}

}
