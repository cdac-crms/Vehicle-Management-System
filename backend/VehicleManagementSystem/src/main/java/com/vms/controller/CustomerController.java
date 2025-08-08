
package com.vms.controller;

import com.vms.dto.response.GetAllCustomerDto;
import com.vms.dto.response.GetOneCustomerDto;
import com.vms.services.CustomerService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/getAllCustomers")
    public ResponseEntity<List<GetAllCustomerDto>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<GetOneCustomerDto> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }
}
