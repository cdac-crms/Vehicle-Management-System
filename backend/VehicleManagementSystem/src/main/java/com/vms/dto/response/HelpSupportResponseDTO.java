package com.vms.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class HelpSupportResponseDTO {
	
	private Long id;
    private String name;
    private String email;
    private String concernType;
    private String message;
   

}
