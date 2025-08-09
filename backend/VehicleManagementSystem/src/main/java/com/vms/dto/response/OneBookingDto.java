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
    private String name;
    private String companyName;
    private String fuelType;
    private double pricePerDay;
    private String registrationNumber;
    private String image;

    // Booking Info
    private Long bookingId;
    private LocalDate bookingDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private double totalAmount;
    private BookingStatus bookingStatus;
   

    // Customer Info
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;

    // Driving License Info
    private Long licenseNumber;
    private LocalDate expiryDate;
    private String licenseImage;
}
