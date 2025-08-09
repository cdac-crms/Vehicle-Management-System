package com.vms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vms.entities.Review;
import com.vms.entities.Vehicle;

public interface ReviewDao extends JpaRepository<Review, Long> {

    List<Review> findByVehicle(Vehicle vehicle);

}
