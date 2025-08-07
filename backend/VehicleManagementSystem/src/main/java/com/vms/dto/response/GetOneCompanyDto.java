package com.vms.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetOneCompanyDto {
	private Long id;
	private String name;
	private String description;
}
