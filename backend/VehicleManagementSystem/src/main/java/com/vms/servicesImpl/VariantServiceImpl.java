package com.vms.servicesImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.vms.custom_exceptions.ApiException;
import com.vms.custom_exceptions.ResourceNotFoundException;
import com.vms.dao.CompanyDao;
import com.vms.dao.VariantDao;
import com.vms.dto.request.AddVariantDto;
import com.vms.dto.response.VariantResponseDto;
import com.vms.entities.Variant;
import com.vms.services.VariantService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class VariantServiceImpl  implements VariantService{

	private final VariantDao variantdao;
	private final ModelMapper modelMapper;
    private final CompanyDao companyDao;  
	
	@Override
	public String addVariant(AddVariantDto addVariantDto) {

		if(variantdao.existsByName(addVariantDto.getName()))
		{
			throw new ApiException("Variant Already Exists.");
		}
		
		 var company = companyDao.findById(addVariantDto.getCompanyId())
	                .orElseThrow(() -> new ApiException("Company not found"));
		
		Variant variant = modelMapper.map(addVariantDto, Variant.class);
        variant.setCompany(company);  

        variant.setCreatedOn(LocalDateTime.now()); 

        variantdao.save(variant);

		return "Variant added succesfully.";
	}
	
	
	
	
	 @Override
	    public List<VariantResponseDto> getAllVariants() {
	        return variantdao.findAll().stream()
	                .map(variant -> VariantResponseDto.builder()
	                        .id(variant.getId())
	                        .name(variant.getName())
	                        .description(variant.getDescription())
	                        .seatingCapacity(variant.getSeatingCapacity())
	                        .fuelType(variant.getFuelType())
	                        .companyName(variant.getCompany().getName())
	                        .build())
	                .collect(Collectors.toList());
	    }

	    @Override
	    public VariantResponseDto getVariantById(Long variantId) {
	        Variant variant = variantdao.findById(variantId)
	                .orElseThrow(() -> new ResourceNotFoundException("VariantID " +  variantId));

	        return VariantResponseDto.builder()
	                .id(variant.getId())
	                .name(variant.getName())
	                .description(variant.getDescription())
	                .seatingCapacity(variant.getSeatingCapacity())
	                .fuelType(variant.getFuelType())
	                .companyName(variant.getCompany().getName())
	                .build();
	    }
	
	

}
