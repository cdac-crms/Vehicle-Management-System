package com.vms.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class HelpSupportRequestDTO {
	
	private String name;
    private String email;
    private String concernType;
    private String message;
    private Long userId; // Can be omitted if you take the user from session/security context

}
