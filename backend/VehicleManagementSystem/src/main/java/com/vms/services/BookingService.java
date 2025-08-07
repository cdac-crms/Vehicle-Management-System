package com.vms.services;

import java.util.List;
import com.vms.dto.response.AllBookingDto;
import com.vms.dto.response.OneBookingDto;
import com.vms.entities.enums.BookingStatus;

public interface BookingService {
    List<AllBookingDto> getAllBookings();
	OneBookingDto getBookingById(Long id);
	String updateBookingStatus(Long bookingId, BookingStatus status);

	
}
