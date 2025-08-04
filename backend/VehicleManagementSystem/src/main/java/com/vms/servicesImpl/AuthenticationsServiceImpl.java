package com.vms.servicesImpl;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vms.dto.request.UserLoginRequestDto;
import com.vms.dto.request.UserRegisterRequestDto;
import com.vms.dto.response.UserResponseDto;
import com.vms.services.AuthenticationsService;
import com.vms.custom_exceptions.ApiException;
import com.vms.dao.UserDao;
import com.vms.entities.User;
import com.vms.security.JwtUtil;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuthenticationsServiceImpl implements AuthenticationsService {

    private final UserDao userDao;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;  // Inject PasswordEncoder
    private final JwtUtil jwtUtil;

//    @Override
//    public UserResponseDto register(UserRegisterRequestDto userRegisterRequestDto) {
//        if (userDao.existsByEmail(userRegisterRequestDto.getEmail()))
//            throw new ApiException("Dup Email detected - User exists already!!!!");
//
//        User user = modelMapper.map(userRegisterRequestDto, User.class);
//        return modelMapper.map(userDao.save(user), UserResponseDto.class);
//    }
//
//    @Override
//    public UserResponseDto login(UserLoginRequestDto userLoginRequestDto) {
//        User user = userDao.findByEmailAndPasswordAndStatusTrue(
//                userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword())
//                .orElseThrow(() -> new ApiException("Invalid email or password!"));
//
//        return modelMapper.map(user, UserResponseDto.class);
//    }
    
    @Override
    public UserResponseDto register(UserRegisterRequestDto userRegisterRequestDto) {
        if (userDao.existsByEmail(userRegisterRequestDto.getEmail()))
            throw new ApiException("Dup Email detected - User exists already!!!!");

        // Map DTO to entity
        User user = modelMapper.map(userRegisterRequestDto, User.class);

        // Encode the plain password before saving
        user.setPassword(passwordEncoder.encode(userRegisterRequestDto.getPassword()));

        // Save user and return mapped response DTO
        return modelMapper.map(userDao.save(user), UserResponseDto.class);
    }
    
    
    
    
    @Override
    public UserResponseDto login(UserLoginRequestDto dto) {
        // Find user by email only (not password, since it's hashed)
        User user = userDao.findByEmailAndStatusTrue(dto.getEmail())
                .orElseThrow(() -> new ApiException("Invalid email or password!"));
   	 
        // Verify raw password against hashed password
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid email or password!");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getUserRole().name());

        // Map and return response with token
        UserResponseDto response = modelMapper.map(user, UserResponseDto.class);
        response.setToken(token);
        return response;
    }
    
    
    
}
