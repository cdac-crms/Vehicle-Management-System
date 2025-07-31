package com.vms.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reviews")
@AttributeOverride(name = "id", column = @Column(name = "review_id"))

public class Review extends BaseEntity{

	    @Column(name = "rating", nullable = false)
	    private Long rating;

	    @Column(name = "message", columnDefinition = "TEXT")
	    private String message;
//	    
//	    @ManyToOne(fetch = FetchType.LAZY)
//	    @JoinColumn(name = "vehicle_id")
//	    private Vehicle vehicle;
//
//	   //  in vehicle table
//	    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
//	    private List<Review> reviews = new ArrayList<>();

	     @ManyToOne(fetch = FetchType.LAZY, optional = false)
		 @JoinColumn(name = "user_id", nullable = false)
		 private User user;
}
