
package com.vms.servicesImpl;

import com.vms.custom_exceptions.ResourceNotFoundException;
import com.vms.dao.UserDao;
import com.vms.dto.response.GetAllCustomerDto;
import com.vms.dto.response.GetOneCustomerDto;
import com.vms.entities.DrivingLicense;
import com.vms.entities.User;
import com.vms.services.CustomerService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final UserDao userDao;
    private final ModelMapper modelMapper;

    @Override
    public List<GetAllCustomerDto> getAllCustomers() {
        return userDao.findAll().stream()
            .filter(user -> user.getUserRole().name().equals("CUSTOMER") && user.isStatus())
            .map(user -> modelMapper.map(user, GetAllCustomerDto.class))
            .toList();
    }

    @Override
    public GetOneCustomerDto getCustomerById(Long customerId) {
        User user = userDao.findById(customerId)
            .orElseThrow(() -> new ResourceNotFoundException("User ID not found: " + customerId));

        DrivingLicense license = user.getDrivingLicense();

        return GetOneCustomerDto.builder()
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .contactNo(user.getContactNo())
            .email(user.getEmail())
            .licenseNumber(license != null ? license.getLicenseNumber() : null)
            .expiryDate(license != null ? license.getExpiryDate() : null)
            .licenseImage(license != null ? license.getLicenseImage() : null)
            .build();
    }

}
