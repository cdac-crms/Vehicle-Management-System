package com.vms.services;

import org.springframework.stereotype.Service;

import com.vms.dto.request.AdminRegisterRequestDto;
import com.vms.dto.request.UserRegisterRequestDto;
import com.vms.dto.response.UserResponseDto;

@Service
public interface  UserService {
	
	UserResponseDto register(AdminRegisterRequestDto adminRegisterRequestDto);


}
