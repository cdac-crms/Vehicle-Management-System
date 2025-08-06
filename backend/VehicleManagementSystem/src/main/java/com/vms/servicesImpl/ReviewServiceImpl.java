
package com.vms.servicesImpl;

import com.vms.dao.ReviewDao;
import com.vms.dto.response.GetAllReviewsDto;
import com.vms.entities.Review;
import com.vms.services.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewDao reviewDao;

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
