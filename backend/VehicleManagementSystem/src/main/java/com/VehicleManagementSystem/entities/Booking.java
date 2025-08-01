package com.VehicleManagementSystem.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.VehicleManagementSystem.entities.enums.BookingStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking extends BaseEntity {
	
	 
		@OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
		private Payment payment;
	
	  @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "user_id", nullable = false)
	    private User user;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "vehicle_id", nullable = false)
	    private Vehicle vehicle;

	    @Column(name = "booking_date", nullable = false)
	    private LocalDate bookingDate;

	    @Column(name = "start_date", nullable = false)
	    private LocalDate startDate;

	    @Column(name = "end_date", nullable = false)
	    private LocalDate endDate;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "booking_status", length = 20)
	    private BookingStatus bookingStatus = BookingStatus.PENDING;

	    @Column(name = "total_amount", precision = 10, scale = 2)
	    private BigDecimal totalAmount;

	    private String x1;
	    private String x2;
}
