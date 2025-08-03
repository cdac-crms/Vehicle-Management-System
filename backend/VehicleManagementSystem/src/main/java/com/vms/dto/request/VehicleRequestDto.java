package com.vms.dto.request;

import com.vms.entities.enums.AvailabilityStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleRequestDto {

    private Long variant;

    private String registrationNumber;

    private String color;

    private String image;

    private AvailabilityStatus availabilityStatus;

    private BigDecimal pricePerDay;

    private int mileage;

}
