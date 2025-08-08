package com.vms.controller;


import com.vms.dto.request.ReviewRequest;
import com.vms.dto.response.CustomerApiResponse;
import com.vms.dto.response.GetAllReviewsDto;
import com.vms.services.ReviewService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    
     // Create a new review
    @PostMapping
    public ResponseEntity<CustomerApiResponse> createReview(@RequestBody ReviewRequest dto) {
        CustomerApiResponse response = reviewService.createReview(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/getAll")
    public ResponseEntity<List<GetAllReviewsDto>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }
}
