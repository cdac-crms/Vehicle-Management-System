package com.vms.servicesImpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vms.custom_exceptions.ResourceNotFoundException;
import com.vms.dao.HelpSupportDao;
import com.vms.dao.UserDao;
import com.vms.dto.request.HelpSupportRequestDTO;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.dto.response.HelpSupportResponseDTO;
import com.vms.entities.HelpSupport;
import com.vms.entities.User;
import com.vms.services.HelpSupportService;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class HelpSupportServiceImpl implements HelpSupportService {

	private final UserDao userDao;
	private final HelpSupportDao helpSupportDao;
    private final ModelMapper modelMapper;
	
    @Override
    public HelpSupportResponseDTO createHelpSupport(HelpSupportRequestDTO dto) {
        // optional: check for duplicate? (usually not needed for help/support submissions)
        HelpSupport help = modelMapper.map(dto, HelpSupport.class);
        if (dto.getUserId() != null) {
            User user = userDao.findByIdAndStatusTrue(dto.getUserId())
                        .orElseThrow(() -> new ResourceNotFoundException("User not found!!!"));
            help.setUser(user);
        }
        HelpSupport saved = helpSupportDao.save(help);
        return modelMapper.map(saved, HelpSupportResponseDTO.class);
    }

    // UPDATE (admin updates concernType, message, etc.)
  
    public CustomerApiResponse updateHelpSupport(Long id, HelpSupportRequestDTO dto) {
        HelpSupport help = helpSupportDao.findByIdAndStatusTrue(id)
                        .orElseThrow(() -> new ResourceNotFoundException("HelpSupport request not found!"));
        modelMapper.map(dto, help); // update entity fields in place
        // Optionally, update User if dto's userId differs
        if (dto.getUserId() != null &&
           (help.getUser() == null || !help.getUser().getId().equals(dto.getUserId()))) {
            User user = userDao.findByIdAndStatusTrue(dto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found!"));
            help.setUser(user);
        }
        helpSupportDao.save(help);
        return new CustomerApiResponse("Help/Support request updated successfully!");
    }

    // GET BY ID (Detail view)
    @Override
    public HelpSupportResponseDTO getHelpSupportById(Long id) {
        HelpSupport help = helpSupportDao.findByIdAndStatusTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("HelpSupport request not found!!!"));
        return modelMapper.map(help, HelpSupportResponseDTO.class);
    }

    // SOFT DELETE (set status=false)
   
    public CustomerApiResponse deleteHelpSupport(Long id) {
        HelpSupport help = helpSupportDao.findByIdAndStatusTrue(id)
                    .orElseThrow(() -> new ResourceNotFoundException("HelpSupport request not found!"));
        help.setStatus(false); // assuming status is a boolean for soft delete
        helpSupportDao.save(help);
        return new CustomerApiResponse("Help/Support request soft-deleted.");
    }

    // GET ALL (Admin: fetch all, only status==true)
  
    public List<HelpSupportResponseDTO> getAllHelpSupportRequests() {
        return helpSupportDao.findByStatusTrue()
                .stream()
                .map(h -> modelMapper.map(h, HelpSupportResponseDTO.class))
                .toList();
    }

    // GET BY USER (all for a user, only status==true)
 
    public List<HelpSupportResponseDTO> getHelpSupportByUser(Long userId) {
        return helpSupportDao.findByUserIdAndStatusTrue(userId)
                .stream()
                .map(h -> modelMapper.map(h, HelpSupportResponseDTO.class))
                .toList();
    }

}
