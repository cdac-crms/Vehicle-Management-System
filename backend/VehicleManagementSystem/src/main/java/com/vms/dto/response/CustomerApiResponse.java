package com.vms.dto.response;

import java.time.LocalDateTime;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class CustomerApiResponse<T> {
    
	private LocalDateTime timeStamp;
	private String message;
	private boolean success;
	private UserResponseDto user;

	public CustomerApiResponse(String message) {
		this.timeStamp = LocalDateTime.now();
		this.message = message;
	}

	public CustomerApiResponse(boolean b, String string) {
		this.timeStamp = LocalDateTime.now();
        this.message = message;
        this.success = success;
	}

	public CustomerApiResponse(boolean b, String string, UserResponseDto object) {
		this.success = b;
		this.user = object;
		this.message = string;
	}

	public CustomerApiResponse(String string, boolean b) {
		this.message = string;
		this.success = b;
	}

}
