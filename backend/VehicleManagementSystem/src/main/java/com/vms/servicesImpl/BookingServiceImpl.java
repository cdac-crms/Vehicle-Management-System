package com.vms.servicesImpl;

import com.vms.dao.BookingDao;
import com.vms.dao.UserDao;
import com.vms.dao.VehicleDao;
import com.vms.dto.request.BookedRangeDto;
import com.vms.dto.request.BookingRequestDto;
import com.vms.dto.response.AllBookingDto;
import com.vms.dto.response.BookingResponseDto;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.dto.response.OneBookingDto;
import com.vms.entities.Booking;
import com.vms.entities.DrivingLicense;
import com.vms.entities.User;
import com.vms.entities.Vehicle;
import com.vms.entities.enums.BookingStatus;
import com.vms.services.BookingService;

import com.vms.custom_exceptions.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
    private final VehicleDao vehicleDao;
    private final UserDao userDao;
    
    
    @Override
    public List<BookedRangeDto> getBookedDateRanges(Long vehicleId) {
        // Only include confirmed bookings
        List<Booking> bookings = bookingDao.findByVehicleIdAndBookingStatus(vehicleId, BookingStatus.CONFIRMED);
        return bookings.stream()
                .map(b -> new BookedRangeDto(b.getStartDate(), b.getEndDate()))
                .toList();
    }

    @Override
    public BookingResponseDto createBooking(BookingRequestDto req) {
        // 1. Validate vehicle/user exists (simplified)
        Vehicle vehicle = vehicleDao.findById(req.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        User user = userDao.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Check for overlaps for both CONFIRMED and PENDING
        List<BookingStatus> blockStatuses = List.of(BookingStatus.CONFIRMED, BookingStatus.PENDING);
        List<Booking> overlapping = bookingDao.findOverlappingBookings(
                req.getVehicleId(),
                req.getStartDate(),
                req.getEndDate(),
                blockStatuses
        );
        if (!overlapping.isEmpty()) {
            throw new IllegalStateException("The selected date range is not available for this vehicle.");
        }

        long days = ChronoUnit.DAYS.between(req.getStartDate(), req.getEndDate()) + 1;
        if (days < 1) {
            throw new IllegalArgumentException("Booking must be at least 1 day");
        }
        BigDecimal pricePerDay = vehicle.getPricePerDay();
        BigDecimal totalAmount = pricePerDay.multiply(BigDecimal.valueOf(days));

        // 3. Create and save booking
        Booking booking = new Booking();
        booking.setVehicle(vehicle);
        booking.setStartDate(req.getStartDate());
        booking.setEndDate(req.getEndDate());
        booking.setUser(user);
        booking.setTotalAmount(totalAmount);
        booking.setBookingDate(LocalDate.now());
        booking.setBookingStatus(BookingStatus.APPROVED); // or your desired status

        Booking saved = bookingDao.save(booking);

        // 4. Return DTO
        BookingResponseDto resp = modelMapper.map(saved, BookingResponseDto.class);
        resp.setBookingStatus(saved.getBookingStatus());
        return resp;
    }


    @Override
    public List<BookingResponseDto> getBookingsForUser(Long userId) {
        List<Booking> bookings = bookingDao.findByUserId(userId);
        return bookings.stream().map(this::toDTO).toList();
    }

    @Override
    public BookingResponseDto getBookingForUser(Long userId, Long bookingId) {
        Booking booking = bookingDao.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found !!!"));
        if (!booking.getUser().getId().equals(userId))
            throw new RuntimeException("Unauthorized access");
        return toDTO(booking);
    }

    @Override
    public CustomerApiResponse cancelBooking(Long userId, Long bookingId) {
        Booking booking = bookingDao.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getUser().getId().equals(userId))
            throw new RuntimeException("Unauthorized access");
        if (booking.getBookingStatus() == BookingStatus.CANCELLED)
            return new CustomerApiResponse("Booking already cancelled", false);
        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingDao.save(booking);
        return new CustomerApiResponse("Booking cancelled", true);
    }

    // --- Helper mapper for DTO ---
    private BookingResponseDto toDTO(Booking booking) {
    	
        BookingResponseDto dto = new BookingResponseDto();
        dto.setBookingId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setVehicleId(booking.getVehicle().getId());
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setBookingStatus(booking.getBookingStatus());
        
        // extra fields for frontend
        Vehicle v = booking.getVehicle();
        dto.setCarName(v.getVariant().getName());
        dto.setVariant(v.getVariant().getName());
        dto.setPricePerDay(v.getPricePerDay() != null ? v.getPricePerDay().doubleValue() : null);
        dto.setBookingDate(booking.getBookingDate());
        dto.setTotalAmount(booking.getTotalAmount() != null ? booking.getTotalAmount().doubleValue() : null);
        return dto;
    }

    @Override
    public List<AllBookingDto> getAllBookings() {
        List<Booking> bookings = bookingDao.findAll();

        return bookings.stream()
                .map(booking -> {
                    AllBookingDto dto = new AllBookingDto();
                    dto.setId(booking.getId());
                    dto.setCustomerName(booking.getUser().getFirstName() + " " + booking.getUser().getLastName());
                    dto.setName(booking.getVehicle().getVariant().getName());
                    dto.setRegistrationNumber(booking.getVehicle().getRegistrationNumber());
                    dto.setBookingDate(booking.getBookingDate());
                    dto.setStartDate(booking.getStartDate());
                    dto.setEndDate(booking.getEndDate());
                    dto.setTotalDays((int) (booking.getEndDate().toEpochDay() - booking.getStartDate().toEpochDay()));
                    dto.setPricePerDay(booking.getVehicle().getPricePerDay().doubleValue());
                    dto.setTotalAmount(booking.getTotalAmount().doubleValue());
                    dto.setBookingStatus(booking.getBookingStatus());
                    return dto;
                })
                .collect(Collectors.toList());
    }

