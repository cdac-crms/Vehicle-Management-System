
package com.vms.dto.response;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetOneCustomerDto {

    private String firstName;
    private String lastName;
    private String contactNo;
    private String email;

    private Long licenseNumber;
    private LocalDate expiryDate;
    private String licenseImage;
}
