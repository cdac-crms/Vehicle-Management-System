
package com.vms.services;

import java.util.List;
import com.vms.dto.response.GetAllCustomerDto;
import com.vms.dto.response.GetOneCustomerDto;

public interface CustomerService {
    List<GetAllCustomerDto> getAllCustomers();
    GetOneCustomerDto getCustomerById(Long customerId);
   
}
