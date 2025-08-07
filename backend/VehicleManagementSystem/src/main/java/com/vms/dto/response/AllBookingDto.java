package com.vms.dto.response;


import java.time.LocalDate;

import com.vms.entities.enums.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AllBookingDto {

    private Long id;
    private String customerName;
    private String name;
    private String registrationNumber;
    private LocalDate bookingDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int totalDays;
    private double pricePerDay;
    private double totalAmount;
    private BookingStatus bookingStatus;

}

