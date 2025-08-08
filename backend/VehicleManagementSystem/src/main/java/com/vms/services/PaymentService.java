package com.vms.services;

import java.util.List;

import com.vms.dto.request.PaymentRequestDto;
import com.vms.dto.response.GetAllPaymentsDto;
import com.vms.dto.response.PaymentResponseDto;

public interface PaymentService {
	
	PaymentResponseDto createManualPayment(PaymentRequestDto dto);

    PaymentResponseDto getPaymentByBooking(Long bookingId, Long userId);
	
    List<GetAllPaymentsDto> getAllPayments();
    
}
