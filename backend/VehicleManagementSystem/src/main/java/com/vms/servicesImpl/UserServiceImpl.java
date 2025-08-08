package com.vms.servicesImpl;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.vms.custom_exceptions.ApiException;
import com.vms.custom_exceptions.ResourceNotFoundException;
import com.vms.dao.UserDao;
import com.vms.dto.request.AdminRegisterRequestDto;
import com.vms.dto.request.UserRequestDTO;
import com.vms.dto.response.CustomerApiResponse;
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
	
	
	@Override
	public CustomerApiResponse updateUser(Long userId, UserRequestDTO userRequestDto) {
		 User user = userDao.findByIdAndStatusTrue(userId)
                   .orElseThrow(() -> new ResourceNotFoundException("User not found !!!"));
		 
		 modelMapper.map(userRequestDto,user);
		 return new CustomerApiResponse("user details updated successfully !!!");	
	}

	@Override
	public UserResponseDto getUserById(Long userId) {
				
		 User user = userDao.findByIdAndStatusTrue(userId)
				     .orElseThrow(()-> new ResourceNotFoundException("Invalid User ID !!!"));
		
		return modelMapper.map(user, UserResponseDto.class);
	}

	@Override
	public CustomerApiResponse deleteUser(Long userId) {
		// get restaurant from its id
				User user = userDao.findById(userId)
						.orElseThrow(() -> new ResourceNotFoundException("invalid restaurant id !!!!!"));
				// => restaurant : PERSISTENT
				user.setStatus(false);// modifying state the persistent entity
				return new CustomerApiResponse("soft deleted restaurant details ");
		
	}

	
}
