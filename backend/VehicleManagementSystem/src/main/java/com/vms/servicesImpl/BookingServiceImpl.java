package com.vms.servicesImpl;

import com.vms.dao.BookingDao;
import com.vms.dto.response.AllBookingDto;
import com.vms.dto.response.OneBookingDto;
import com.vms.entities.Booking;
import com.vms.entities.DrivingLicense;
import com.vms.entities.User;
import com.vms.services.BookingService;
import com.vms.custom_exceptions.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingDao bookingDao;
    private final ModelMapper modelMapper;

    @Override
    public List<AllBookingDto> getAllBookings() {
        List<Booking> bookings = bookingDao.findAll();

        return bookings.stream()
                .map(booking -> {
                    AllBookingDto dto = new AllBookingDto();
                    dto.setId(booking.getId());
                    dto.setCustomerName(booking.getUser().getFirstName() + " " + booking.getUser().getLastName());
                    dto.setVehicle(booking.getVehicle().getVariant().getName());
                    dto.setRegistrationNo(booking.getVehicle().getRegistrationNumber());
                    dto.setBookingDate(booking.getBookingDate());
                    dto.setStartDate(booking.getStartDate());
                    dto.setEndDate(booking.getEndDate());
                    dto.setTotalDays((int) (booking.getEndDate().toEpochDay() - booking.getStartDate().toEpochDay()));
                    dto.setRentPerDay(booking.getVehicle().getPricePerDay().doubleValue());
                    dto.setTotalAmount(booking.getTotalAmount().doubleValue());
                    dto.setBookingStatus(booking.getBookingStatus());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public OneBookingDto getBookingById(Long id) {
        Booking booking = bookingDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking ID not found: " + id));

        User user = booking.getUser();
        DrivingLicense license = user.getDrivingLicense();

        return OneBookingDto.builder()
                // Vehicle Info
                .variantName(booking.getVehicle().getVariant().getName())
                .companyName(booking.getVehicle().getVariant().getCompany().getName())
                .fuelType(booking.getVehicle().getVariant().getFuelType())
                .pricePerDay(booking.getVehicle().getPricePerDay().doubleValue())
                .registrationNumber(booking.getVehicle().getRegistrationNumber())

                // Booking Info
                .bookingId(booking.getId())
                .bookingDate(booking.getBookingDate())
                .startDate(booking.getStartDate())
                .endDate(booking.getEndDate())
                .totalFare(booking.getTotalAmount().doubleValue())
                .bookingStatus(booking.getBookingStatus())

                // Customer Info
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .contactNo(user.getContactNo())

                // Driving License Info
                .licenseNumber(license.getLicenseNumber())
                .licenseImage(license.getLicenseImage())
                .build();
    }
}
