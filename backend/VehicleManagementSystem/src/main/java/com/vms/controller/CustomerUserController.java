package com.vms.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vms.dto.request.UserRequestDTO;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.security.JwtUtil;
import com.vms.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;



import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@AllArgsConstructor
public class CustomerUserController {
	
private final UserService userService;

    
// Update an existing user
@PutMapping("/update-profile/{userId}")
public ResponseEntity<?> updateUser(@PathVariable Long userId,
                                                  @RequestBody UserRequestDTO userRequestDto) {
    CustomerApiResponse response = userService.updateUser(userId, userRequestDto);
    return ResponseEntity.ok(response);
}


@GetMapping("/myprofile/{userId}")
@Operation(description = "Get user details by ID") //swagger annotation
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
	  System.out.println("in get details " + userId);
	  return ResponseEntity.ok(userService.getUserById(userId));
}

@DeleteMapping("/{userId}")
@Operation(summary = "Delete a user by ID")
       public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
         CustomerApiResponse response = userService.deleteUser(userId);
         return ResponseEntity.ok(response);
}






}
