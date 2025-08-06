package com.vms.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetAllReviewsDto {

    private Long id;
    private Long rating;
    private String message;
    private String customerName;   // firstName + lastName (done in service)
    private String variantName;    // vehicle.variant.name
}
