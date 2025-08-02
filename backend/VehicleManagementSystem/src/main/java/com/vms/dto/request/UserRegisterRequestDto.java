package com.vms.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;
    private String password;
    private String confirmPassword;
}
