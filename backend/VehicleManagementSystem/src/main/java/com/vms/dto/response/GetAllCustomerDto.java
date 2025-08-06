package com.vms.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetAllCustomerDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;
    private boolean status;
}
