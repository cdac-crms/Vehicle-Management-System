package com.vms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDto {

	private Long paymentId;
    private double amount;
    private String transactionId;
    private String paymentMethod;
    private String paymentStatus;
    private Long bookingId;
}
