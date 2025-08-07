package com.vms.services;

import java.util.List;
import com.vms.dto.response.GetAllReviewsDto;

public interface ReviewService {
    List<GetAllReviewsDto> getAllReviews();
}
