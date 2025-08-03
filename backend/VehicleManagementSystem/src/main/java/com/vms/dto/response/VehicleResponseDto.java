package com.vms.dto.response;

import com.vms.entities.enums.AvailabilityStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleResponseDto {

    private Long id;
    private String registrationNumber;
    private String color;
    private String image;
    private AvailabilityStatus availabilityStatus;
    private BigDecimal pricePerDay;
    private int mileage;
    private String variantName;
    private String companyName;


}
