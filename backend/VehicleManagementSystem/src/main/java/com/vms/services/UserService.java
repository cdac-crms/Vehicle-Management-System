package com.vms.services;

import org.springframework.stereotype.Service;

import com.vms.dto.request.AdminRegisterRequestDto;
import com.vms.dto.request.UserRegisterRequestDto;
import com.vms.dto.request.UserRequestDTO;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.dto.response.UserResponseDto;

@Service
public interface  UserService {
	
	
	CustomerApiResponse updateUser(Long userId, UserRequestDTO userRequestDto);

	UserResponseDto getUserById(Long userId);

	CustomerApiResponse deleteUser(Long userId);
	
	
	UserResponseDto register(AdminRegisterRequestDto adminRegisterRequestDto);


}
