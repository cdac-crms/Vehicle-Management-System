package com.vms.services;

import java.util.List;

import com.vms.dto.request.AddCompanyDto;
import com.vms.dto.response.GetAllCompanyDto;

public interface CompanyService {
	
	String addCompany(AddCompanyDto addCompanyDto);
	List<GetAllCompanyDto> getAllCompanies();

}
