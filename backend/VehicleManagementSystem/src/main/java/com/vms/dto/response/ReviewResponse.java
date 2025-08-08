package com.vms.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponse {

	private Long id;
    private Long rating;
    private String message;
    private Long vehicleId;
    private Long userId;
    private String userName;
    private LocalDateTime createdAt;
}
