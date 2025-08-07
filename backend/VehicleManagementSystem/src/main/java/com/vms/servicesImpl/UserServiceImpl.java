package com.vms.servicesImpl;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vms.custom_exceptions.ApiException;
import com.vms.dao.UserDao;
import com.vms.dto.request.AdminRegisterRequestDto;
import com.vms.dto.response.UserResponseDto;
import com.vms.entities.User;
import com.vms.services.UserService;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserDao userDao;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public UserResponseDto register(AdminRegisterRequestDto adminRegisterRequestDto) {
		
		if (userDao.existsByEmail(adminRegisterRequestDto.getEmail()))
	         throw new ApiException("Dup Email detected - User exists already!!!!");

	     User user = modelMapper.map(adminRegisterRequestDto, User.class);
	     
	     // Encode the plain password before saving
	     user.setPassword(passwordEncoder.encode(adminRegisterRequestDto.getPassword()));

	     
	     return modelMapper.map(userDao.save(user), UserResponseDto.class);	}

	
}
