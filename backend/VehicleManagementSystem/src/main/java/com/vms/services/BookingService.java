package com.vms.services;

import java.util.List;

import com.vms.dto.request.BookedRangeDto;
import com.vms.dto.request.BookingRequestDto;
import com.vms.dto.response.AllBookingDto;
import com.vms.dto.response.BookingResponseDto;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.dto.response.OneBookingDto;
import com.vms.entities.enums.BookingStatus;

public interface BookingService {
    List<AllBookingDto> getAllBookings();
	OneBookingDto getBookingById(Long id);
	String updateBookingStatus(Long bookingId, BookingStatus status);
	
	
    List<BookedRangeDto> getBookedDateRanges(Long vehicleId);
    BookingResponseDto createBooking(BookingRequestDto requestDto);   
    List<BookingResponseDto> getBookingsForUser(Long userId);
    BookingResponseDto getBookingForUser(Long userId, Long bookingId);
    CustomerApiResponse cancelBooking(Long userId, Long bookingId);
	

	
}
