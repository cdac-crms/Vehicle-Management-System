package com.vms.dto.request;

import com.vms.entities.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminRegisterRequestDto {


	   private String firstName;
	    private String lastName;
	    private String email;
	    private String contactNo;
	    private String password;
	    private UserRole userRole = UserRole.ADMIN;
	    private String confirmPassword;
}
