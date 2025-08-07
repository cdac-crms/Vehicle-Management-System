package com.vms.services;

import java.util.List;
import com.vms.dto.response.GetAllPaymentsDto;

public interface PaymentService {
    List<GetAllPaymentsDto> getAllPayments();
}
