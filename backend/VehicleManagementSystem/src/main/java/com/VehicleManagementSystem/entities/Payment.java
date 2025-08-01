package com.VehicleManagementSystem.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.VehicleManagementSystem.entities.enums.PaymentMethod;
import com.VehicleManagementSystem.entities.enums.PaymentStatus;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payments")
@AttributeOverride(name = "id", column = @Column(name = "payment_id"))
public class Payment extends BaseEntity{

// In Booking Class Add this below:
//	@OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
//	private Payment payment;


    @Column(name = "amount", precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "transaction_id", length = 100)
    private String transactionId; // General, can use Razorpay payment id


    // Razorpay specific fields
    @Column(name = "razorpay_payment_id", length = 100)
    private String razorpayPaymentId;    // Razorpay payment id

    @Column(name = "razorpay_order_id", length = 100)
    private String razorpayOrderId;      // Razorpay order id (if used)

    @Column(name = "razorpay_signature", length = 200)
    private String razorpaySignature;    // Razorpay signature (for verification)
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod; // CARD, UPI, etc.

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING; // PAID, FAILED, PENDING
    

}

