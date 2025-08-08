package com.vms.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vms.dto.request.HelpSupportRequestDTO;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.dto.response.HelpSupportResponseDTO;



@Service
public interface HelpSupportService {

	HelpSupportResponseDTO createHelpSupport(HelpSupportRequestDTO helpSupport);

	List<HelpSupportResponseDTO> getAllHelpSupportRequests();

	HelpSupportResponseDTO getHelpSupportById(Long id);

	CustomerApiResponse updateHelpSupport(Long id, HelpSupportRequestDTO helpSupport);

	List<HelpSupportResponseDTO> getHelpSupportByUser(Long userId);

	CustomerApiResponse deleteHelpSupport(Long id);

}