//    @Override
//    public OneBookingDto getBookingById(Long id) {
//        Booking booking = bookingDao.findFullBookingById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Booking ID not found: " + id));
//
//        User user = booking.getUser();
//        DrivingLicense license = user.getDrivingLicense();
//
//        return OneBookingDto.builder()
//                // Vehicle Info
//                .name(booking.getVehicle().getVariant().getName())
////                .companyName(booking.getVehicle().getVariant().getCompany().getName())
//                .fuelType(booking.getVehicle().getVariant().getFuelType())
//                .pricePerDay(booking.getVehicle().getPricePerDay().doubleValue())
//                .registrationNumber(booking.getVehicle().getRegistrationNumber())
//
//                // Booking Info
//                .bookingId(booking.getId())
//                .bookingDate(booking.getBookingDate())
//                .startDate(booking.getStartDate())
//                .endDate(booking.getEndDate())
//                .totalAmount(booking.getTotalAmount().doubleValue())
//                .bookingStatus(booking.getBookingStatus())
//
//                // Customer Info
//                .firstName(user.getFirstName())
//                .lastName(user.getLastName())
//                .email(user.getEmail())
//                .contactNo(user.getContactNo())
//
//                // Driving License Info
//                .licenseNumber(license.getLicenseNumber())
//                .expiryDate(license.getExpiryDate())
//                .licenseImage(license.getLicenseImage())
//                .build();
//    }
    
    
    @Override
    public OneBookingDto getBookingById(Long id) {
        Booking booking = bookingDao.findFullBookingById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking ID not found: " + id));

        User user = booking.getUser();
        DrivingLicense license = user.getDrivingLicense();
        
        //debug
        System.out.println("FuelType: " + booking.getVehicle().getVariant().getFuelType());
        System.out.println("Email: " + user.getEmail());
        System.out.println("ContactNo: " + user.getContactNo());

        return OneBookingDto.builder()
                .name(booking.getVehicle().getVariant().getName())
                .companyName(booking.getVehicle().getVariant().getCompany().getName())
                //.fuelType(booking.getVehicle().getVariant().getFuelType().name())
                .fuelType(booking.getVehicle().getVariant().getFuelType().name())
                .pricePerDay(booking.getVehicle().getPricePerDay().doubleValue())
                .registrationNumber(booking.getVehicle().getRegistrationNumber())

                .bookingId(booking.getId())
                .bookingDate(booking.getBookingDate())
                .startDate(booking.getStartDate())
                .endDate(booking.getEndDate())
                .totalAmount(booking.getTotalAmount().doubleValue())
                .bookingStatus(booking.getBookingStatus())

                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .contactNo(user.getContactNo())

                .licenseNumber(license.getLicenseNumber())
                .expiryDate(license.getExpiryDate())
                .licenseImage(license.getLicenseImage())
                .build();
    }

    
    
    @Override
    public String updateBookingStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingDao.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        booking.setBookingStatus(status);
        bookingDao.save(booking); // Save updated status
        return "Booking status updated to: " + status;
    }

}
