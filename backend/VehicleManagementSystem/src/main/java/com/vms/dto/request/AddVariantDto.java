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

	  @NotNull(message = "Company ID is required")
	    @Positive(message = "Company ID must be a positive number")
	    private Long companyId;

	    @NotBlank(message = "Variant name is required")
	    @Size(max = 20, message = "Variant name must be at most 3 characters")
	    private String name;

	    @NotBlank(message = "Description is required")
	    @Size(max = 255, message = "Description must be at most 255 characters")
	    private String description;

	    private Integer seatingCapacity;

	    @NotNull(message = "Fuel type is required")
	    private FuelType fuelType;
    
}
