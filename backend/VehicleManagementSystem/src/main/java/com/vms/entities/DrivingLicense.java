package com.vms.entities;

import java.time.LocalDate;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="driving_license")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "license_id"))

public class DrivingLicense extends BaseEntity{

	@Column(name = "license_number")
    private Long licenseNumber;
	
	@Column(name = "license_image")
	private String licenseImage;
	
	@Column(name = "issued_date")
	private LocalDate issuedDate;
	
	@Column(name = "expiry_date")
	private LocalDate expiryDate;
	
	@OneToOne(cascade = CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="user_id", nullable = false, unique = true)
	private User user;
	
	
}
