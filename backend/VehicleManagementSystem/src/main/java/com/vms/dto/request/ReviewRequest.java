package com.vms.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {
	
	private Long vehicleId;
    private Long userId;
    private Integer rating;
    private String message;

}
