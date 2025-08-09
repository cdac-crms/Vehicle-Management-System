package com.vms.dto.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequestDto {

	private Long userId;
    private Long vehicleId;
    private LocalDate startDate;
    private LocalDate endDate;
	
}
