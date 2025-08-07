package com.vms.dto.response;

import com.vms.entities.enums.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private Long id;
    private String firstName;
    private String email;
    private String contactNo;
    private UserRole userRole;
    private String token;

}
