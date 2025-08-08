package com.vms.controller;



import com.vms.dto.request.PaymentRequestDto;
import com.vms.dto.response.GetAllPaymentsDto;
import com.vms.dto.response.PaymentResponseDto;
import com.vms.services.PaymentService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    
 // 1. CREATE payment (POST)
    @PostMapping
    public ResponseEntity<PaymentResponseDto> createPayment(
            @RequestBody PaymentRequestDto dto
    ) {
        PaymentResponseDto responseDto = paymentService.createManualPayment(dto);
        return ResponseEntity.status(201).body(responseDto);
    }

    // 2. GET payment by booking
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<PaymentResponseDto> getByBooking(
            @PathVariable Long bookingId,
            @RequestParam Long userId
    ) {
        PaymentResponseDto payment = paymentService.getPaymentByBooking(bookingId, userId);
        return ResponseEntity.ok(payment);
    }
    

    @GetMapping("/getAll")
    public ResponseEntity<List<GetAllPaymentsDto>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
}
