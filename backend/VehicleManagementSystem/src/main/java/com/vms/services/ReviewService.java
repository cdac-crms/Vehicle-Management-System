package com.vms.services;

import java.util.List;

import com.vms.dto.request.ReviewRequest;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.dto.response.GetAllReviewsDto;

public interface ReviewService {
	
	CustomerApiResponse createReview(ReviewRequest dto);
	
    List<GetAllReviewsDto> getAllReviews();
}
