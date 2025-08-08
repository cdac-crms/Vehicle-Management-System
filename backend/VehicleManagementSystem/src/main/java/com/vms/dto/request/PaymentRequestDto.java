package com.vms.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDto {

	   private Long bookingId;
	    private double amount;
	    private String paymentMethod; // "CARD", "UPI", etc.
	    private Long userId; // Optional, use if needed in controller
	
}
