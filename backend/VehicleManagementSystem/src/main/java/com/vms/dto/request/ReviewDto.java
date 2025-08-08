package com.vms.dto.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
	
	private Long id;
    private String reviewerName;
    private String content;
    private int rating;
    private LocalDateTime createdOn;

}
