
// AuthenticationsService.java
package com.vms.services;

import org.springframework.stereotype.Service;

import com.vms.dto.request.UserLoginRequestDto;
import com.vms.dto.request.UserRegisterRequestDto;
import com.vms.dto.response.UserResponseDto;

@Service
public interface AuthenticationsService {

	UserResponseDto register(UserRegisterRequestDto userRegisterRequestDto);

	UserResponseDto login(UserLoginRequestDto userLoginRequestDto);
}
