package com.vms.services;

import java.util.List;

import com.vms.dto.request.AddCompanyDto;
import com.vms.dto.response.GetAllCompanyDto;
import com.vms.dto.response.GetOneCompanyDto;

public interface CompanyService {
	
	String addCompany(AddCompanyDto addCompanyDto);
	List<GetAllCompanyDto> getAllCompanies();
	GetOneCompanyDto getCompanyById(Long companyId);

}
