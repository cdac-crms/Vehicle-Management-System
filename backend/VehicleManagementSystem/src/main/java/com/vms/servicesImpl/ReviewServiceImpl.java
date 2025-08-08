
package com.vms.servicesImpl;



import com.vms.custom_exceptions.ResourceNotFoundException;
import com.vms.dao.ReviewDao;
import com.vms.dao.UserDao;
import com.vms.dao.VehicleDao;
import com.vms.dto.request.ReviewRequest;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.dto.response.GetAllReviewsDto;
import com.vms.entities.Review;
import com.vms.entities.User;
import com.vms.entities.Vehicle;
import com.vms.services.ReviewService;

import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	
	 private final UserDao userDao;     
     private final VehicleDao vehicleDao;
     private final ModelMapper modelMapper;
	
    private final ReviewDao reviewDao;
    
    
    // CREATE
    @Override
    public CustomerApiResponse createReview(ReviewRequest dto) {
        Review review = modelMapper.map(dto, Review.class);

        User user = userDao.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Vehicle vehicle = vehicleDao.findById(dto.getVehicleId())
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        review.setUser(user);
        review.setVehicle(vehicle);

        reviewDao.save(review);
        return new CustomerApiResponse("Review submitted successfully!");
    }

    
    

    @Override
    public List<GetAllReviewsDto> getAllReviews() {
        List<Review> reviews = reviewDao.findAll();

        return reviews.stream().map(review -> GetAllReviewsDto.builder()
                .id(review.getId())
                .rating(review.getRating())
                .message(review.getMessage())
                .customerName(review.getUser().getFirstName() + " " + review.getUser().getLastName())
                .variantName(review.getVehicle().getVariant().getName())
                .build())
                .toList();
    }
}
