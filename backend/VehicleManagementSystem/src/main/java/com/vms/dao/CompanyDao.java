package com.vms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vms.entities.Company;

public interface CompanyDao extends JpaRepository<Company, Long>{

	boolean existsByName(String name);
}
