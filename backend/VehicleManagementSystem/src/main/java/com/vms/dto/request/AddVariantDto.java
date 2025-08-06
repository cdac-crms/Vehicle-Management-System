package com.vms.dto.request;

import com.vms.entities.enums.FuelType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddVariantDto {
    private String name;
    private FuelType fuelType;
    private Long companyId; 
    private String description;
    private Integer seatingCapacity;

}

