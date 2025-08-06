
package com.vms.servicesImpl;

import com.vms.dao.PaymentDao;
import com.vms.dto.response.GetAllPaymentsDto;
import com.vms.entities.Payment;
import com.vms.services.PaymentService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentDao paymentDao;

    @Override
    public List<GetAllPaymentsDto> getAllPayments() {
        return paymentDao.findAll().stream()
                .map(payment -> GetAllPaymentsDto.builder()
                        .paymentId(payment.getId())
                        .bookingId(payment.getBooking().getId())
                        .paymentMethod(payment.getPaymentMethod())
                        .paymentStatus(payment.getPaymentStatus())
                        .paidOn(payment.getCreatedOn())
                        .transactionId(payment.getTransactionId())
                        .amount(payment.getAmount())
                        .build())
                .toList();
    }
}
