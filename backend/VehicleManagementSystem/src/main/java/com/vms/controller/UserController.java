package com.vms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vms.dto.request.AdminRegisterRequestDto;
import com.vms.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	
	 @PostMapping("/registerAdmin")
	    public ResponseEntity<?> registerUser(@RequestBody @Valid AdminRegisterRequestDto adminRegisterRequestDto) {
	        return ResponseEntity.status(HttpStatus.CREATED)
	                .body(userService.register(adminRegisterRequestDto));
	    }
}
