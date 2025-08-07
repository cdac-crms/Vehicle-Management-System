package com.vms.dto.response;

import com.vms.entities.enums.PaymentMethod;
import com.vms.entities.enums.PaymentStatus;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetAllPaymentsDto {
    private Long paymentId;
    private Long bookingId;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private LocalDateTime paidOn;
    private String transactionId;
    private BigDecimal amount;
}
