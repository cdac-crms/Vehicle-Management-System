package com.vms.servicesImpl;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.vms.custom_exceptions.ApiException;
import com.vms.dao.CompanyDao;
import com.vms.dto.request.AddCompanyDto;
import com.vms.entities.Company;
import com.vms.services.CompanyService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CompanyServiceImpl  implements CompanyService{

	private final CompanyDao companyDao;
	private final ModelMapper modelMapper;
	
	
	@Override
	public String addCompany(AddCompanyDto addCompanyDto) {
		if(companyDao.existsByName(addCompanyDto.getName()))
		{
			throw new ApiException("Company Already Exists.");
		}
		
		Company company = modelMapper.map(addCompanyDto, Company.class);
        company.setCreatedAt(LocalDateTime.now()); 
		companyDao.save(company);
		
		return "Company Added Succesfully";
	}

}
