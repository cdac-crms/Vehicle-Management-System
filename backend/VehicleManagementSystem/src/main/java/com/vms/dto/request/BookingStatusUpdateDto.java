package com.vms.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.vms.entities.enums.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingStatusUpdateDto {

	private BookingStatus bookingStatus;
	
}
