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
    private String vehicle;
    private String registrationNo;
    private LocalDate bookingDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int totalDays;
    private double rentPerDay;
    private double totalAmount;
    private BookingStatus bookingStatus;

}

