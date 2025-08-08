package com.vms.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.vms.entities.enums.PaymentMethod;
import com.vms.entities.enums.PaymentStatus;



@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment")
@AttributeOverride(name = "id", column = @Column(name = "payment_id"))
public class Payment extends BaseEntity{

// In Booking Class Add this below:
//	@OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
//	private Payment payment;


    @Column(name = "amount", precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "transaction_id",unique = true, length = 100)
    private String transactionId; // General, can use Razorpay payment id


    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod; // CARD, UPI, etc.

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING; // PAID, FAILED, PENDING
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    

   
}

