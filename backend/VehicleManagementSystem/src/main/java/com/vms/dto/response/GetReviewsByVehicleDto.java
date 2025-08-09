package com.vms.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class GetReviewsByVehicleDto {
    private Long id;
    private Long rating;
    private String message;
    private String customerName;
    private String variantName;  // renamed from variantName to vehicleName
}
