package com.vms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vms.entities.Review;

public interface ReviewDao extends JpaRepository<Review, Long> {
}
