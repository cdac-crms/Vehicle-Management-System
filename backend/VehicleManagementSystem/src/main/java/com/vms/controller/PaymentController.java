package com.vms.controller;

import com.vms.dto.response.GetAllPaymentsDto;
import com.vms.services.PaymentService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/getAll")
    public ResponseEntity<List<GetAllPaymentsDto>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
}
