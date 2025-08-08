package com.vms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vms.entities.HelpSupport;
import com.vms.entities.User;

public interface HelpSupportDao extends JpaRepository<HelpSupport, Long> {

	Optional<HelpSupport> findByIdAndStatusTrue(Long id);

	Optional<HelpSupport> findByStatusTrue();

	Optional<HelpSupport> findByUserIdAndStatusTrue(Long userId);
	

}
