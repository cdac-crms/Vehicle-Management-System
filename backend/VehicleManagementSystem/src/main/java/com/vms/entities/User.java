package com.vms.entities;

import java.time.LocalDate;
import com.vms.entities.*;
import com.vms.entities.enums.UserRole;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@AttributeOverride(name = "id", column = @Column(name = "user_id"))

public class User extends BaseEntity {

	@Column(length = 20, name = "first_name") // col name , varchar size
	private String firstName;
	
	@Column(length = 30, name = "last_name") // col name , varchar size
	private String lastName;
	
	@Column(length = 30, unique = true) // varchar(30), unique constraint
	private String email;
	
	@Column(name = "contact_no")
	private String contactNo;

	
	@Column(length = 20, nullable = false) // not null
	private String password;
	
	@Transient //skips from persistence - no col generation
	private String confirmPassword;
	
	@Lob
	private String address;
	
	@Column
	private boolean status = true;
	
	@Enumerated(EnumType.STRING) // col type - varchar : name of constant
	@Column(length = 30, name = "user_role")
	private UserRole userRole;
	
	
	
//	@OneToOne(mappedBy ="user",cascade = CascadeType.PERSIST,fetch=FetchType.LAZY,orphanRemoval = true)
//	@JoinColumn(name="license_id", nullable = false, unique = true)
//	private DrivingLicense driving_license;



		
}
