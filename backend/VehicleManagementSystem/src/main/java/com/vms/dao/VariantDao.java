package com.vms.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vms.entities.Variant;

public interface VariantDao extends JpaRepository<Variant, Long>{

	boolean existsByName(String name);

	
}
