package com.vms.dto.response;

import com.vms.entities.enums.BookingStatus;
import com.vms.entities.enums.FuelType;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OneBookingDto {

    // Vehicle Info
    private String variantName;
    private String companyName;
    private FuelType fuelType;
    private double pricePerDay;
    private String registrationNumber;

    // Booking Info
    private Long bookingId;
    private LocalDate bookingDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private double totalFare;
    private BookingStatus bookingStatus;
   

    // Customer Info
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;

    // Driving License Info
    private Long licenseNumber;
    private String licenseImage;
}
