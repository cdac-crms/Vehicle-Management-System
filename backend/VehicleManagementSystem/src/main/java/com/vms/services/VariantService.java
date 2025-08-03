package com.vms.services;

import java.util.List;

import com.vms.dto.request.AddVariantDto;
import com.vms.dto.response.VariantResponseDto;

public interface VariantService {

	String addVariant(AddVariantDto addVariantDto);
	List<VariantResponseDto> getAllVariants();
	VariantResponseDto getVariantById(Long variantId);

}
