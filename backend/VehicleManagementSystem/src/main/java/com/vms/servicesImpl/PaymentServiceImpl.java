
package com.vms.servicesImpl;



import com.vms.dao.BookingDao;
import com.vms.dao.PaymentDao;
import com.vms.dto.request.PaymentRequestDto;
import com.vms.dto.response.GetAllPaymentsDto;
import com.vms.dto.response.PaymentResponseDto;
import com.vms.entities.Booking;
import com.vms.entities.Payment;
import com.vms.entities.enums.BookingStatus;
import com.vms.entities.enums.PaymentMethod;
import com.vms.entities.enums.PaymentStatus;
import com.vms.services.PaymentService;

import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentDao paymentDao;
    private final BookingDao bookingDao;
    private final ModelMapper modelMapper;
    
    
    @Override
    public PaymentResponseDto createManualPayment(PaymentRequestDto dto) {
        // Find booking and check user ownership
        Booking booking = bookingDao.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getUser() == null || !booking.getUser().getId().equals(dto.getUserId())) {
            throw new RuntimeException("Unauthorized: Booking does not belong to userId");
        }

       //  Optionally allow payment only for confirmed bookings
         if (booking.getBookingStatus() != BookingStatus.CONFIRMED) {
             throw new RuntimeException("Payment only allowed for CONFIRMED bookings");
         }

        // Build payment entity
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(BigDecimal.valueOf(dto.getAmount()));
        payment.setPaymentMethod(PaymentMethod.valueOf(dto.getPaymentMethod()));
        payment.setPaymentStatus(PaymentStatus.PAID);
        payment.setTransactionId(UUID.randomUUID().toString());

        Payment saved = paymentDao.save(payment);

        // Map Payment entity to DTO
        PaymentResponseDto res = modelMapper.map(saved, PaymentResponseDto.class);
        res.setPaymentId(saved.getId());
        res.setBookingId(booking.getId());
        res.setPaymentMethod(saved.getPaymentMethod().name());
        res.setPaymentStatus(saved.getPaymentStatus().name());
        res.setAmount(saved.getAmount().doubleValue());
        return res;
    }

    @Override
    public PaymentResponseDto getPaymentByBooking(Long bookingId, Long userId) {
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getUser() == null || !booking.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: Booking does not belong to userId");
        }

        Payment payment = paymentDao.findByBooking(booking)
                .orElseThrow(() -> new RuntimeException("No payment found for this booking"));

        PaymentResponseDto dto = modelMapper.map(payment, PaymentResponseDto.class);
        dto.setPaymentId(payment.getId());
        dto.setBookingId(booking.getId());
        dto.setPaymentMethod(payment.getPaymentMethod().name());
        dto.setPaymentStatus(payment.getPaymentStatus().name());
        dto.setAmount(payment.getAmount().doubleValue());
        return dto;
    }
    

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
