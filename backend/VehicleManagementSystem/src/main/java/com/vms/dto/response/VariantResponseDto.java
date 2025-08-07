package com.vms.dto.response;

import com.vms.entities.enums.FuelType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantResponseDto {
    private Long id;
    private String name;
    private String description;
    private Integer seatingCapacity;
    private FuelType fuelType;
    private String companyName;
}
