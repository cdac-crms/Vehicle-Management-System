package com.vms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vms.dto.request.HelpSupportRequestDTO;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.dto.response.HelpSupportResponseDTO;
import com.vms.services.HelpSupportService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/customer/help-support")
@AllArgsConstructor

public class HelpSupportController {

	private final HelpSupportService helpSupportService;

    // 1. Submit new help/support request - User Side
    @PostMapping
    public ResponseEntity<?> createHelpSupport(@RequestBody HelpSupportRequestDTO helpSupport) {
        HelpSupportResponseDTO savedRequest = helpSupportService.createHelpSupport(helpSupport);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }


    
    // 2. Get all help/support requests - Admin Side
    @GetMapping
    public ResponseEntity<?> getAllHelpSupportRequests() {
        List<HelpSupportResponseDTO> list = helpSupportService.getAllHelpSupportRequests();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 3. Get single help/support request detail - Admin Side
    @GetMapping("/{id}")
    public ResponseEntity<?> getHelpSupportById(@PathVariable Long id) {
        HelpSupportResponseDTO request = helpSupportService.getHelpSupportById(id);
        return new ResponseEntity<>(request, HttpStatus.OK);
    }

    // 4. Update help/support request (e.g. mark as resolved) - Admin Side
    @PutMapping("/{id}")
    public ResponseEntity<?> updateHelpSupport(
            @PathVariable Long id,
            @RequestBody HelpSupportRequestDTO helpSupport
    ) {
        CustomerApiResponse updated = helpSupportService.updateHelpSupport(id, helpSupport);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // 5. Delete help/support request - Admin Side
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelpSupport(@PathVariable Long id) {
        helpSupportService.deleteHelpSupport(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 6. (Optional) Get all HelpSupport requests for a user - User/Admin Side
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getHelpSupportByUser(@PathVariable Long userId) {
        List<HelpSupportResponseDTO> list = helpSupportService.getHelpSupportByUser(userId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
	
}
