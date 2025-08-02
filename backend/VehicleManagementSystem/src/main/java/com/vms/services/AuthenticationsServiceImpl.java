// AuthenticationsServiceImpl.java
package com.vms.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vms.dto.request.UserLoginRequestDto;
import com.vms.dto.request.UserRegisterRequestDto;
import com.vms.dto.response.UserResponseDto;
import com.vms.services.AuthenticationsService;
import com.vms.custom_exceptions.ApiException;
import com.vms.dao.UserDao;
import com.vms.entities.User;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuthenticationsServiceImpl implements AuthenticationsService {

    private final UserDao userDao;
    private final ModelMapper modelMapper;

    @Override
    public UserResponseDto register(UserRegisterRequestDto userRegisterRequestDto) {
        if (userDao.existsByEmail(userRegisterRequestDto.getEmail()))
            throw new ApiException("Dup Email detected - User exists already!!!!");

        User user = modelMapper.map(userRegisterRequestDto, User.class);
        return modelMapper.map(userDao.save(user), UserResponseDto.class);
    }

    @Override
    public UserResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        User user = userDao.findByEmailAndPasswordAndStatusTrue(
                userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword())
                .orElseThrow(() -> new ApiException("Invalid email or password!"));

        return modelMapper.map(user, UserResponseDto.class);
    }
}
