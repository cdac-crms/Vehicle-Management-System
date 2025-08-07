package com.vms.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vms.dto.request.BookedRangeDto;
import com.vms.dto.request.BookingRequestDto;
import com.vms.dto.response.BookingResponseDto;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.services.BookingService;

//import com.crms.dto.ErrorResponseDTO;



import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;




import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/customer/booking")
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@AllArgsConstructor
public class CustomerBookingController {
	
	private final BookingService bookingService;

    // Get all booked date ranges (for frontend calendar gutter)
    @GetMapping("/vehicle/{vehicleId}/ranges")
    public ResponseEntity<List<BookedRangeDto>> getBookedRanges(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(bookingService.getBookedDateRanges(vehicleId));
    }

    // Create a booking (POST)
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequestDto bookingDto) {
       
    	   
            BookingResponseDto response = bookingService.createBooking(bookingDto);
            return ResponseEntity.status(201).body(response);
        
    }

    // 1. List my bookings
    @GetMapping
    public ResponseEntity<List<BookingResponseDto>> getBookingsForUser(
            @RequestParam("userId") Long userId // Remove this after security/JWT!
    ) {
        return ResponseEntity.ok(bookingService.getBookingsForUser(userId));
    }

    // 2. Get details for my booking
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponseDto> getBookingForUser(
            @PathVariable Long bookingId,
            @RequestParam("userId") Long userId // Remove after security!
    ) {
        return ResponseEntity.ok(bookingService.getBookingForUser(userId, bookingId));
    }

    // 3. Cancel my booking
    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<CustomerApiResponse> cancelBooking(
            @PathVariable Long bookingId,
            @RequestParam("userId") Long userId // Remove after security!
    ) {
        return ResponseEntity.ok(bookingService.cancelBooking(userId, bookingId));
    }
    


}
