package com.vms.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.vms.entities.Variant;
import com.vms.entities.enums.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDto {
    
    private Long bookingId;
    private Long userId;
    private Long vehicleId;
    private LocalDate startDate;           // matches startDate on entity
    private LocalDate endDate;             // matches endDate
    private BookingStatus bookingStatus;

    // Extended for frontend ease:
    private String carName;
    private String variant;
    private Double pricePerDay;
    private LocalDate bookingDate;
    private Double totalAmount;
}
